// Global variables
var zipInput = $('#zip-input');


// function to get local storage & render last 3-4 zipcodes

// Get coordinates for the user-inputted Zipcode
function getCoords(zip) {
  var coordsURL = "http://api.openweathermap.org/geo/1.0/zip?zip=" + zip + "&appid=1cca1ff3113de5f3c3d237f233f7da56";

  fetch (coordsURL)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        getAirQuality(data.lat, data.lon);
      })
    }
  });
}

// Get the air quality of the Zipcode's coordinates
function getAirQuality(latitude, longitude) {
  var airQualityUrl = "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + latitude + "&lon=" + longitude + "&appid=1cca1ff3113de5f3c3d237f233f7da56";

  fetch (airQualityUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var aqi = data.list[0].main.aqi;
        console.log(data);
        displayResults(aqi);
        // save to local storage here ?
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
}

function displayResults(aqi) {   
  var testDisplay = $('#current-air');

  if (aqi <= 3) {
    testDisplay.text("Current air quality in " + zipInput.val() + " is " + aqi + ". Go Camping!");
  } else {
    testDisplay.text("Current air quality in " + zipInput.val() + " is " + aqi + ". Maybe not the best time to camp in this area.");
    // Suggest other zipcodes to camp in ?
    var otherZips = $('#nearby-zips');
    otherZips.text("Try searching these closest zipcodes. They have a bit better air quality.");
  }
}

// Searches the inputted Zipcode on search-button click
function searchZipcode(event) {
  
  // If user has nothing in local storage, show entry screen + hide results.
  // If user has something in local storage, hide entry screen + show results.

  event.preventDefault();
  var zip = zipInput.val();

  // If  Zipcode is inputted when button is clicked
  if (zip) {
    getCoords(zip);
    // TODO: clear the input form
  }

  // TODO: function to save inputted zipcode to local storage
}


// function to fetch info from Google Maps api for nearby Campgrounds from a given zip code



// if (airQuality is Good || Fair || Moderate) {
//   then we run get campgrounds from Google maps
// } else if (airQuality is Poor or Very Poor {
//   then we display a message to not go camping
// })


// Search button Event Listener
var searchBtn = $('.search-button');
searchBtn.on("click", searchZipcode);