(function($) {

  var selected = 2;

  $(window).resize(function() {
    refreshSelectedMovieCalc();
  });

  function refreshSelectedMovie() {
    $('.movie-wrapper').removeClass('selected');
    $('.movie-wrapper').eq(selected).addClass('selected');

    refreshSelectedMovieCalc();

    $(".movie-page").stop().animate({opacity: 0}, 250, function(){
      $(this).css({'background-image': "url('" + $('.movie-wrapper.selected').data('background') + "')"}).animate({opacity: 1},{duration:250});
    });

    $(".movie-content").stop().animate({opacity: 0}, 250, function(){
      $(this).find('h1').html($('.movie-wrapper.selected').find('h2.movie-title').html());
      $(this).find('p').html($('.movie-wrapper.selected').find('p.movie-description').html());

      $(this).find('.btn-play').data('play', $('.movie-wrapper.selected').data('play'));
      $(this).find('.btn-trailer').data('trailer', $('.movie-wrapper.selected').data('trailer'));

      $(this).find('li.score').html('<i class="fab fa-imdb mr-1"></i> ' + $('.movie-wrapper.selected').data('score'));
      $(this).find('li.pg').html('PG-' + $('.movie-wrapper.selected').data('pg'));
      $(this).find('li.time').html($('.movie-wrapper.selected').data('time'));
      $(this).find('li.category').html($('.movie-wrapper.selected').data('category'));
      $(this).find('li.year').html($('.movie-wrapper.selected').data('year'));

        $(this).animate({opacity: 1},{duration:250});
    });
  }

  function refreshSelectedMovieCalc() {
    var top_calc_px = (selected + 1) * -310 - 115;
    var top_calc = $(window).height() + top_calc_px;
    $('.movies-wrapper').stop().animate({top: top_calc}, {duration:250});
  }

  $(window).bind('mousewheel', function(event) {
    if(!$('body').hasClass('playing')) {
      if (event.originalEvent.wheelDelta >= 0 && selected > 0) {
        selected--;
        refreshSelectedMovie();
      } else if(event.originalEvent.wheelDelta <= 0 && selected < $('.movie-wrapper').length - 1) {
        selected++;
        refreshSelectedMovie();
      }
    }
  });

  $('.movie-cover').on('click', function(e) {
    var parent = $(this).parent();
    if(selected != $('.movie-wrapper').index(parent)) {
      selected = $('.movie-wrapper').index(parent);
      refreshSelectedMovie();
    }
  });

  $('.movie-close').on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('playing');
    $(".movie-page").stop().animate({opacity: 1}, 500, function() {});
    $('.movie-player iframe').attr('src', '');
  });

  $('.btn-play').on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('playing');
    $(".movie-page").stop().animate({opacity: 0}, 500, function() {});
    $('.movie-player iframe').attr('src', 'https://www.youtube.com/embed/' + $(this).data('play') + '?autoplay=1&controls=1&modestbranding=1&enablejsapi=1');
  });

  $('.btn-trailer').on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('playing');
    $(".movie-page").stop().animate({opacity: 0}, 500, function() {});
    $('.movie-player iframe').attr('src', 'https://www.youtube.com/embed/' + $(this).data('trailer') + '?autoplay=1&controls=1&modestbranding=1&enablejsapi=1');
  });

})(jQuery);
