//Creates an empty JavaScript Array
var recentSearches = [];
var buttonsContainer = $("#buttonsContainer");

//this function is called every time the submit button is clicked.
function searchFunction(data) {
  // pushes eaten value into an empty array
  recentSearches.unshift($("#eaten").val());

  // If there are more than 4 recent searches, the oldest one is removed from the array
  if (recentSearches.length > 4) {
    recentSearches.pop();
  }
  // For every item in the recent searches array
  for (i = 0; i < recentSearches.length; i++) {
    // A new button is created
    var button = $(`#rs${i + 1}`);
    button.show();
    // The button displays the search term
    button.text(recentSearches[i]);
    button.on("click", onclickhandler);
  }
}
function onclickhandler(event) {
  console.log(event.target);
}

buttonsContainer.children().hide();
// Once the submit button is clicked, take the input from textbox and save it to local storage. The function on the end will help populate the recent searches bar.
$("#submitBtn").on("click", function () {
  var typed = $("#eaten").val();
  localStorage.setItem("getValue", typed);
  console.log(typed);
  searchFunction();
});
