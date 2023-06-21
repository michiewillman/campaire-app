
function displayResults(aqi, locDetails) {
  var searchResults = $('#search-results');
  var currentContainer = $('#current-air');
  var resourcesContainer = $('#resources-container');
  var disclaimer = $('<p>');
  var campgroundContainer = $('#campgrounds');
  disclaimer.text("Please note: Map will only display camping within 50 kilometers.");
  var displayAQI = $('#display-aqi');
  displayAQI.text("Your Air quality is " + aqi + " in " + locDetails);

  var resultMessage = $('#result-msg');

  if (aqi < 50) { // if air quality = good
    // resourcesContainer.addClass('hide');
    resultMessage.addClass('ui floating positive message');
    resultMessage.text('Pack your things, the air quality is good enough to camp!');
    campgroundContainer.removeClass('hide');
    // Add maps disclaimer
    searchResults.append(disclaimer);
  } 
    else if (aqi > 50 && aqi < 150) { // if air quality = moderate
      // resourcesContainer.addClass('hide');
    resultMessage.addClass('ui floating warning message');
    resultMessage.text('Air quality is acceptable for camping. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.');
    campgroundContainer.removeClass('hide');
    // Add maps disclaimer
    searchResults.append(disclaimer);
  } 
    else { // if air quality = unhealthy or worse
    // campgroundContainer.addClass('hide');
    var resourceTitle = $('<h3>');
    resultMessage.addClass('ui floating negative message');
    resultMessage.text("The air quality around you is unhealthy for most. Maybe not the best time to camp. Curl up with a good book and minimize your time outside.");
    currentContainer.append(resourceTitle);
    resourceTitle.text('In the meantime, please check out the great organizations below and how you can help fight air pollution.');

    // Show extra resource links
    resourcesContainer.removeClass('hide');
  }

  return;
}