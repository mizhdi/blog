var fund = {
  "fund": [
    [1147651200000,23.15],
    [1147737600000,23.01],
    [1147824000000,22.73],
    [1147910400000,22.83],
    [1147996800000,40.56],
    [1148256000000,22.88],
    [1148342400000,22.79],
    [1148428800000,20.50],
    [1148515200000,23.74],
    [1148601600000,23.72],
    [1148947200000,35.15],
    [1149033600000,13.65],
  ],
  "沪深300指数": [
    [1147651200000,24.15],
    [1147737600000,22.01],
    [1147824000000,12.73],
    [1147910400000,12.83],
    [1147996800000,2.56],
    [1148256000000,2.88],
    [1148342400000,22.79],
    [1148428800000,33.50],
    [1148515200000,43.74],
    [1148601600000,25.72],
    [1148947200000,33.15],
    [1149033600000,26.65],
  ]
}

$(function () {

    Highcharts.setOptions({
      global: {
        timezoneOffset: -8 * 60  // +8 时区修正方法
      },
      lang: {
        contextButtonTitle:"图表导出菜单",
         decimalPoint:".",
         downloadJPEG:"下载JPEG图片",
         downloadPDF:"下载PDF文件",
         downloadPNG:"下载PNG文件",
         downloadSVG:"下载SVG文件",
         drillUpText:"返回 {series.name}",
         loading:"加载中",
         months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
         noData:"没有数据",
         numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
         printChart:"打印图表",
         resetZoom:"恢复缩放",
         resetZoomTitle:"恢复图表",
         shortMonths: [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
         thousandsSep:",",
         weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期天"]
    	}
    });

    var seriesOptions = [],
        seriesCounter = 0,
        names = ['fund', '沪深300指数'],
        colors = {'fund': '#A84745', '沪深300指数': '#4773A5'};

    function createChart() {

        $('#container').highcharts('StockChart', {

            title: {
                text: '净值走势',
                align: 'center',
                style: {
                    color: '#4572a7',
                    fontWeight: 'bold',
                    fontSize: '20px'
                }
            },

            subtitle: {
              text: '数据每周更新两次',
              align: 'right'
            },

            legend: {
              enabled: true,
              align: 'top',
              backgroundColor: '#FFFFFF',
              borderColor: '#CECECE',
              // borderWidth: 0.5,
              layout: 'vertical',
              verticalAlign: 'top',
              y: 100,
              shadow: false,
              padding: 10,
              itemMarginTop: 5,
              itemMarginBottom: 5,
              itemDistance: 50,
              itemStyle: {
                  lineHeight: '14px',
                  color: '#666666',
                  weight: 'normal'
              },
              symbolHeight: 10,
              symbolWidth: 20
            },

            rangeSelector: {
                selected: 4
            },

            xAxis: {
                type: 'datetime',

                minRange: 14 * 24 * 3600000, // fourteen days
                // x 轴日期格式化
                labels: {
    				          formatter :function() {
                   	    return Highcharts.dateFormat('%Y-%m-%d', this.value);
                	     }
                }
            },

            yAxis: {
                title: {
                  text: '累计收益'
                },
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                backgroundColor: 'rgba(250, 250, 250, 0.5)',   // 背景颜色
                borderColor: '#4773A5',         // 边框颜色
                borderRadius: 5,             // 边框圆角
                borderWidth: 1,               // 边框宽度
                animation: true,               // 是否启用动画效果
                style: {                      // 文字内容相关样式
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "blod",
                    fontFamily: "Courir new"
                },
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.y} <span style="font-weight:bold;font-size:16px">({point.change}%)</span><br/>',
                valueDecimals: 2,
                xDateFormat: '%Y年%m月%d日'
            },

            series: seriesOptions
        });
    }

    $.each(names, function (i, name) {

      seriesOptions[i] = {
          name: name,
          data: fund[name],
          color: colors[name]
      };

      // As we're loading the data asynchronously, we don't know what order it will arrive. So
      // we keep a counter and create the chart when all the data is loaded.
      seriesCounter += 1;

      if (seriesCounter === names.length) {
          createChart();
      }

    });

});
