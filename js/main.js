var body = document.querySelector('body');

var btn = document.querySelector('#off-canvas-btn');
btn.addEventListener('click', function(e) {
  e.preventDefault();
  body.classList.toggle('active');
}, false);

var content = document.querySelector('.content');
content.addEventListener('click', function(e) {

  if (body.classList.contains('active')) {
    body.classList.remove('active');
  }
}, false);

// 简单的链接不能点
var lockedLink = document.querySelectorAll('a.lock');
for (var i = 0, len = lockedLink.length; i < len; i++) {
  lockedLink[i].addEventListener('click', function(e) {
    alert("文章找不到了！！(´・ω・｀)");
    e.preventDefault();
  }, false);
}
