// Portion Name: Checks if there is an existing portion and adds name if so.
let portionNameLs = localStorage.getItem("portionName");
if(portionNameLs !== null){
    document.getElementById("portion_name_textarea").value = portionNameLs;
} else {
    alert("Don't forget to add a Portion Name");
}

// Portion Name: Collects the name as the User enters it and commits it to Local Storage
var portionName;
var portionNameFn = function () {
    portionName = document.getElementById("portion_name_textarea").value;
    localStorage.setItem("portionName", portionName);
}

// POPULATE PAGE: Functions and methods to extract data from LS and use it to populate the page

//Extracts all of the data from Local Storage as a string
let xyz = JSON.stringify(localStorage);
// Converts that string to an object
let obj = JSON.parse(xyz);

// Arrays collect the individual variables so that they can be totalled
let totalCaloriesArray = [];
let totalServingWeightArray = [];

// Loop through the object: Purpose is find ingredients added to the dish
for (const [key, value] of Object.entries(obj)) {

    // Filter to leave onlyaddedToDish ingredients
    if (`${value}` == ("addedToDish")){

        //Extract variables from local storage
        let foodId = `${key}`;
        let caloriesPerServing = parseInt(localStorage.getItem("caloriesPerServing " + foodId));
        let weightPerServing = parseInt(localStorage.getItem("weightPerServing " + foodId));
        let productName = localStorage.getItem("productName " + foodId);
        
        // Populate the individual ingredient rows in Dishes
        document.getElementById("ingredient_name_port").innerHTML += `
            <div id="ingredient_name_port_${foodId}" class="section_in">
                <div>
                    <div class="row_icon_container delete_icon pointer alignL floatL" name="${foodId}" onclick="deleteIngredientFn(this)">
                    </div>
                    <div class="measurement_row_label2 floatL">
                        <h4 id="ingredient_name_h4" class="alignL results_row_name floatL"><a href="ingredient.html?foodId=${foodId}">${productName}</a></h4>
                    </div>
                    <div id="ingredient_batch_qty_div" class="measurement_container_port measurement_row_label2  floatL">
                        <div class="floatL">
                            <p>Weight per Serving:</p>
                        </div>
                        <div class="floatL">
                            <p id="ingredient_batch_quantity_input"><span>${weightPerServing}</span> g</p>
                        </div>
                    </div>
                    <div id="ingredient_batch_weight" class="measurement_container_port measurement_row_label2 floatL">
                        <div class="floatL">
                            <p>Calories per Serving:</p>
                        </div>
                        <div class="floatL">
                            <p id="ingredient_batch_weight_input"><span>${caloriesPerServing}</span> Kcal</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Adds the calorie value for each ingredient to the array
        totalCaloriesArray.push(caloriesPerServing);
        // Gets the sum of the numbers
        var totalCalories = totalCaloriesArray.reduce(function(a, b){
            return a + b;
        }, 0);
        document.getElementById("total_serving_kcal").innerHTML = totalCalories;

        //Adds the weight per serving value for each ingredient to the array
        totalServingWeightArray.push(weightPerServing);
        // Gets the sum of the numbers
        var totalServingWeight = totalServingWeightArray.reduce(function(a, b){
            return a + b;
        }, 0);
        document.getElementById("total_serving_weight").innerHTML = totalServingWeight;
    }
}

// Start Again Button:
// This empties Local Storage and refreshes the page so that it's blank
document.getElementById("start_again_button").addEventListener("click", startAgainFn);
function startAgainFn() {
    window.localStorage.clear();
    location.reload();
}

// Remove a Row:
// Clicking the delete icon to remove the ingredient row and data from LS
// and update the total serving weight and calories value.
function deleteIngredientFn(element){
    let foodId = $(element).attr('name');

    // Remove the calorie value for the ingredient in the array and recalculate
    totalCaloriesArray.pop("caloriesPerServing " + foodId);
    var totalCalories = totalCaloriesArray.reduce(function(a, b){
        return a + b;
    }, 0);
    document.getElementById("total_serving_kcal").innerHTML = totalCalories;

    // Remove the per serving weight for the ingredient in the array and recalculate
    totalServingWeightArray.pop("weightPerServing " + foodId);
    var totalServingWeight = totalServingWeightArray.reduce(function(a, b){
        return a + b;
    }, 0);
    document.getElementById("total_serving_weight").innerHTML = totalServingWeight;

    localStorage.removeItem("foodId " + foodId);
    localStorage.removeItem("productName " + foodId);
    localStorage.removeItem("caloriesPer100g " + foodId);
    localStorage.removeItem("weightPerPiece " + foodId);
    localStorage.removeItem("weightPerServing " + foodId);
    localStorage.removeItem("weightPerWhole " + foodId);
    localStorage.removeItem("piecesPerServing " + foodId);
    localStorage.removeItem("batchWeight " + foodId);
    localStorage.removeItem("quantityPerBatch " + foodId);
    localStorage.removeItem("caloriesPerServing " + foodId);
    localStorage.removeItem("cookingMethodBrick " + foodId);
    localStorage.removeItem("cookingStatus " + foodId);
    localStorage.removeItem("cookingSubstrateBrick " + foodId);
    localStorage.removeItem(foodId);

    let ingredientRow = document.getElementById("ingredient_name_port_" + foodId);
    ingredientRow.remove();
}

