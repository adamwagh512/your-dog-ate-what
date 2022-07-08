// Once the submit button is clicked, take the input from textbox and save it to local storage

function indexPageInit() {
    $("#submitBtn").on('click', submitEatenHandler);
}

function debugInit() {
    $("#no-hazard-button").on('click', showNoHazardHandler);
    $("#maybe-hazard-button").on('click', showMaybeHazardHandler);

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

function showNoHazardHandler(event) {
    console.log("showNoHazardHandler");
    let modalDiv = $(this).data("target");
    $("html").addClass("is-clipped");
    $(modalDiv).addClass("is-active");
}

function showMaybeHazardHandler(event) {
    console.log("showMaybeHazardHandler");
    let modalDiv = $(this).data("target");
    console.log(modalDiv);
    $("html").addClass("is-clipped");
    $(modalDiv).addClass("is-active");
}

debugInit()
indexPageInit()
