// Global Search Term Function
// User types search term, clicks search button, brings them to Search page with search complete for that term
function globalSearchTermFn() {
    let globalSearchTerm = document.getElementById('global_search_input').value;
    global_search_button.outerHTML = `
        <a href="search.html?globalSearchTerm=${globalSearchTerm}" target="_self" id="global_search_button" class="button-image mybutton floatR" onclick="globalSearchTermFn()"></a>  
    `;
}

// Search With Return Key: Supposed to call Global Search Term Fn but doesn't
// Is the input value being removed when key is pressed?
global_search_input.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        globalSearchTermFn();
    }
})