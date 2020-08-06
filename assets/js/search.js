// Function called from Search button click in html
async function searchAPI() {
  let searchTerm = document.getElementById('search_widget_input').value;
  console.log(searchTerm);
  await searchIngredients(searchTerm);
}

// Search: Ingredients
async function searchIngredients(searchTerm) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${searchTerm}&app_id=${app_id}&app_key=${app_key}&category=generic-foods`;
    console.log(url);

    // Spinner displays once Search Button is clicked
    document.getElementById("waiting_spinner").style.display = "block";

    // Clears the results list for every new search
    var product_name = '',
        list = document.getElementById("ingredient_results");
        list.innerHTML = ""; //What's this?
  
    let countIngr = 0;
    let foodId;
    let kcal_per_100g;

    response = await fetch(url),
    recipes = await response.json();

    // Detects if User searches without adding a word to the search input 
    if (searchTerm.length == 0) { 
        list.innerHTML = `
        <div class="results_row section_in results_list">
            <h4 class="alignL results_row_name">No results. Please try again.</h4> 
        </div>
        `;
        hideSpinnerFn();
    }
  
    recipes.hints.filter((item) => {

        // API returns a variety of cases. This and toLowerCase above are used to capitalise 1st letter of each word
        let capitalized_product_name = (product_name) => {
            let arr = product_name.toLowerCase().split(' ');
            arr.forEach(function (i, index) {
                if (i[0] !== undefined) {
                arr[index] = i.replace(i[0], i[0].toUpperCase());
                }
            });
            return arr.join(' ');
        }; 

        if (item.food.category === "Generic foods") {
        product_name = capitalized_product_name(item.food.label);
        } else {
        return;
        }

        // Increment Ingredient counter by 1
        countIngr += 1;

        // Extract Food Id from API
        foodId = item.food.foodId;
    
    // Results List: Information to be displayed on front end
        list.innerHTML += `
        <div class="results_row section_in results_list">
            <h4 class="alignL results_row_name"><a href="/ingredient.html?foodId=${foodId}">${product_name}</a></h4>
            <a id="add_ingredient_to_portion_anchor" href="ingredient.html?foodId=${foodId}" target="_self">    
                <div id="add_ingredient_to_portion_icon" class="row_icon_container eye_icon pointer alignR"></div>
            </a> 
        </div>`; 
    });

    var ingredientsResultsCount = document.getElementById('ingredients_results_count').innerHTML = countIngr + " Results";

    // Detects if no results are returned.
    if (countIngr == 0){
        console.log("none");
        list.innerHTML = `
        <div class="results_row section_in results_list">
            <h4 class="alignL results_row_name">No results. Please try again.</h4> 
        </div>`;
    }

    hideSpinnerFn();
};

// Hide Spinner Once Search is Complete
function hideSpinnerFn() {
    document.getElementById("waiting_spinner").style.display = "none";
}

// SAVED CODE
// Extracts a specific element from the URI

var globalSearchTerm = document.location.search.replace(/^.*?\=/,'');
if (globalSearchTerm === "") {
    console.log("empty")
    } else {
        document.getElementById("search_widget_input").value = globalSearchTerm;
        searchIngredients(globalSearchTerm);
    }