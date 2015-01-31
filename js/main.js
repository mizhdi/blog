var loadDom = document.querySelector('#loading');

if (!localStorage.getItem('loadingClose')) {
  loadDom.style.display = 'block';
}

setTimeout(function() {
  loadDom.style.display = 'none';
  localStorage.setItem('loadingClose', true);
}, 2500)

var btn = document.querySelector('#off-canvas-btn');
btn.addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('body').classList.toggle('active');
}, false);

var user = document.querySelector('.user-info');
var avatar = user.querySelector('.avatar');
avatar.addEventListener('click', function(e) {
  e.preventDefault();
  user.classList.toggle('open');
}, false);


