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


