var zipInput = $('#zip-input');
var airnowAPI = ('8EBC362A-4EB7-4EC2-ABB1-FBA385B90C7D')

function getCoordinates(zip) {
    //console.log();
    var coordinatesUrl = "https://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=" + zip + "&api_key=" + airnowAPI;
  
    fetch (coordinatesUrl)
       // mode: "no-cors"
    .then(function (response) {
        
         if(response.ok) {
            response.json().then(function(data) {
                
                 var Latitude = data[0].Latitude;
                 var Longitude = data[0].Longitude;
                 getAirQuality(Latitude, Longitude);
             
               })
         }
    });
}


function getAirQuality(lat, long) {
    var airQualityUrl = "https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=" + lat + "&longitude=" + long + "&distance=1000&api_key=" + airnowAPI;

    fetch(airQualityUrl)
    .then(function (response) {
        if(response.ok) {
            response.json().then(function (data) {
                var aqi = data[0].AQI;
                
                var loc = data[0].ReportingArea;
                
                displayResults(aqi, loc);
                
            })
        }
    });
}

function displayResults(aqi, loc) {
    var displayAQI = $('#current-air');
    if (aqi < 50) {
        displayAQI.text("Your Air quality is " + aqi +" in " + loc);
    } else if (50 <= aqi > 100) {
        displayAQI.text("Your Air quality is " + aqi + " in " + loc);
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

