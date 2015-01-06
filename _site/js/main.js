$(function() {

  $('#off-canvas-btn').on('click', function() {
    $('body').toggleClass('active');
  });

  $('.user-info .avatar').on('click', function() {
    $('.user-info').toggleClass('open');
  });


  // $('#load-more>a').on('click', function() {

  //   $.ajax({
  //     url: '/api/posts.json',
  //     success: function(data) {
  //       console.log(data);
  //       var count = 1, content = "", delta = 0, count_sup = count + 5;
  //       $.each(data, function(i, item) {
  //         console.log(item);
  //         if (i >= count & i < count_sup) {
  //           content += '<article><h2><a class="post-link" href="' + item.link + '">' + item.title + '</a></h2>' + 
  //                      '<p>' + item.desc + '</p><footer>' + item.date + '</footer></article>';
  //           delta++;
  //         }
  //       });
  //       count += delta;
  //       $('.article-list').append(content);
  //     }
  //   });

  // });
  


})