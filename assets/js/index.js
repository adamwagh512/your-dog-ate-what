// Once the submit button is clicked, take the input from textbox and save it to local storage
     $("#submitBtn").on('click',function() {
        var typed = $("#eaten").val();
        localStorage.setItem("getValue",typed);
        console.log(typed)
    })