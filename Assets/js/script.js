// fetch info from air quality api

var zip= '97209';
var requestURL = "http://api.openweathermap.org/data/2.5/air_pollution?q=" + zip + "&appid=e75af7a2b8b9ae694d1e5fe8ac3e5c75";

fetch (requestURL)
.then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log("response is coming back ok");
      console.log(data);
    });
  } else {
    alert('Error: ' + response.statusText);
  }
});


// if (airQuality is Good || Fair || Moderate) {
//   then we run get campgrounds from Google maps
// } else if (airQuality is Poor or Very Poor {
//   then we display a message to not go camping
// })

// fetch info from Google Maps api for nearby Campgrounds from the given zip code

// function get campgrounds from Google maps