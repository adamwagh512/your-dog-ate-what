import { determineInputToxicity } from './food_api.js'

//Creates an empty JavaScript Array
var recentSearches = [];

//This function loads recent searches from local storage when page is loaded
function loadRecentSearches() {
  // parses the stringified data back into an array
  var storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
  // Console log for testing purposes
  console.log(storedSearches);
  // For each item in the array,
  for (var i = 0; i < storedSearches.length; i++) {
    // A new button is revealed
    var button = $(`#rs${i + 1}`);
    button.show();
    // The button displays the search term
    button.text(storedSearches[i]);
    //on click calls a function defined below, figured we would need it later
    button.on("click", onclickhandler);
  }
}

//this function is called every time the submit button is clicked.
function searchFunction(userInput) {
  // Check if empty

  console.log(userInput);
  determineInputToxicity(userInput)
  .then((toxicity) => {

    // pushes eaten value into an empty array
    recentSearches.unshift($("#eaten").val());

    // If there are more than 4 recent searches, the oldest one is removed from the array
    if (recentSearches.length > 4) {
      recentSearches.pop();
    }
    //Converts recentSearches array into something that can be stored in local storage.
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

    switch(toxicity) {
      case 1:
        // Mild
        showModal('#no-hazard-modal');
        break;
      case 2:
      case 3:
        // Moderate
        showModal('#maybe-hazard-modal');
        break;
      case 4:
      case 5:
        // Severed
        showModal('#definite-hazard-modal');
        break;
      default:
        // Unknown
        showModal('#who-knows-modal');
        break;
    }
  });
}

//This function was made to try to make it easier to wire everything up later
function onclickhandler(event) {
  // console log for testing purposes
  console.log(event.target);
}
// Once the submit button is clicked, take the input from textbox and save it to local storage

function indexPageInit() {
    $("#submitBtn").on('click', submitEatenHandler);
    $('#about-us-button').on('click', showModalHandler);
    $('#poison-index-button').on('click', showModalHandler);
    $('#faqs-button').on('click', showModalHandler);
}

function debugInit() {
    $("#no-hazard-debug-button").on('click', showModalHandler);
    $("#maybe-hazard-debug-button").on('click', showModalHandler);
    $("#faqs-debug-button").on('click', showModalHandler);
    $("#poison-index-debug-button").on('click', showModalHandler);
    $("#about-us-debug-button").on('click', showModalHandler);
    $("#definite-hazard-debug-button").on('click', showModalHandler);
    $("#unknown-hazard-debug-button").on('click', showModalHandler);

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

// function indexPageInit() {
//     $("#submitBtn").on('click', submitEatenHandler);
// }



    // $(".my-modal-close").click(function() {
    //     $("html").removeClass("is-clipped");
    //     $(this).parents('.modal').removeClass("is-active");
    //  });




// $(".modal-button").click(function() {
//     var target = $(this).data("target");
//     $("html").addClass("is-clipped");
//     $(target).addClass("is-active");
//  });
 
//  $(".my-modal-close").click(function() {
//     $("html").removeClass("is-clipped");
//     $(this).parents('.modal').removeClass("is-active");
//  });

debugInit()
indexPageInit()

// Sets buttons display to a default of hide
$("#buttonsContainer").children().hide();

// Once the submit button is clicked, take the input from textbox and save it to local storage. The functions on the end will help populate the recent searches bar and clear the text from the search bar.
$("#submitBtn").on("click", function () {
  var typed = $("#eaten").val();
  localStorage.setItem("searchValue", typed);
  // Console log for testing purposes
  console.log(typed);
  // calls searchFunction from above
  searchFunction(typed);
  //clears the text from the search bar
  $("#eaten").val("");
  // refreshes load receent searches function
  loadRecentSearches();
});
//loads recent searches from local storage when page is loaded
loadRecentSearches();

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(51.508742, -0.120850),
    zoom: 5,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}