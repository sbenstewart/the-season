(function ($) {
    "use strict";
  
    $(document).ready(function($) {
      var Body = $('body');
      Body.addClass('preloader-site');
  });
  
    $(window).on('load',function() {
      $('.preloader-wrapper').fadeOut(800);
      $('.fixed-top').fadeOut('slow');
      $('body').removeClass('preloader-site');
  });
})(jQuery);