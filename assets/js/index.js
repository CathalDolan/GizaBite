

// Above completed when Return Key used within the input - Not Working! Also needed in "Search"
var input = document.getElementById("global_search_input");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   console.log("It worked");
   globalSearchTermFn();
  }
});