import { determineInputToxicity } from './food_api.js'
import { clinicsApiCall, initModals } from './modals.js'
import { populateAboutUsSection } from './aboutUs.js'

//Creates an empty JavaScript Array
var recentSearches = [];

const NO_HAZARD_ID = 'no-hazard-modal';
const MAYBE_HAZARD_ID = 'maybe-hazard-modal';
const SEVERE_HAZARD_ID = 'definite-hazard-modal';
const UNKNOWN_HAZARD_ID = 'unknown-hazard-modal';

const SEARCH_AREA_ID = 'eaten';

const SUBMIT_BUTTON_ID = 'submitBtn';
const BUTTON_LOADING_CLASS = 'is-loading';
const RECENT_BUTTON_CLASS = 'rs';

const TEAM_CONTAINER_ID = 'team-container';

function init() {
  $("#"+SUBMIT_BUTTON_ID).on('click', submitButtonHandler);
  $('#about-us-button').on('click', showModalHandler);
  $('#poison-index-button').on('click', showModalHandler);
  $('#faqs-button').on('click', showModalHandler);
  
  $(".my-modal-close").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parents('.modal').removeClass("is-active");
  });

  initModals();

  $('.'+RECENT_BUTTON_CLASS).on('click', recentSearchButtonHandler);
  populateAboutUsSection($('#'+TEAM_CONTAINER_ID));
  loadRecentSearches();
}

function debugInit() {
  $("#no-hazard-debug-button").on('click', showNoHazardHandler);
  $("#maybe-hazard-debug-button").on('click', showMaybeHazardHandler);
  $("#faqs-debug-button").on('click', showModalHandler);
  $("#poison-index-debug-button").on('click', showModalHandler);
  $("#about-us-debug-button").on('click', showModalHandler);
  $("#definite-hazard-debug-button").on('click', showSevereHazardHandler);
  $("#unknown-hazard-debug-button").on('click', showUnknownHazardHandler);

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
  let searchBox = $('#'+SUBMIT_BUTTON_ID);
  let recentButtons = $('.'+RECENT_BUTTON_CLASS);
  searchBox.addClass(BUTTON_LOADING_CLASS);
  recentButtons.addClass(BUTTON_LOADING_CLASS);
  if (!userInput) {
    searchBox.removeClass(BUTTON_LOADING_CLASS);
    recentButtons.removeClass(BUTTON_LOADING_CLASS);
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
    console.log('main then')

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
    
    searchBox.removeClass(BUTTON_LOADING_CLASS);
    recentButtons.removeClass(BUTTON_LOADING_CLASS);
  });
}

function submitButtonHandler(event) {
  console.log('button handler');
  console.log(event);
  let searchBox = $('#'+SEARCH_AREA_ID);
  let searchTerm = searchBox.val().trim();
  console.log('searchterm: ' + searchTerm);
  searchBox.val('');
  searchFunction(searchTerm, false);
  loadRecentSearches();
}

//This function was made to try to make it easier to wire everything up later
function recentSearchButtonHandler(event) {
  // console log for testing purposes
  // Call with the string
  console.log('button handler');
  console.log(event);
  let searchButton = $(event.target);
  let searchTerm = searchButton.text();
  console.log('searchterm: ' + searchTerm)
  searchButton.val('');
  searchFunction(searchTerm, true);
  loadRecentSearches();
}
// Once the submit button is clicked, take the input from textbox and save it to local storage

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

// Sets buttons display to a default of hide
$("#buttonsContainer").children().hide();

debugInit();
init();


// Once the submit button is clicked, take the input from textbox and save it to local storage. The functions on the end will help populate the recent searches bar and clear the text from the search bar.
// $("#submitBtn").on("click", function () {
//   var typed = $("#eaten").val().trim();
//   console.log(typed);
//   // calls searchFunction from above
//   searchFunction(typed);
//   //clears the text from the search bar
//   $("#eaten").val("");
//   // refreshes load receent searches function
//   loadRecentSearches();
// });
//loads recent searches from local storage when page is loaded

// function myMap() {
//   var mapProp = {
//     center: new google.maps.LatLng(51.508742, -0.120850),
//     zoom: 5,
//   };
//   var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
// }