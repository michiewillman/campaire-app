var zipInput = $('#zip-input');
var latLongInput = $('#zip-input');
var airnowAPI = ('8EBC362A-4EB7-4EC2-ABB1-FBA385B90C7D');
var locationAPI = ('pk.89ed628237a7d3a065d576b871965ac0');

// function getCoordinates(zip) {
//     //console.log();
//     var coordinatesUrl = "https://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=" + zip + "&api_key=" + airnowAPI;
  
//     fetch (coordinatesUrl)
//        // mode: "no-cors"
//     .then(function (response) {
        
//          if(response.ok) {
//             response.json().then(function(data) {
                
//                  var Latitude = data[0].Latitude;
//                  var Longitude = data[0].Longitude;
//                  getAirQuality(Latitude, Longitude);
             
//                })
//          }
//     });
// }
function getCoordinates(zip) {
    var coordinatesURL = "https://us1.locationiq.com/v1/search?key=" + locationAPI + "&postalcode=" + zip + "&format=json";
    // coordinatesURL = "https://us1.locationiq.com/v1/reverse?key=" + locationAPI + "&lat=42.1946&lon=122.7095&format=json";
    // coordinatesURL = "https://us1.locationiq.com/v1/search?key=" + locationAPI + "&postalcode=98520&format=json";
    fetch(coordinatesURL) 
    .then(function(response){
        console.log(response.status)
        if(response.ok) {
            response.json().then (function(data){
                console.log(data);
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
    if (0 < aqi < 50) {
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
// function searchLatLong(event) {
//     event.preventDefault();
//     var latLong = latLongInput.val()

//     if (latLong) {
//         getAirQuality(latLong);
//     }
// }


var searchBtn = $('.search-button');
searchBtn.on("click", searchZipcode);

