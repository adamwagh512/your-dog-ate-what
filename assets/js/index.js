import { determineInputToxicity } from './food_api.js'
import { placesClinicsApiCall, initModals } from './modals.js'
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

const CLINIC_INFO_CONTAINER_CLASS = 'clinic-info-container';

const TEAM_CONTAINER_ID = 'team-container';

// Initializes the page
// Sets up the button handlers, randomizes the about us modal, and loads the recent searches from localstorage
function init() {

  // Sets buttons display to a default of hide
  $("#buttonsContainer").children().hide();

  $("#" + SUBMIT_BUTTON_ID).on('click', submitButtonHandler);
  $('#about-us-button').on('click', showModalHandler);
  $('#poison-index-button').on('click', showModalHandler);
  $('#faqs-button').on('click', showModalHandler);

  $(".my-modal-close").click(function () {
    $("html").removeClass("is-clipped");
    $(this).parents('.modal').removeClass("is-active");
  });


  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  initModals();

  $('.' + RECENT_BUTTON_CLASS).on('click', recentSearchButtonHandler);
  populateAboutUsSection($('#' + TEAM_CONTAINER_ID));
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
    $(button.parent()).show();
    // The button displays the search term
    button.text(filteredSearches[i]);
    //on click calls a function defined below, figured we would need it later
    // button.on("click", onclickhandler);
  }
}

//this function is called every time the submit button is clicked.
function searchFunction(userInput, recentSearch = false) {
  // Grabs the button inputs and makes them spin (Bulma stuff)
  let searchBox = $('#' + SUBMIT_BUTTON_ID);
  let recentButtons = $('.' + RECENT_BUTTON_CLASS);
  searchBox.addClass(BUTTON_LOADING_CLASS);
  recentButtons.addClass(BUTTON_LOADING_CLASS);

  if (!userInput) {
    searchBox.removeClass(BUTTON_LOADING_CLASS);
    recentButtons.removeClass(BUTTON_LOADING_CLASS);
    return;
  }

  if (!recentSearch) {
    console.log(userInput);

    // pushes eaten value into an empty array
    recentSearches.unshift(userInput);

    // If there are more than 4 recent searches, the oldest one is removed from the array
    if (recentSearches.length > 4) {
      recentSearches.pop();
    }

    //Converts recentSearches array into something that can be stored in local storage.
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }

  // After determining toxicity,
  // Switch statement to present each different modal
  determineInputToxicity(userInput)
    .then((toxicity) => {
      console.log('main then')

      let modalTarget;
      let clinicContainer;
      switch (toxicity) {
        case 1:
          // Mild
          modalTarget = '#' + NO_HAZARD_ID;
          showModal(modalTarget);
          break;
        case 2:
        case 3:
          // Moderate
          modalTarget = '#' + MAYBE_HAZARD_ID;
          clinicContainer = $(modalTarget).find('.' + CLINIC_INFO_CONTAINER_CLASS);
          showModal(modalTarget);
          placesClinicsApiCall(clinicContainer);
          break;
        case 4:
        case 5:
          // Severe
          modalTarget = '#' + SEVERE_HAZARD_ID;
          clinicContainer = $(modalTarget).find('.' + CLINIC_INFO_CONTAINER_CLASS);
          showModal(modalTarget);
          placesClinicsApiCall(clinicContainer);
          break;
        default:
          // Unknown
          modalTarget = '#' + UNKNOWN_HAZARD_ID;
          clinicContainer = $(modalTarget).find('.' + CLINIC_INFO_CONTAINER_CLASS);
          showModal(modalTarget);
          placesClinicsApiCall(clinicContainer);
          break;
      }

      // Make all the buttons stop spinning
      searchBox.removeClass(BUTTON_LOADING_CLASS);
      recentButtons.removeClass(BUTTON_LOADING_CLASS);
    });
}

// Function called from the submit button
// Grabs the value, resets the box text, then searches
function submitButtonHandler(event) {
  let searchBox = $('#' + SEARCH_AREA_ID);
  let searchTerm = searchBox.val().trim();
  searchBox.val('');
  searchFunction(searchTerm, false);
  loadRecentSearches();
}

// Similar logic as the main submit button
// Called when a recent search is clicked
function recentSearchButtonHandler(event) {
  // console log for testing purposes
  // Call with the string
  let searchButton = $(event.target);
  let searchTerm = searchButton.text();
  searchButton.val('');
  searchFunction(searchTerm, true);
  loadRecentSearches();
}

// The handler used to prepare for showing a modal
function showModalHandler(event) {
  showModal($(this).data("target"));
}

function showModal(target) {
  $("html").addClass("is-clipped");
  $(target).addClass("is-active");
}

init();