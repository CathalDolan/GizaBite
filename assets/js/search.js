// Function called from Search button click in html
async function searchAPI() {
  let searchTerm = document.getElementById('search_widget_input').value;
  console.log(searchTerm);
  await searchIngredients(searchTerm);
  await searchPortions(searchTerm);
}


// Search: Ingredients
async function searchIngredients(searchTerm) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${searchTerm}&app_id=${app_id}&app_key=${app_key}&category=generic-foods`;
    console.log(url);

    // Clears the results list for every new search
    var product_name = '',
        list = document.getElementById("ingredient_results");
        list.innerHTML = ""; //What's this?
  
    let countIngr = 0;
    let foodId;
    let kcal_per_100g;

    response = await fetch(url),
    recipes = await response.json();
  
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
                <div id="add_ingredient_to_portion_icon" class="row_icon_container plus_icon pointer alignR"></div>
            </a> 
        </div>`; 
    });

    // Extract API measurements and data


    // Not needed, but see comments.
    var commitDefaultMeasurementsToLS = function () {
        localStorage.setItem(`${product_name}ID`, `${foodId}`); // How is this data being retrieved?
        //localStorage.setItem(`${product_name}ID`, `${kcal_per_100g}`); this is same as foodID yet doesn't behave the same. Stops foodId working. 
    }
    document.getElementById("add_ingredient_to_portion_icon").addEventListener("click", commitDefaultMeasurementsToLS);


    var ingredientsResultsCount = document.getElementById('ingredients_results_count').innerHTML = countIngr + " Results";

};



// Search: Portions
async function searchPortions(searchTerm) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${searchTerm}&app_id=${app_id}&app_key=${app_key}&category=generic-meals&categoryLabel=meal`;
    console.log(url);
    // Clears the results list for every new search
    let list = document.getElementById("portion_results");
        list.innerHTML = "";

    let countPort = 0;

    let response = await fetch(url),
        recipes = await response.json();

    var capitalized_product_name = (product_name) => {
        let arr = product_name.split(' ');
        arr.forEach(function (i, index) {
            arr[index] = i.replace(i[0], i[0].toUpperCase());
        });
        return arr.join(' ');
    };

    recipes.hints.filter((item) => {
        if (item.food.category === "Generic meals") {
            var product_name = (item.food.label).toLowerCase();
        } else {
            return;
        }

    // Increment Portion counter by 1
    countPort += 1;

    list.innerHTML += `
        <div class="results_row section_in">
            <div class="row_icon_container eye_icon pointer alignL" data-toggle="tooltip" data-placement="top" data-html="true" title="whats here">
            </div>
            <h4 class="alignL results_row_name pointer">${capitalized_product_name(product_name)}</h4>
            <div class="row_icon_container plus_icon pointer alignR">
            </div>
        </div>`;
  })

  var portionsResultsCount = document.getElementById('portions_results_count').innerHTML = countPort + " Results"; //Returning an error. Also tried.text and .value
  console.log(portionsResultsCount);

};

myHtmlFn () {
    
}


// Don't think this is employed anywhere, delete?
var globalSearchTerm = document.location.search.replace(/^.*?\=/,'');
if (globalSearchTerm === "") {
    console.log("empty")
    } else {
        document.getElementById("search_widget_input").value = globalSearchTerm;
        searchIngredients(globalSearchTerm);
        searchPortions(globalSearchTerm);
    }