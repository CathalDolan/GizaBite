// Search Globals
let app_id = "1234dec7",
    app_key = "634dea9e2c3835579ba9232e741217fc",
    edamamURL = "https://api.edamam.com/api/food-database/v2/parser";

async function searchAPI() {
    let searchTerm = document.getElementById('search_widget_input').value;
    await searchIngredients(searchTerm);
    await searchPortions(searchTerm);
}

// Search: Ingredients
async function searchIngredients(searchTerm) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${searchTerm}&app_id=${app_id}&app_key=${app_key}&category=generic-foods&category=packaged-foods`;
    
    // Clears the results list for every new search
    var product_name = '',
        list = document.getElementById("ingredient_results");
        list.innerHTML = ""; //What's this?

    let response = await fetch(url),
        recipes = await response.json();
    
    recipes.hints.filter((item) => {

    // API returns a variety of cases. This and toLowerCase above are used to capitalise 1st letter of each word
    let capitalized_product_name = (product_name) => {
        let arr = product_name.split(' ');
        arr.forEach(function (i, index) {
            if (i[0] !== undefined) {
                arr[index] = i.replace(i[0], i[0].toUpperCase());
            }
        });
        return arr.join(' ');
    };

    if (item.food.category === "Packaged foods") {
        product_name = ('"' + capitalized_product_name(item.food.brand).toLowerCase() + '"' + ' - ' + capitalized_product_name(item.food.label).toLowerCase()); //Search Page:  To list out and concatenate the product brands and names, and convert to lower case
    } else if (item.food.category === "Generic foods") {
        product_name = capitalized_product_name(item.food.label).toLowerCase();
    } else {
        return;
    }

    // Publishes the results to the Ingredients section
    list.innerHTML += `
    <div class="results_row section_in results_list">
        <h4 class="alignL results_row_name">${capitalized_product_name(product_name)}</h4>
        <div class="row_icon_container plus_icon pointer alignR">
        </div>
    </div>`;
    
    var ingredientList ='';
        foodIngredients = document.getElementById('ingredient_results_ingredients');
        foodIngredients.innerHTML = "";

    if (item.food.category === "Packaged foods") {
        //ingredientList = item.food.foodContentsLabel; 
    } else {
        return;
    }

    //Extracts and then injects the contents food labels (ingredients) into the DOM, creating an unordered html list
    if ('undefined' !== typeof item.food.foodContentsLabel) { // Excludes "undefined" items, ie items that don't have ingredients
        let foodContentsLabels = item.food.foodContentsLabel; // Food's ingredients listed in a string
        let foodContentsLabelsArray = foodContentsLabels.split(";"); // Food's ingredients list string converted to an array
        if (foodContentsLabelsArray.length > 1) { // Excludes products where there was only one ingredient. Not quite correct, should only eliminate single words maybe.
            //console.log(foodContentsLabelsArray); // OK

            foodContentsLabelsArray.forEach(function (foodContentsLabelsArrayLooped) {
                console.log(foodContentsLabelsArrayLooped);
                ingredientList += '<li> - ' + foodContentsLabelsArrayLooped + '</li>';
                })
                ingredientList = '<ul>' + ingredientList + '</ul>'; // Adds <ul> to the existing <li> html 
            }
    foodIngredients.innerHTML += `<div class="results_row section_in"><ul>${ingredientList}</ul></div>`;
            }
        

    }); // All searches need to be inside these

    // Search Page: To calculate the number of results. How to integrate with above?
    let resultNames = [];
    recipes.hints.filter((item) => {
        if(item.food.category === "Generic foods" || item.food.category === "Packaged foods"){
            resultNames.unshift(item.food.label); // Adds each result to the resultsNames array on each loop
        }  
    });
    console.log(resultNames.length);
    document.getElementById('ingredients_results_count').innerHTML = resultNames.length; //Returning an error. Also tried.text and .value


  // // Return serving size (for "Portion g" fields) - Not Functioning
  // recipes.hints.filter((item) => {
  //   if (item.measures.label === "Serving") {
  //     console.log(item.measures.label);
  //   }
  // })
  // // Return per piece size (for "Weight per Piece" fields) - Not Functioning
  // recipes.hints.filter((item) => {
  //   if (item.measures.label === "Piece") {
  //     console.log(item.measures.label);
  //   }
  // })
};

// Search: Portions
async function searchPortions(searchTerm) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${searchTerm}&app_id=${app_id}&app_key=${app_key}&category=generic-meals&categoryLabel=meal`;
    console.log(url);
    // Clears the results list for every new search
    let list = document.getElementById("portion_results");
    list.innerHTML = "";
    
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

    list.innerHTML += `
        <div class="results_row section_in">
            <div class="row_icon_container eye_icon pointer alignL" data-toggle="tooltip" data-placement="top" data-html="true" title="whats here">
            </div>
            <h4 class="alignL results_row_name pointer">${capitalized_product_name(product_name)}</h4>
            <div class="row_icon_container plus_icon pointer alignR">
            </div>
        </div>`;
  })
};

// Ingredients Page: Make field appear when checkbox is ticked
var checkbox = document.querySelector("input[name=checkbox]"); // https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
checkbox.addEventListener('change', function () {
    if (this.checked) {
        document.getElementById("measure_weight_per_piece").style.display = "block";
        document.getElementById("pieces_per_serving_container").style.display = "block";
    } else {
        document.getElementById("measure_weight_per_piece").style.display = "none";
        document.getElementById("pieces_per_serving_container").style.display = "none";
    }
});

// Ingredients Page: "Servings g" Field Calculation
calculate = function () {
    var weight_per_piece = document.getElementById('measure_weight_per_piece_input').value;
    console.log(weight_per_piece);
    var pieces_per_serving = document.getElementById('pieces_per_serving_input').value;
    console.log(pieces_per_serving);
    console.log(pieces_per_serving * weight_per_piece);
    document.getElementById('weight_per_serving_input').value = parseInt(weight_per_piece) * parseInt(pieces_per_serving);
}

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