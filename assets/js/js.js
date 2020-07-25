// Search Globals
let app_id = "1234dec7",
    app_key = "634dea9e2c3835579ba9232e741217fc",
    edamamURL = "https://api.edamam.com/api/food-database/v2/parser";

/* // Trigger search using Return key. Also tried  onsearch="searchAPI()" in the html - Neither functioning properly
var input = document.getElementById("search_widget_input");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      console.log("Yellow");
   event.preventDefault();
   document.getElementById("search_button").click();
  }
}); */


// Tooltip Funcion
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Change Brick Colours. Not correct
$(".brick").on("click", function () {
  $(this).css("background", "orange");
})
$(".brick>p").on("click", function () {
  $(this).css("color", "white");
})

// Back Button function. Take from w3schools.
function goBack() {
  window.history.back();
}

// Funtion to allow the "Advance" section in Search expand and collape upwards - Not working due to Ingredients Page: Make field appear when checkbox is ticked
$("#search_advanced_button").click(function () {
  console.log("clicked");
  $('.content1').slideToggle().toggleClass('active');
  if ($('.content1').hasClass('active')) {
    $('.header').text('Close Advanced');
  } else {
    $('.header').text('Advanced');
  }
});

/* Funtion to allow the text wrap within a textarea input. From SpyYk3 http://jsfiddle.net/SpYk3/m8Qk9/ */
$(function () {
  //  changes mouse cursor when highlighting lower right of box
  $(document).on('mousemove', 'textarea', function (e) {
      var a = $(this).offset().top + $(this).outerHeight() - 16, //	top border of bottom-right-corner-box area
        b = $(this).offset().left + $(this).outerWidth() - 16; //	left border of bottom-right-corner-box area
      $(this).css({
        cursor: e.pageY > a && e.pageX > b ? 'nw-resize' : ''
      });
    })
    //  the following simple make the textbox "Auto-Expand" as it is typed in
    .on('keyup', 'textarea', function (e) {
      //  the following will help the text expand as typing takes place
      while ($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
        $(this).height($(this).height() + 1);
      };
    });
});