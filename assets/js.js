$(document).ready(function(){
    console.log("Hello World!");
});

// Required to allow sections collapse and expand. Taken from w3schools
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
    /* $collapse1.text(function () { // Advanced text to change depending on state. From http://jsfiddle.net/eK8X5/8290/
            return $content.is(":visible") ? "Close Advanced" : "Advanced";
        }); */
  });
}

$(function(){
    $('[data-toggle="tooltip"]').tooltip();
});


/* A function is required for the ingredients page to change the position of html elements so that they are responsive on smaller devices */

function goBack() { /* Back Button function. Take from w3schools.*/
  window.history.back();
}


$(".header").click(function() {
  $('.content1').slideToggle().toggleClass('active');
  if ($('.content1').hasClass('active')) {
    $('.header').text('Close Advanced');
  } else {
    $('.header').text('Advanced');
  }
});
