var foodId = document.location.search.replace(/^.*?\=/,'');



/*
// Add href to add icon to bring user to Dish page - Not updated
var addIngredient = document.getElementById("add_ingredient_icon");
console.log(addIngredient);
addIngredient.outerHTML = `
    <a href="new_portion.html?foodId=${foodId} target="_self">
        <div id="add_ingredient_icon" class="row_icon_container plus_icon pointer alignR floatR">
        </div>
    </a>    
`; */


if(foodId !== "") {
    document.getElementById("ingredients_name_row").style.display = "block";
    document.getElementById("ingredients_data_row").style.display = "block";
}

console.log(foodId);

async function searchAPI() {
    searchIngredients(foodId);
    //await searchPortions(searchTerm);
}
searchAPI();

// Search: Ingredients
async function searchIngredients(foodId) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${foodId}&app_id=${app_id}&app_key=${app_key}&category=generic-foods&category=packaged-foods`;
    //console.log(url);

    var product_name = '',
        ingredientNameId = document.getElementById("ingredient_product_name");

    response = await fetch(url),
        console.log(response);
    recipes = await response.json();
        console.log(recipes);

    recipes.hints.filter((item) => {

        // API returns a variety of cases. This capitalises 1st letter of each word
        let capitalized_product_name = (product_name) => {
        let arr = product_name.toLowerCase().split(' ');
        arr.forEach(function (i, index) {
            if (i[0] !== undefined) {
            arr[index] = i.replace(i[0], i[0].toUpperCase());
            }
        });
        return arr.join(' ');
        };

        if (item.food.category === "Packaged foods") {
        product_name = ('"' + capitalized_product_name(item.food.brand) + '"' + ' - ' + capitalized_product_name(item.food.label)); //Search Page:  To list out and concatenate the product brands and names, and convert to lower case
        } else if (item.food.category === "Generic foods") {
        product_name = capitalized_product_name(item.food.label);
        } else {
        return;
        }

        // Displays product name on the Portion Page
        ingredientNameId.innerHTML = `
            <a href="ingredient.html?foodId=${foodId}" target="_self">
            <h4 id="ingredient_product_name" class="alignL results_row_name pointer">${product_name}</h4>
            </a>
        `;

    });
}; //Search is all contained in here

// Servings Checkbox on Ingredients Page: Checks if it's ticked and if "true" Batch Qty displays.
var checkBoxStatus = localStorage.getItem('ingredientCheckBox' + foodId);
console.log(checkBoxStatus);
if (checkBoxStatus == "true"){
    document.getElementById("ingredient_batch_qty_div").style.display = "block";
    document.getElementById("ingredient_batch_weight_div").innerHTML = `
    <p id="ingredient_batch_weight_input"/>${batchWeight}
    </p>
    `;
    document.getElementById("ingredient_serving_weight_div").innerHTML = `
    <p id="ingredient_serving_weight_input"/>${weightPerServing}
    </p>
    `;
} else {
    document.getElementById("ingredient_batch_qty_div").style.display = "none";
} 

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

//--- Number of Servings: Extracts the default value
var numberOfServingsLs = localStorage.getItem("numberOfServings" + foodId, numberOfServings);
console.log(numberOfServingsLs);

var numberOfServingsFn = function (){
    if (numberOfServingsLs === null){ // Checks for no value in Local Storage, then
        numberOfServings = document.getElementById("number_of_servings_input").value;
        document.getElementById("number_of_servings_input").value = numberOfServings;
    } else {
        document.getElementById("number_of_servings_input").value = numberOfServingsLs;
        numberOfServings = numberOfServingsLs;
    }
}
numberOfServingsFn();

var numberOfServings;

var numberOfServingsManFn = function () {
    numberOfServings = document.getElementById("number_of_servings_input").value;
    localStorage.setItem("numberOfServings" + foodId, numberOfServings);
    console.log(localStorage.getItem("numberOfServings" + foodId, numberOfServings));
}


//--- Weight Per Serving: Get value from local storage and input into html
let weightPerServing = localStorage.getItem('weightPerServing' + foodId); // Extracts the Key value
console.log("weightPerServing", weightPerServing);
document.getElementById("ingredient_serving_weight_input").value = weightPerServing; // Inputs the value into the html input
// Called when User types into the input field
var weightPerServingManFn = function () {
    weightPerServing = document.getElementById('ingredient_serving_weight_input').value;
    localStorage.setItem("weightPerServing" + foodId, weightPerServing);
}

var weightPerServingCalcFn = function () {
    console.log("function fires");
    batchWeight = document.getElementById('ingredient_batch_weight_input').value;
    localStorage.setItem("batchWeight" + foodId, batchWeight);
    console.log("Typed batchWeight", batchWeight);
    newWeightPerServing = batchWeight / numberOfServings;
    document.getElementById("ingredient_serving_weight_input").value = newWeightPerServing;
    localStorage.setItem("weightPerServing" + foodId, newWeightPerServing);
    console.log(newWeightPerServing);
}

//Extracts number of calories from local storage and calculates total before adding to storage and html
var kcalPer100g = localStorage.getItem("kcalPer100g" + foodId);
var kcalPerServing = (weightPerServing/100) * kcalPer100g;
console.log(kcalPerServing);
//document.getElementById("ingredient_kcal_value").innerHTML = kcal;


//--- Weight Per Piece: Extract value from local storage for use in calculations
let weightPerPiece = localStorage.getItem('weightPerPiece' + foodId);
console.log("weightPerPiece", weightPerPiece);

//--- Pieces Per Serving: Extract value from local storage for use in calculations
let piecesPerServing = localStorage.getItem('piecesPerServing' + foodId);
console.log("piecesPerServing", piecesPerServing);

//--- Batch Quantity: 
var batchQuantity;
var batchQuantityFn = function () {
    batchQuantity = numberOfServings * piecesPerServing;
    console.log("batchQuantity", batchQuantity);
    document.getElementById("ingredient_batch_quantity_input").value = batchQuantity;
}
batchQuantityFn();

//--- Batch Weight:
var batchWeight;
var batchWeightFn = function () {
    batchWeight = numberOfServings * weightPerServing;
    console.log("batchWeight", batchWeight);
    document.getElementById("ingredient_batch_weight_input").value = batchWeight;
    localStorage.setItem("batchWeight" + foodId, batchWeight);
}
batchWeightFn();
