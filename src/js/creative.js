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
      var color;
      if(isNaN(hackers)){
        text="";
        console.log("There was an error with hackers.txt");
      }else if(hackers>0){
        text="is Open!";
        color="#5cb85c";
      }else{
        text="is Closed";
        color="#f05f40";
      }
      document.getElementById("status").textContent=text;
      document.getElementById("status").style.color=color;
    });

/** This section is only needed once per page if manually copying **/
if (typeof MauticSDKLoaded == 'undefined') {
    var MauticSDKLoaded = true;
    var head            = document.getElementsByTagName('head')[0];
    var script          = document.createElement('script');
    script.type         = 'text/javascript';
    script.src          = 'https://techministry.mautic.com/mautic/media/js/mautic-form.js';
    script.onload       = function() {
        MauticSDK.onLoad();
    };
    head.appendChild(script);
    var MauticDomain = 'https://techministry.mautic.com';
    var MauticLang   = {
        'submittingMessage': "Please wait..."
    };
}

// Parse events from discourse
function eventParser(topic) {
  var event = {};
  var tokens = topic.split(' ');
  event.day = tokens[0];
  if (!event.day.match(/^\d\d\/\d\d\/\d\d\d\d+$/)) {
    throw 'Not in expected format';
  }
  var dateTokens = tokens[0].split('/');
  var eventDate = new Date(dateTokens[2], dateTokens[1] - 1, dateTokens[0], 23, 59);

  event.date = eventDate;

  if (tokens[1].match(/^\d\d:\d\d+$/)) {
    event.time = tokens[1];
    event.title = topic.substr(17);
  } else {
    event.time = "";
    event.title = topic.substr(11);
  }

  return event;
}

// Populate the events table thread
$.getJSON('http://discourse.techministry.gr/c/5/l/latest.json', function(data){
  var eventsTableThread = $('#eventsTableThread');
  var futureEvents = new Array();

  data.topic_list.topics.forEach(function(topic) {
    var event;
    try {
      event = eventParser(topic.title);
    } catch(e) {
      return;
    }
    if (event.date > Date.now()) {
      futureEvents.push(event);
    }
  });

  futureEvents.sort(function(a,b) {
    return a.date.getTime() - b.date.getTime();
  });

  for (var i = 0; i < 4 && i < futureEvents.length; i++) {
    eventsTableThread.append('<tr><td>' + futureEvents[i].day + '</td><td>' + futureEvents[i].time +
      '</td><td>' + futureEvents[i].title + '</td></tr>');
  }
});
