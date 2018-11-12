/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

var apiUrl = "https://api.lambdaspace.gr/api/v2.0/";

var _paq = _paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function() {
  var u = "//lambdaspace.piwikpro.com/";
  _paq.push(["setTrackerUrl", u + "piwik.php"]);
  _paq.push(["setSiteId", 1]);
  var d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];
  g.type = "text/javascript";
  g.async = true;
  g.defer = true;
  g.src = u + "piwik.js";
  s.parentNode.insertBefore(g, s);
})();

(function($) {
  "use strict"; // Start of use strict

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $("a.page-scroll").bind("click", function(event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top - 50
        },
        1250,
        "easeInOutExpo"
      );
    event.preventDefault();
  });

  // Highlight the top nav as scrolling occurs
  $("body").scrollspy({
    target: ".navbar-fixed-top",
    offset: 51
  });

  // Closes the Responsive Menu on Menu Item Click
  $(".navbar-collapse ul li a").click(function() {
    $(".navbar-toggle:visible").click();
  });

  // Fit Text Plugin for Main Header
  $("h1").fitText(1.2, {
    minFontSize: "35px",
    maxFontSize: "55px"
  });

  // Offset for Main Navigation
  $("#mainNav").affix({
    offset: {
      top: 100
    }
  });

  // Initialize WOW.js Scrolling Animations
  new WOW().init();
})(jQuery); // End of use strict

// Make class clickable-row act as an link
$(document.body).on("mousedown", ".clickable-row", function(e) {
  switch (e.which) {
    case 1:
      window.document.location = $(this).data("url"); //left click
      break;
    case 2:
      window.open($(this).data("url")); //middle click
      break;
  }
  return true; // to allow the browser to know that we handled it.
});

value = false;
function draw_bar() {
  if ($(".progress-bar").visible() && value === false) {
    $(".progress-bar").animate(
      {
        width: "37%"
      },
      1500
    );
    value = true;
  }
}

draw_bar();
$(window).scroll(function() {
  draw_bar();
});

// Add space status
$.get(apiUrl + "status", function(status) {
  var color, text;
  if (!!status.open) {
    text = "is Open!";
    color = "#5cb85c";
  } else {
    //text="is Closed";
    //color="#f05f40";
  }
  document.getElementById("status").textContent = text;
  document.getElementById("status").style.color = color;
});

/** This section is only needed once per page if manually copying **/
if (typeof MauticSDKLoaded == "undefined") {
  var MauticSDKLoaded = true;
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://techministry.mautic.net/mautic/media/js/mautic-form.js";
  script.onload = function() {
    MauticSDK.onLoad();
  };
  head.appendChild(script);
  var MauticDomain = "https://techministry.mautic.net";
  var MauticLang = {
    submittingMessage: "Please wait..."
  };
}

// Parse events from discourse
function eventParser(topic) {
  var event = {};
  var tokens = topic.split(" ");
  event.day = tokens[0];
  if (!event.day.match(/^\d\d\/\d\d\/\d\d\d\d+$/)) {
    throw "Not in expected format";
  }
  var dateTokens = tokens[0].split("/");
  var eventDate = new Date(
    dateTokens[2],
    dateTokens[1] - 1,
    dateTokens[0],
    23,
    59
  );

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

function toDate(dateStr) {
  var parts = dateStr.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

// Populate the events table thread
$.getJSON(apiUrl + "events", function(data) {
  var eventsTableThread = $("#eventsTableThread");
  var events = data.events;
  var futureEvents = [];
  try {
    for (
      var index = 0;
      index < events.length && futureEvents.length < 3;
      index++
    ) {
      var event = events[index];

      if (toDate(event.date) > Date.now()) {
        eventsTableThread.append(
          '<tr class="clickable-row" data-url="' +
            event.url +
            '"><td>' +
            event.date +
            "</td><td>" +
            event.begin +
            (event.end ? " - " + event.end : "") +
            "</td><td>" +
            event.title +
            "</td></tr>"
        );
      }
    }
  } catch (e) {
    console.error(e);
    return;
  }

  futureEvents.sort(function(a, b) {
    return a.date - b.date;
  });

  eventsTableThread = futureEvents;
});

// Display contact email
(function() {
  emailE = "lambdaspace.gr";
  emailE = "info" + "@" + emailE;
  document.getElementById("email").innerHTML =
    '<A href="mailto:' + emailE + '"target="_blank">' + emailE + "</a>";
})();

// Google Maps
function initMap() {
  var coordinates = {
      lat: 40.63749374375595,
      lng: 22.940762042999268
    },
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: coordinates,
      scrollwheel: false,
      mapTypeControlOptions: {
        mapTypeIds: []
      },
      styles: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f5f5"
            }
          ]
        },
        {
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#616161"
            }
          ]
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#f5f5f5"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#bdbdbd"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#eeeeee"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#e5e5e5"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#9e9e9e"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#757575"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#dadada"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#616161"
            }
          ]
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#9e9e9e"
            }
          ]
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [
            {
              color: "#e5e5e5"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              color: "#eeeeee"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#c9c9c9"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#9e9e9e"
            }
          ]
        }
      ]
    }),
    marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      title: "Lambda Space",
      icon: "/dist/favicons/favicon-32x32.png",
      url: "https://goo.gl/maps/njKDBywKnhy"
    });

  google.maps.event.addDomListener(marker, "click", function() {
    window.location.href = "https://goo.gl/maps/njKDBywKnhy";
  });
  $(window).on('load',function(){
    $('#movingout').modal('show');
});
}
