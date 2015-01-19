window.onload = function() {

  // setTimeout(function() {
  //   document.querySelector('#loading').style.display = 'none';
  // }, 2500)

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

}
