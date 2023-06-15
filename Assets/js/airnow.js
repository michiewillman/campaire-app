var zipInput = $('#zip-input');
var latLongInput = $('#zip-input');
var locationAPI = ('pk.89ed628237a7d3a065d576b871965ac0');
var iQAirAPI = ('3ac59854-8742-4b4c-b4f1-4ea76e8f0301');

function getCoordinates(zip) {
    var coordinatesURL = "https://us1.locationiq.com/v1/search?key=" + locationAPI + "&country=USA&postalcode=" + zip + "&format=json";
    
   
    fetch(coordinatesURL) 
    .then(function(response){
        console.log(response.status)
        if(response.ok) {
            response.json().then (function(data){
                console.log(data);
                var Latitude = data[0].lat;
                var Longitude = data[0].lon;
                console.log(Latitude, Longitude);
                getAirQuality(Latitude, Longitude);
            })
        }
    });
}


function getAirQuality(lat, lon) {
    var  airQualityUrl = "http://api.airvisual.com/v2/nearest_city?lat=" + lat + "&lon=" + lon + "&key=" + iQAirAPI;
    
    fetch(airQualityUrl)
    .then(function (response) {
        console.log(response.status)
        if(response.ok) {
            response.json().then(function (data) {
               
                var aqi = data.data.current.pollution.aqius;
                var loc = data.data.city

                
                displayResults(aqi,loc);
                
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


var searchBtn = $('.search-button');
searchBtn.on("click", searchZipcode);

