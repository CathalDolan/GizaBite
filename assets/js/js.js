// Search Globals
let app_id = "1234dec7",
    app_key = "634dea9e2c3835579ba9232e741217fc",
    edamamURL = "https://api.edamam.com/api/food-database/v2/parser";

// Global Search Term Function
// User types search term, clicks search button, brings them to Search page with search complete for that term
function globalSearchTermFn() {
    let globalSearchTerm = document.getElementById('global_search_input').value;
    global_search_button.outerHTML = `
        <a href="search.html?globalSearchTerm=${globalSearchTerm}" target="_self" id="global_search_button" class="button-image mybutton floatR" onclick="globalSearchTermFn()"></a>  
    `;
    document.getElementById("waiting_spinner").style.display = "block";
}

var input = document.getElementById("global_search_input");
input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("global_search_button").click();
  }
});

// Tooltip Funcion
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Back Button function. Take from w3schools.
function goBack() {
  window.history.back();
}

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

