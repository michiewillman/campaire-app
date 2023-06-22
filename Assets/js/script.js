$(document).ready(function () {

  // Global variables
  var map;
  var locationAPI = "pk.89ed628237a7d3a065d576b871965ac0";
  var iQAirAPI = "3ac59854-8742-4b4c-b4f1-4ea76e8f0301";

  function searchZipcode(event) {
    event.preventDefault();
    var input = $(this).closest('.search-form').find('.zip-input');
    var zip = input.val();

    if (zip) {
      getCoordinates(zip);
    }

    // Clear input field
    input.val('');
  }

  // Get coordinates for the user-inputted Zipcode
  function getCoordinates(zip) {
    var coordinatesURL =
      "https://us1.locationiq.com/v1/search?key=" +
      locationAPI +
      "&country=USA&postalcode=" +
      zip +
      "&format=json";

    fetch(coordinatesURL).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var Latitude = data[ 0 ].lat;
          var Longitude = data[ 0 ].lon;
          var locDetails = data[ 0 ].display_name;

          initMap(Latitude, Longitude, zip);
          getAirQuality(Latitude, Longitude, locDetails);
        });
      }
    });
  }

  // Get the air quality of the Zipcode's coordinates
  function getAirQuality(lat, lng, locDetails) {
    var airQualityUrl = "https://api.airvisual.com/v2/nearest_city?lat=" + lat + "&lon=" + lng + "&key=" + iQAirAPI;

    fetch(airQualityUrl)
      .then(function (response) {

        if (response.ok) {
          response.json().then(function (data) {
            var aqi = data.data.current.pollution.aqius;
            // var city = data.data.city;
            // var state = data.data.state;


            displayResults(aqi, locDetails);

          })
        }
      });
  }

  function displayResults(aqi, locDetails) {
    var currentContainer = $('#current-air');
    var resourcesContainer = $('#resources-container');
    var campContainer = $('#camp-results');

    var displayAQI = $('#display-aqi');
    displayAQI.text("The Air quality is " + aqi + " in " + locDetails);
    
    var resultMessage = $('#result-msg');
    resultMessage.removeClass();
    campContainer.removeClass();
    resourcesContainer.removeClass();
    
    if (aqi < 50) { // if air quality = good
      resourcesContainer.addClass('hide');
      // Add positive message styling 
      resultMessage.addClass('ui floating positive message');
      resultMessage.text('Pack your things, the air quality is good enough to camp!');
      campContainer.removeClass('hide');
    } 
      else if (aqi > 50 && aqi < 150) { // if air quality = moderate
      resourcesContainer.addClass('hide');
      // Add warning message styling 
      resultMessage.addClass('ui floating warning message');
      resultMessage.text('Air quality is acceptable for camping. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.');
      campContainer.removeClass('hide');
    } 
      else { // if air quality = unhealthy or worse
      campContainer.addClass('hide');
      // Add negative message styling 
      resultMessage.addClass('ui floating negative message');
      resultMessage.text("The air quality around you is unhealthy for most. Maybe not the best time to camp. Curl up with a good book and minimize your time outside.");
      // Show extra resource links
      resourcesContainer.removeClass('hide');
    }
    aqiLocationHistory(aqi, locDetails);

    return;
  }

  function aqiLocationHistory(aqi, locDetails) {
    var historyContainer = $('.previous-search');
    var aqiHistory = JSON.parse(localStorage.getItem("ah"));
    var locHistory = JSON.parse(localStorage.getItem("lh"));
  
    if (!aqiHistory || !locHistory) {
      aqiHistory = [];
      locHistory = [];
    }
  
    if (aqi && locDetails) {
      // Add the latest search to the history
      aqiHistory.unshift(aqi);
      locHistory.unshift(locDetails);
  
      // Trim the history to a maximum of 5 entries
      aqiHistory = aqiHistory.slice(0, 5);
      locHistory = locHistory.slice(0, 5);
  
      localStorage.setItem("ah", JSON.stringify(aqiHistory));
      localStorage.setItem("lh", JSON.stringify(locHistory));
  
      // Remove existing buttons from the history container
      historyContainer.empty();
  
      // Create buttons for the history entries
      for (var i = 0; i < aqiHistory.length; i++) {
        var locButton = $("<button>", {
          text: "AQI: " + aqiHistory[i] + " in " + locHistory[i],
          class: "history-button",
          click: function () {
            var index = $(this).index();
            displayResults(aqiHistory[index], locHistory[index]);
          },
        });
  
        // Append the button to the history container
        historyContainer.append(locButton);
      }
    }
  }
  
  // function to fetch info from Google Maps api for nearby Campgrounds from a given zip code
  function initMap(lat, lng, zip) {
    var coords = new google.maps.LatLng(lat, lng);
    var radius = 15000;

    // The map, centered at searched zip
    map = new google.maps.Map(document.getElementById("campgrounds"), {
      zoom: 10,
      center: coords,
    });

    var service = new google.maps.places.PlacesService(map);
    var nearbyCampgrounds = [];

    service.nearbySearch(
      {
        location: coords,
        radius: radius,
        type: [ "campground" ],
      },
      (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            // console.log(results[ i ]);
            nearbyCampgrounds.push(results[ i ]);
            createMarker(results[ i ], service);
          }
        }
      }
    );
  }

  function createMarker(result, service) {
    // console.log("result: " + result);
    var sizeScale = 20;

    var marker = new google.maps.Marker({
      map: map,
      position: result.geometry.location,
      icon: { url: result.icon, scaledSize: new google.maps.Size(sizeScale, sizeScale) },
      // label: result.name,
      clickable: true,
    });

    var fullAddress = "unchanged";
    var placeUrl = "unchanged";

    service.getDetails({
      placeId: result.place_id,
      fields: [
        "formatted_address",
        "url"
      ],
    }, (results) => {
      placeUrl = results.url;
      fullAddress = results.formatted_address;


      // console.log("placeUrl: " + placeUrl);
      // console.log("fullAddress: " + fullAddress);

      var infoWindow = new google.maps.InfoWindow({
        content: "<a href='" + placeUrl + "' target=blank>" + result.name + "</a><br>" + result.vicinity,

      });
      // Add a click event listener to the marker
      marker.addListener('click', function () {
        // Open the info window when the marker is clicked
        infoWindow.open(map, marker);
      });
    });

  }

  // Search button Event Listener
  $("#search-btn-1").on("click", searchZipcode);
  $("#search-btn-2").on("click", searchZipcode);
  initMap(45.5152, -122.6784, 97203);

});