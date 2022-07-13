import { determineInputToxicity } from './food_api.js'
import { clinicsApiCall } from './modals.js'

//Creates an empty JavaScript Array
var recentSearches = [];

const NO_HAZARD_ID = 'no-hazard-modal';
const MAYBE_HAZARD_ID = 'maybe-hazard-modal';
const SEVERE_HAZARD_ID = 'definite-hazard-modal';
const UNKNOWN_HAZARD_ID = 'unknown-hazard-modal';

function init() {
  $('.rs').on('click', onclickhandler);
  loadRecentSearches();
}

//This function loads recent searches from local storage when page is loaded
function loadRecentSearches() {
  let retrievedSearchesString = localStorage.getItem("recentSearches");
  if (retrievedSearchesString == null) {
    return;
  }

  // parses the stringified data back into an array
  let storedSearches = JSON.parse(retrievedSearchesString);
  let filteredSearches = storedSearches.filter(search => search.trim().length)
  recentSearches = filteredSearches;
  
  // Console log for testing purposes
  console.log(filteredSearches);
  // For each item in the array,
  for (var i = 0; i < filteredSearches.length; i++) {
    // A new button is revealed
    var button = $(`#rs${i + 1}`);
    button.show();
    // The button displays the search term
    button.text(filteredSearches[i]);
    //on click calls a function defined below, figured we would need it later
    // button.on("click", onclickhandler);
  }
}

//this function is called every time the submit button is clicked.
function searchFunction(userInput, recentSearch = false) {
  if (!userInput) {
    return;
  }

  if (!recentSearch) {
    console.log(userInput);
    // Check if empty
  
      // pushes eaten value into an empty array
      recentSearches.unshift(userInput);
  
      // If there are more than 4 recent searches, the oldest one is removed from the array
      if (recentSearches.length > 4) {
        recentSearches.pop();
      }
      //Converts recentSearches array into something that can be stored in local storage.
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }

  determineInputToxicity(userInput)
  .then((toxicity) => {


    let modalTarget;
    let clinicContainer;
    switch(toxicity) {
      case 1:
        // Mild
        modalTarget = '#'+NO_HAZARD_ID;
        showModal(modalTarget);
        break;
      case 2:
      case 3:
        // Moderate
        modalTarget = '#'+MAYBE_HAZARD_ID;
        clinicContainer = $(modalTarget).find('.clinic-info-container');
        showModal(modalTarget);
        clinicsApiCall(clinicContainer);
        break;
      case 4:
      case 5:
        // Severe
        modalTarget = '#'+SEVERE_HAZARD_ID;
        clinicContainer = $(modalTarget).find('.clinic-info-container');
        showModal(modalTarget);
        clinicsApiCall(clinicContainer);
        break;
      default:
        // Unknown
        modalTarget = '#'+UNKNOWN_HAZARD_ID;
        clinicContainer = $(modalTarget).find('.clinic-info-container');
        showModal(modalTarget);
        clinicsApiCall(clinicContainer);
        break;
    }
  });
}

//This function was made to try to make it easier to wire everything up later
function onclickhandler(event) {
  // console log for testing purposes
  // Call with the string
  let searchTerm = $(event.target).text();
  searchFunction(searchTerm, true);
}
// Once the submit button is clicked, take the input from textbox and save it to local storage

function indexPageInit() {
    $("#submitBtn").on('click', submitEatenHandler);
    $('#about-us-button').on('click', showModalHandler);
    $('#poison-index-button').on('click', showModalHandler);
    $('#faqs-button').on('click', showModalHandler);
}

function debugInit() {
    $("#no-hazard-debug-button").on('click', showNoHazardHandler);
    $("#maybe-hazard-debug-button").on('click', showMaybeHazardHandler);
    $("#faqs-debug-button").on('click', showModalHandler);
    $("#poison-index-debug-button").on('click', showModalHandler);
    $("#about-us-debug-button").on('click', showModalHandler);
    $("#definite-hazard-debug-button").on('click', showSevereHazardHandler);
    $("#unknown-hazard-debug-button").on('click', showUnknownHazardHandler);

    $(".my-modal-close").click(function() {
        $("html").removeClass("is-clipped");
        $(this).parents('.modal').removeClass("is-active");
     });

}

function submitEatenHandler(event) {
    let eatenInput = $("#eaten").val();
    localStorage.setItem("getValue",eatenInput);
    console.log(eatenInput);
}

function showModalHandler(event) {
    console.log("showModal");
    showModal($(this).data("target"));
}

function showModal(target) {
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
}

function showNoHazardHandler(event) {
  let target = '#'+NO_HAZARD_ID;
  showModal(target);
}

function showMaybeHazardHandler(event) {
  let target = '#'+MAYBE_HAZARD_ID;
  let clinicContainer = $(target).find('.clinic-info-container');
  showModal(target);
  clinicsApiCall(clinicContainer);
}

function showSevereHazardHandler(event) {
  let target = '#'+SEVERE_HAZARD_ID;
  let clinicContainer = $(target).find('.clinic-info-container');
  showModal(target);
  clinicsApiCall(clinicContainer);
}

function showUnknownHazardHandler(event) {
  let target = '#'+UNKNOWN_HAZARD_ID;
  let clinicContainer = $(target).find('.clinic-info-container');
  showModal(target);
  clinicsApiCall(clinicContainer);
}

debugInit()
indexPageInit()

// Sets buttons display to a default of hide
$("#buttonsContainer").children().hide();

// Once the submit button is clicked, take the input from textbox and save it to local storage. The functions on the end will help populate the recent searches bar and clear the text from the search bar.
$("#submitBtn").on("click", function () {
  var typed = $("#eaten").val().trim();
  console.log(typed);
  // calls searchFunction from above
  searchFunction(typed);
  //clears the text from the search bar
  $("#eaten").val("");
  // refreshes load receent searches function
  loadRecentSearches();
});
init();
//loads recent searches from local storage when page is loaded

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(51.508742, -0.120850),
    zoom: 5,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}