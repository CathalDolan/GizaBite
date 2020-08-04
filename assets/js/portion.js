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

//Extracts all of the data from Local Storage as a string
let xyz = JSON.stringify(localStorage);
// Converts that string to an object
let obj = JSON.parse(xyz);

let totalCaloriesArray = [];
let totalServingWeightArray = [];

// Loop through the object: Purpose is find ingredients added to the dish
for (const [key, value] of Object.entries(obj)) {
    //console.log(`${key}: ${value}`);
    // Filter to leave addedToDish ingredients
    if (`${value}` == ("addedToDish")){
        let foodId = `${key}`;
        let numberOfServings = parseInt(localStorage.getItem("numberOfServings " + foodId));
        let caloriesPerServing = parseInt(localStorage.getItem("caloriesPerServing " + foodId));
        let weightPerServing = parseInt(localStorage.getItem("weightPerServing " + foodId));
        let batchWeight = parseInt(localStorage.getItem("batchWeightg " + foodId));
        let productName = localStorage.getItem("productName " + foodId);
        
        console.log("caloriesPerServing", caloriesPerServing);
        console.log("weightPerServing", weightPerServing);
        console.log("productName", productName);

        document.getElementById("ingredient_name_port").outerHTML += `
            <div id="ingredient_name_port" class="results_row section_in">
                <div class="row_icon_container delete_icon pointer alignL floatL">
                </div>
                <div class="measurement_row_label2 floatL">
                    <h4 id="ingredient_name_h4" class="alignL results_row_name floatL">${productName}</h4>
                </div>
                <div id="ingredient_batch_qty_div" class="measurement_container_port measurement_row_label2  floatL">
                    <div class="floatL">
                        <p>Weight per Serving:</p>
                    </div>
                    <div class="floatL">
                        <p id="ingredient_batch_quantity_input"><span>${weightPerServing}</span> g</p>
                    </div>
                </div>
                <div id="ingredient_batch_weight" class="measurement_container_port measurement_row_container_second measurement_row_label2 floatL">
                    <div class="floatL">
                        <p>Calories per Serving:</p>
                    </div>
                    <div class="floatL">
                        <p id="ingredient_batch_weight_input"><span>${caloriesPerServing}</span> Kcal</p>
                    </div>
                </div>
            </div>
        `;

        //Adds the calorie value for each ingredient to the array
        totalCaloriesArray.push(caloriesPerServing);
        // Gets the sum of the numbers
        var totalCalories = totalCaloriesArray.reduce(function(a, b){
            return a + b;
        }, 0);
        document.getElementById("total_serving_weight").innerHTML = totalCalories;

        //Adds the weight per serving value for each ingredient to the array
        totalServingWeightArray.push(weightPerServing);
        // Gets the sum of the numbers
        var totalServingWeight = totalServingWeightArray.reduce(function(a, b){
            return a + b;
        }, 0);
        document.getElementById("total_serving_kcal").innerHTML = totalServingWeight;
    }
}