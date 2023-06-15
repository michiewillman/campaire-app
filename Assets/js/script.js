// Global variables
var zipInput = $("#zip-input");
var map;
var zip = 97203;

// function to get local storageg and render last zipcode

// Get coordinates for the user-inputted Zipcode
function getCoords(zip) {
  var coordsURL =
    "http://api.openweathermap.org/geo/1.0/zip?zip=" +
    zip +
    "&appid=1cca1ff3113de5f3c3d237f233f7da56";

  fetch(coordsURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data.lat, data.lon);

        getAirQuality(data.lat, data.lon);
      });
    }
  });
}

// Get the air quality of the Zipcode's coordinates
function getAirQuality(latitude, longitude) {
  var airQualityUrl =
    "http://api.openweathermap.org/data/2.5/air_pollution?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=1cca1ff3113de5f3c3d237f233f7da56";

  fetch(airQualityUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.list[0].main.aqi);
        var aqi = data.list[0].main.aqi;

        displayResults(aqi);
        // save to local storage here ?
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

function displayResults(aqi) {
  var testDisplay = $("#current-air");

  if (aqi >= 3) {
    testDisplay.text(
      "Current air quality in " +
        zipInput.val() +
        " is " +
        aqi +
        ". Go Camping!"
    );
  } else {
    testDisplay.text(
      "Current air quality in " +
        zipInput.val() +
        " is " +
        aqi +
        ". Maybe not the best time to camp in this area."
    );
    // Suggest other zipcodes to camp in ?
    var otherZips = $("#nearby-zips");
    otherZips.text(
      "Try searching these closest zipcodes. They have a bit better air quality."
    );
  }
}

// Searches the inputted Zipcode on search-button click
function searchZipcode(event) {
  event.preventDefault();
  var zip = zipInput.val();

  console.log("zip: " + zip);

  // If  Zipcode is inputted when button is clicked
  if (zip) {
    getCoords(zip);
    // TODO: clear the input form
  }

  // TODO: function to save inputted zipcode to local storage
}

// function to fetch info from Google Maps api for nearby Campgrounds from a given zip code
async function initMap(lat, lng) {
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { PlacesService } = await google.maps.importLibrary("places");
  const { AdvancedMarkerElement } = await google.maps.importLibrary(
    "marker"
  );
  const coordinates = { lat, lng };

  // The map, centered at Portland
  map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: coordinates,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: coordinates,
    title: "Here",
  });
}

// if (airQuality is Good || Fair || Moderate) {
//   then we run get campgrounds from Google maps
// } else if (airQuality is Poor or Very Poor {
//   then we display a message to not go camping
// })

// Search button Event Listener
var searchBtn = $(".search-button");
searchBtn.on("click", searchZipcode);
initMap();
