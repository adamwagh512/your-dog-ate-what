$(".modal-button").click(function() {
   var target = $(this).data("target");
   $("html").addClass("is-clipped");
   $(target).addClass("is-active");
});

$(".my-modal-close").click(function() {
   $("html").removeClass("is-clipped");
   $(this).parents('.modal').removeClass("is-active");
});