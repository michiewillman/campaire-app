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

  // Uses user input if it exists, else it uses a default
  if (zipInput) {
    zip = zipInput;
  } else {
    zip = "97209";
  }

  // Get coordinates for the user-inputted Zipcode
  function getCoords() {
    var coordsURL =
      "http://api.openweathermap.org/geo/1.0/zip?zip=" +
      zip +
      "&appid=1cca1ff3113de5f3c3d237f233f7da56";

    fetch(coordsURL).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var coordinates = { lat: data.lat, lng: data.lon };
          console.log(data.lat, data.lon);
          console.log(coordinates);

          initMap(coordinates);
          // getAirQuality(coordinates);
          // getCampgrounds(coordinates);
        });
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

  // function to get local storage and render last zipcode

  // Get air quality data for entered zip code
  // OpenAir > Quinn

  // if (airQuality is Good || Fair || Moderate) {
  //   then we run get campgrounds from Google maps
  // } else if (airQuality is Poor or Very Poor {
  //   then we display a message to not go camping
  // })

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
