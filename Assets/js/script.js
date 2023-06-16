// Global variables
var zipInput = $("#zip-input");
var map;
var googleMapId = "3ee7328d82b483e6";
//var zip = 97203;
var locationAPI = "pk.89ed628237a7d3a065d576b871965ac0";
var iQAirAPI = "3ac59854-8742-4b4c-b4f1-4ea76e8f0301";

// function to get local storage & render last 3-4 zipcodes

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
        var Latitude = data[0].lat;
        var Longitude = data[0].lon;
        initMap(Latitude, Longitude, zip);
        getAirQuality(Latitude, Longitude);
      });
    }
  });
}

// Get the air quality of the Zipcode's coordinates
function getAirQuality(lat, lon) {
  var airQualityUrl =
    "http://api.airvisual.com/v2/nearest_city?lat=" +
    lat +
    "&lon=" +
    lon +
    "&key=" +
    iQAirAPI;

  fetch(airQualityUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var aqi = data.data.current.pollution.aqius;
        var city = data.data.city;
        var state = data.data.state;

        displayResults(aqi, city, state);
      });
    }
  });
}

function displayResults(aqi, city, state) {
  var displayAQI = $("#current-air");
  if (0 < aqi < 50) {
    displayAQI.text(
      "Your Air quality is " + aqi + " in " + city + ", " + state
    );
  } else if (50 <= aqi > 100) {
    displayAQI.text(
      "Your Air quality is " + aqi + " in " + city + ", " + state
    );
  }
  return;
}
// Suggest other zipcodes to camp in ?
//     var otherZips = $("#nearby-zips");
//     otherZips.text(
//       "Try searching these closest zipcodes. They have a bit better air quality."
//     );
//   }
// }

// Searches the inputted Zipcode on search-button click

// If user has nothing in local storage, show entry screen + hide results.
// If user has something in local storage, hide entry screen + show results.

function searchZipcode(event) {
  event.preventDefault();
  var zip = zipInput.val();

  if (zip) {
    getCoordinates(zip);
  }
}

// If  Zipcode is inputted when button is clicked

// TODO: clear the input form

// TODO: function to save inputted zipcode to local storage

// If  Zipcode is inputted when button is clicked

// TODO: clear the input form

// TODO: function to save inputted zipcode to local storage

// function to fetch info from Google Maps api for nearby Campgrounds from a given zip code
function initMap(lat, lng, zip) {
  var coordinates = new google.maps.LatLng(lat, lng);

  // The map, centered at searched zip
  map = new google.maps.Map(document.getElementById("campgrounds"), {
    zoom: 10,
    center: coordinates,
    mapId: googleMapId,
  });

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(
    {
      location: map.getCenter(),
      radius: 50000,
      type: ["campground"],
    },
    (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }
  );
}

function createMarker(result) {
  console.log("result: " + result);

  var marker = new google.maps.Marker({
    map: map,
    position: result.geometry.location,
  });
}

// Sets initial map
// async function initMap(lat, lng) {
//   console.log("Lat: " + lat + ", Lng: " + lng);

//   // Request needed libraries.
//   //@ts-ignore
//   const { Map } = await google.maps.importLibrary("maps");
//   const coordinates = new google.maps.LatLng(lat, lng);

//   // The map, centered on Portland
//   map = new Map(document.getElementById("campgrounds"), {
//     zoom: 10,
//     center: coordinates,
//     mapId: googleMapId,
//   });
// }

// if (airQuality is Good || Fair || Moderate) {
//   then we run get campgrounds from Google maps
// } else if (airQuality is Poor or Very Poor {
//   then we display a message to not go camping
// })

// Search button Event Listener
var searchBtn = $(".search-button");
searchBtn.on("click", getCoordinates);


