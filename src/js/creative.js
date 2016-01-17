/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict

value = false;
function draw_bar(){
  if ($('.progress-bar').visible() && value == false) {
    $(".progress-bar").animate({
      width: "10%"
    }, 2500);
    value = true;
  }
}

draw_bar();
$(window).scroll(function() {
  draw_bar();
});

$('.directions').click(function() {
  window.location = "http://bit.ly/1O4hnu4";
});

// Add space status
$.get('hackers.txt',function (data){
      hackers = parseInt(data);
      if(isNaN(hackers)){
        text="";
        console.log("There was an error with hackers.txt");
      }else if(hackers>0){
        text="is Open!";
      }else{
        text="is Closed";
      }
      document.getElementById("status").textContent=text;
    });
