var zipInput = $('#zip-input');

function getCoordinates(zip) {
    //console.log();
    var coordinatesUrl = "https://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=" + zip + "&api_key=8EBC362A-4EB7-4EC2-ABB1-FBA385B90C7D";
   console.log(coordinatesUrl)
    fetch (coordinatesUrl)
       // mode: "no-cors"
    .then(function (response) {
        
         if(response.ok) {
            response.json().then(function(data) {
                console.log(data[0]);
                 var Latitude = data[0].Latitude;
                 var Longitude = data[0].Longitude;
                 getAirQuality(Latitude, Longitude);
                 console.log(data[0].Latitude);
                console.log(data[0].Longitude);
             })
         }
    });
}


function getAirQuality(lat, long) {
    var airQualityUrl = "https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=" + lat + "&longitude=" + long + "&distance=1000&api_key=8EBC362A-4EB7-4EC2-ABB1-FBA385B90C7D";

    fetch(airQualityUrl)
    .then(function (response) {
        if(response.ok) {
            response.json().then(function (data) {
                var aqi = data[0].AQI;
                console.log(data);
                //var loc = data[0].ReportingArea;
                //console.log(data[0].ReportingArea);
                displayResults(aqi);
                //displayResults(state);
            })
        }
    });
}

function displayResults(aqi, state) {
    var displayAQI = $('#current-air');
    if (aqi < 50) {
        displayAQI.text("Your Air quality is " + aqi);
    } else if (50 <= aqi > 100) {
        displayAQI.text("Your Air quality is " + aqi);
    }
    return;
}

function searchZipcode(event) {
    event.preventDefault();
    var zip = zipInput.val();

    if (zip) {
        getCoordinates(zip);
    }
}


var searchBtn = $('.search-button');
searchBtn.on("click", searchZipcode);