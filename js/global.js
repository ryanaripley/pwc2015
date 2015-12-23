// Code stolen from CSS-Tricks for smooth scrolling
// http://css-tricks.com/snippets/jquery/smooth-scrolling/

$(function() {

  $(".menu-toggle").click(function() {

    $("body").toggleClass("menu-open");

  });

  $('a[href*=#]:not([href=#])').click(function() {
    if ( $("body").hasClass( "menu-open" ) ) {
      $("body").removeClass( "menu-open" );
    }
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 400);
        return false;
      }
    }
  });

  if(navigator.userAgent.match(/Trident\/7\./)) {
    $('body').on("mousewheel", function () {
      console.log('hey');
      event.preventDefault();

      var wheelDelta = event.wheelDelta;

      var currentScrollPosition = window.pageYOffset;
      window.scrollTo(0, currentScrollPosition - wheelDelta);
    });
  };

});
