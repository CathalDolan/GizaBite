$(document).ready(function(){
    console.log("Hello World!");
});

$(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

$(".brick").on("click", function() {
    $(this).css("background", "orange");
})
$(".brick>p").on("click", function() {
    $(this).css("color", "white");
})


/* A function is required for the ingredients page to change the position of html elements so that they are responsive on smaller devices */

/* Back Button function. Take from w3schools.*/
function goBack() { 
  window.history.back();
}

/* Funtion to allow the "Advance" section in Search expand and collape upwards */
$(".header").click(function() {
  $('.content1').slideToggle().toggleClass('active');
  if ($('.content1').hasClass('active')) {
    $('.header').text('Close Advanced');
  } else {
    $('.header').text('Advanced');
  }
});
