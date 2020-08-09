// Search Globals
let app_id = "1234dec7";
let app_key = "634dea9e2c3835579ba9232e741217fc";
let edamamURL = "https://api.edamam.com/api/food-database/v2/parser";

// Global Search Term Function
// User types search term, clicks search button, brings them
// to Search page with search complete for that term
function globalSearchTermFn() {
    let globalSearchTerm = document.getElementById("global_search_input").value;
    global_search_button.outerHTML = `
        <a href="search.html?globalSearchTerm=${globalSearchTerm}" 
        target="_self" id="global_search_button" class="button-image 
        mybutton floatR" onclick="globalSearchTermFn()"></a>
    `;
}

// Return Key to Activate Search
let input = document.getElementById("global_search_input");
if(input !== null) { // Checks the page to see if function is applicable to it.
    input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        document.getElementById("global_search_button").click();
    }
    });
}

// Tooltip Funcion
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// Back Button function. Take from w3schools.
function goBack() {
    window.history.back();
}