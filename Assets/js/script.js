$(document).ready(function () {
  // Global variables
  var zipInput = $("#zip-input").val();
  var googleApiKey = "AIzaSyBbUsG9h8clR86p6Hqs5QtjViuXYG3eE04";
  var openWeatherKey = "1cca1ff3113de5f3c3d237f233f7da56";
  var recGovApiKey = "0ffd0940-cacd-44b9-ab58-184877e57275";
  var zip;
  var map;

  // Uses user input if it exists, else it uses a default
  if (zipInput) {
    zip = zipInput;
  } else {
    zip = "97209";
  }

  // troubleshooting google maps
  function initialize() {
    map = new google.maps.Map(document.getElementById("map"));
  }

  // function to get local storage and render last zipcode

  // Get coordinates for the user-inputted Zipcode
  function getCoords(zip) {
    var coordsURL =
      "http://api.openweathermap.org/geo/1.0/zip?zip=" +
      zip +
      "&appid=1cca1ff3113de5f3c3d237f233f7da56";

    fetch(coordsURL).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var coordinates = { lat: data.lat, lon: data.lon };
          console.log(data.lat, data.lon);
          console.log(coordinates);

          // getAirQuality(coordinates);
          getCampgrounds(coordinates);
        });
      }
    });
  }

  // Get air quality data for entered zip code
  // function getAirQuality(coordinates) {
  //   var requestURL =
  //     "http://api.openweathermap.org/data/2.5/air_pollution?q=" +
  //     zip +
  //     "&appid=1cca1ff3113de5f3c3d237f233f7da56";

  //   fetch(requestURL).then(function (response) {
  //     if (response.ok) {
  //       response.json().then(function (data) {
  //         console.log("response is coming back ok");
  //         console.log(data);
  //       });
  //     } else {
  //       alert("Error: " + response.statusText);
  //     }
  //   });
  // }

  // if (airQuality is Good || Fair || Moderate) {
  //   then we run get campgrounds from Google maps
  // } else if (airQuality is Poor or Very Poor {
  //   then we display a message to not go camping
  // })

  // Gets campgrounds from Google maps
  function getCampgrounds(coordinates) {
    var latitude = coordinates.lat;
    var longitude = coordinates.lon;
    var radius = 50000;

    var mapsUrl =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      latitude +
      "%2C" +
      longitude +
      "&radius=" +
      radius +
      "&type=campground&rankby=distance&key=" +
      googleApiKey;

    fetch(mapsUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("Google Maps response is coming back OK");
          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    });
  }

  // Gets campsites from recreation.gov
  // function getCampgrounds(){
  //   var campsitesUrl =
  // }

  getCoords(zip);
});
