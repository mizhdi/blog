---
layout: post
title: 深入学习ios中UITableView
date: '2016-02-17 16:41'
category: Technology
last-modified: '2016-02-17 16:41'
---

>从前端转到ios开发，虽然跨度不大，但是构建UI方面有很大的不同，其中最让人很不爽的就是UI的耦合，就像React中可以将css写在js文件中一样，连html都整合在一起，不就是内联嘛。ios中常用UITableView，趁着项目的做完，好好学习总结记录一下。

## Lighter View Controllers

如果将UITableView的dataSource和delegate写在ViewController里面，你就会发现越来越冗长，
尤其是有多个页面的时候，考虑是不是可以将这些代码抽出来。查了一下资料，无非就是通过block将代理写在
另一个class里面。

``` objective-c
- (instancetype)initWithItems:(NSArray *)aItems
           configureCellBlock:(CellConfigureBlock)aCellConfigureBlock
              cellHeightBlock:(CellHeightBlock)aCellHeightBlock
              cellWillDisplay:(CellWillDisplayBlock)aCellWillDisplayBlock
               didSelectBlock:(CellDidSelectBlock)aCellDidSelectBlock
           viewForHeaderBlock:(ViewForHeaderBlock)aViewForHeaderBlock
              heightForHeader:(CGFloat)aHeightForHeader;
```

在ViewController里可以简单这样写：

``` objective-c
- (void)setupTableView {
    [self.tableView registerNib:[UINib nibWithNibName:xibCellIdentifier bundle:nil] forCellReuseIdentifier:xibCellIdentifier];
    [self.tableView registerClass:[AMCustomCell class] forCellReuseIdentifier:customCellIdentifier];
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;
    _tableHander = [[AMTableDataDelegate alloc] initWithItems:_dataArray configureCellBlock:^UITableViewCell *(UITableView *tableView, NSIndexPath *indexPath) {
        return (indexPath.row % 2 == 0 ? [tableView dequeueReusableCellWithIdentifier:customCellIdentifier forIndexPath:indexPath] : [tableView dequeueReusableCellWithIdentifier:xibCellIdentifier forIndexPath:indexPath]);

    } cellHeightBlock:^CGFloat(NSIndexPath *indexPath, id item) {
        if (item) {
            return ((AMTestVO *)item).height;
        }
        return 44.0f;
    } cellWillDisplay:^(NSIndexPath *indexPath, id item, UITableViewCell *cell) {
        if (indexPath.row % 2 == 0) {
            [(AMCustomCell *)cell fillValues:item];
        } else {
            [(AMXibCell *)cell fillValues:item];
        }
    } didSelectBlock:^(NSIndexPath *indexPath, id item) {
        NSLog(@"++++");
    } viewForHeaderBlock:^UIView *{
        UILabel *label;
        if (!label) {
            label = [[UILabel alloc] init];
            label.text = @"测试";
            label.textAlignment = NSTextAlignmentCenter;
            label.backgroundColor = [UIColor blueColor];
            label.textColor = [UIColor whiteColor];
        }
        return label;
    } heightForHeader:44.0f];
    [_tableHander handleTableViewDataSourceAndDelegate:self.tableView];
}
```

**Github**：[https://github.com/mizhdi/AMTableLighter](https://github.com/mizhdi/AMTableLighter)

## 性能问题

### 重用机制

做web开发的时候，是将整个页面都展现出来，在ios上要考虑GPU的性能问题，UITableView就有个重用机
制创建屏幕可显示最大个数的cell，然后重复使用这些cell。查看UITableView头文件，会找到
NSMutableArray \*visiableCells，和NSMutableDictnery   \*reusableTableCells两个结构。visiableCells内保
存当前显示的cells，reusableTableCells保存可重用的cells。一般的写法如下：

``` objective-c
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {  
   static NSString *cellIdentifier = @"cell";  
   UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];  
   if (!cell) {  
   cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];  
   }  
   //config the cell  
   return cell;  
}
```

#### 关于自定义cell

`dequeueReuseableCellWithIdentifier:forIndexPath:`自定义cell时，若使用nib，
使用registerNib: 注册，dequeue时会调用cell的 -(void)awakeFromNib不使用nib，使用registerClass:注册，dequeue时会调用 cell的` (id)initWithStyle:withReuseableCellIdentifier:`

### 高度计算

先布局，再创建cell。UITableView是继承自UIScrollView的，UITableView先多次调用
`tableView:heightForRowAtIndexPath:`以确定contentSize及Cell的位置，然后才会调用
`tableView:cellForRowAtIndexPath:`，从而来显示在当前屏幕的Cell。UITableViewCell高度计
算有两种方式。一种是针对所有cell具有固定高度的情况，通过：
`self.tableView.rowHeight = 44;`
对于固定高度的UITableViewCell，使用这种方式保证不必要的高度计算和调用
另一种方式就是实现 UITableViewDelegate中的：

``` objective-c
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
  return 44.0f;
}
```

所以应该非常快地返回高度值，具体可以查看[优化UITableViewCell高度计算的那些事](http://blog.sunnyxx.com/2015/05/17/cell-height-calculation/)。

### cell的赋值

在UITableView的dataSource中实现的tableView:cellForRowAtIndexPath:方法，需要为每个cell
调用一次，它应该快速执行。所以你需要尽可能快地返回重用cell实例。不要在这里去执行数据绑定，因为目
前在屏幕上还没有cell。为了执行数据绑定，可以在UITableView的delegate方法
`tableView:willDisplayCell:forRowAtIndexPath:`中进行。这个方法在显示cell之前会被调用。

还有就是将cell的处理逻辑放在cell中，比如我们常用的`-fillValues:(id)obj`方法。

### 更多细节

还有未涉及的滑动按需加载，异步绘制，缓存这些尚未提及，因为在项目中用到的少，就不提及了。
要使UITableView更加平滑，平衡CPU和GPU的负载，请参考[Perfect smooth scrolling in UITableViews ](http://southpeak.github.io/blog/2015/12/20/perfect-smooth-scrolling-in-uitableviews)。


## 参考
- [不要把ViewController变成处理tableView的"垃圾桶"](http://www.jianshu.com/p/1e53f09d0f21)
- [IOS Table中Cell的重用reuse机制分析](http://blog.csdn.net/omegayy/article/details/7356823)
- [Perfect smooth scrolling in UITableViews ](http://southpeak.github.io/blog/2015/12/20/perfect-smooth-scrolling-in-uitableviews)
- [优化UITableViewCell高度计算的那些事](http://blog.sunnyxx.com/2015/05/17/cell-height-calculation/)
