$(document).ready(function () {
  // Global variables
  const googleApiKey = "AIzaSyBbUsG9h8clR86p6Hqs5QtjViuXYG3eE04";
  const openWeatherKey = "1cca1ff3113de5f3c3d237f233f7da56";
  const recGovApiKey = "0ffd0940-cacd-44b9-ab58-184877e57275";
  var zipInput = $("#zip-input").val();
  var zip;
  var searchBtn = $("#search-button");
  var map;

  console.log("zipInput: " + zipInput);

// function to get local storageg and render last zipcode

  // Get coordinates for the user-inputted Zipcode
  function getCoords() {
    var coordsURL =
      "http://api.openweathermap.org/geo/1.0/zip?zip=" +
      zip +
      "&appid=1cca1ff3113de5f3c3d237f233f7da56";

  fetch (coordsURL)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data.lat, data.lon);
        getAirQuality(data.lat, data.lon);
      })
    }
  });
}

  async function initMap(coordinates) {
    // The location of Uluru
    // const position = { lat: -25.344, lng: 131.031 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { PlacesService } = await google.maps.importLibrary("places");
    const { AdvancedMarkerElement } = await google.maps.importLibrary(
      "marker"
    );

    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
      zoom: 4,
      center: coordinates,
      mapId: "DEMO_MAP_ID",
    });

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

  // function to get local storage and render last zipcode

  if (aqi >= 3) {
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

  async function initMap(coordinates) {
    // The location of Uluru
    // const position = { lat: -25.344, lng: 131.031 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { PlacesService } = await google.maps.importLibrary("places");
    const { AdvancedMarkerElement } = await google.maps.importLibrary(
      "marker"
    );

    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
      zoom: 4,
      center: coordinates,
      mapId: "DEMO_MAP_ID",
    });

    const nearby = new PlacesService({
      location: coordinates,
      rankBy: "DISTANCE",
      type: "campground",
    });

    console.log(nearby);

    // The marker, positioned at Uluru
    const marker = new AdvancedMarkerElement({
      map: map,
      position: coordinates,
      title: "Here",
    });
  }

  // Gets campgrounds from Google maps
  function getCampgrounds(coordinates) {
    // var lat = coordinates.lat;
    // var lon = coordinates.lng;
    var radius = 50000;

    // var mapsUrl =
    //   "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
    //   lat +
    //   "%2C" +
    //   lon +
    //   "&radius=50000&type=campground&rankby=distance&mode=no-cors&key=" +
    //   googleApiKey;

    // fetch(mapsUrl).then(function (response) {
    //   if (response.ok) {
    //     response.json().then(function (data) {
    //       console.log("Google Maps response is coming back OK");
    //       console.log(data);
    //     });
    //   } else {
    //     alert("Error: " + response.statusText);
    //   }
    // });
  }

  searchBtn.on("click", getCoords);
});
