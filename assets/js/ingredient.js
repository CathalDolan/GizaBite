//Global Variables used throughout the file
var foodId = document.location.search.replace(/^.*?\=/,''); //Food Id: Extracted from url
let weightPerServing;
let weightPerPiece;
let caloriesPer100g;
let caloriesPerServing;
let piecesPerServing;
let batchWeight;
let quantityPerBatch;
let weightPerWhole;
let defaultWeight = 125;
let numberOfServings = 10;

// Triggers the searchIngredients function
function searchAPI() {
    searchIngredients(foodId);
}

// Search: Ingredients
async function searchIngredients(foodId) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${foodId}&app_id=${app_id}&app_key=${app_key}&category=generic-foods`;
    //console.log(url);

    var product_name = '',
        ingredientNameId = document.getElementById("ingredient_product_name"); // Takes the tag with id inside as outer, and everything in it

    response = await fetch(url, {headers: {"Access-Control-Allow-Origin": "*"}});
    recipes = await response.json();

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

        if (item.food.category === "Generic foods") {
        product_name = capitalized_product_name(item.food.label);
        } else {
        return;
        }

        // Displays product name on the Ingredient Page
        ingredientNameId.innerHTML = `${product_name}`;
        document.getElementById("add_to_dish_button_span").innerHTML = `${product_name}`;

        // Extract Measurements from API
        let measure = item.measures;
        let label;
        let weight;

        // Extract calories from API and saved to LS
        caloriesPer100g = item.food.nutrients.ENERC_KCAL;
        localStorage.setItem("caloriesPer100g " + foodId, caloriesPer100g)

        // Number of Servings: This could be done outside of the function, but is
        // included here because surrounding functions are related
        document.getElementById("number_of_servings_input").value = numberOfServings;
        localStorage.setItem("numberOfServings", numberOfServings); //FoodId is not included because it the same value applies to all products

        //  Extract default weights from API
        for(let i=0; i<measure.length; i++){
            label = (measure[i].label);
            weight =(measure[i].weight);
            if (label === "Piece"){
                weightPerPiece = Math.round(weight);
                localStorage.setItem("weightPerPiece " + foodId, weightPerPiece);
                console.log("weightPerPiece", weightPerPiece);
            }
        }
        for(let i=0; i<measure.length; i++){
            label = (measure[i].label);
            weight =(measure[i].weight);
            if (label === "Serving"){
                weightPerServing = Math.round(weight);
                localStorage.setItem("weightPerServing " + foodId, weightPerServing);
                console.log("weightPerServing", weightPerServing);
            }
        }
        for(let i=0; i<measure.length; i++){
            label = (measure[i].label);
            weight =(measure[i].weight);
            if (label === "Whole"){
                weightPerWhole = Math.round(weight);
                localStorage.setItem("weightPerWhole " + foodId, weightPerWhole);
                console.log("weightPerWhole", weightPerWhole);
            }
        }
    });

    await getDataFn();
    await weightPerServingFn();
    await weightPerPieceFn();
    await piecesPerServingFn();
    await batchWeightFn();
    await batchQuantityFn();
    await caloriesFn();

    // Checks if "per piece" checkbox was already checked and updates fields accordingly.
    var checkBoxStatus = localStorage.getItem("checkBoxStatusKey " + foodId);
    if (checkBoxStatus == "true"){
        document.getElementById("measurement_checkbox").outerHTML = `
        <input type="checkbox" id="measurement_checkbox" class="input_percent" 
        name="measurement_checkbox" checked>
        `;
    checkBox(); 
    }

}; // Search is all contained in here

// Extract Measurements from local storage
function getDataFn() {
    weightPerServing = localStorage.getItem("weightPerServing " + foodId);
    weightPerPiece = localStorage.getItem("weightPerPiece " + foodId);
    caloriesPer100g = localStorage.getItem("caloriesPer100g " + foodId);
    caloriesPerServing = localStorage.getItem("caloriesPerServing " + foodId);
    piecesPerServing = localStorage.getItem("piecesPerServing " + foodId);
    batchWeight = localStorage.getItem("batchWeight " + foodId);
    quantityPerBatch = localStorage.getItem("quantityPerBatch " + foodId);
    weightPerWhole = localStorage.getItem("weightPerWhole " + foodId);
}

// Weight per Serving:
function weightPerServingFn() {
    if (weightPerServing !== null) {//If serving weight is defined, use it.
        document.getElementById("weight_per_serving_input").value = weightPerServing;
        weightPerServing = weightPerServing;
    } else if (weightPerPiece !== null) { //If serving weight is not defined, use weight per piece
        document.getElementById("weight_per_serving_input").value = weightPerPiece;
        weightPerServing = weightPerPiece;
    } else if (weightPerWhole !== null) { //If serving weight and weight per piece are not defined, use whole weight
        document.getElementById("weight_per_serving_input").value = weightPerWhole;
        weightPerServing = weightPerWhole;
    } else { //If none are defined, use default weight
        document.getElementById("weight_per_serving_input").value = defaultWeight;
        weightPerServing = defaultWeight;
    }
}


// Weight Per Piece:
function weightPerPieceFn() {
    if (weightPerPiece !== null) {   //If weight per piece is defined, use it.
        document.getElementById("weight_per_piece_input").value = weightPerPiece;
        weightPerPiece = weightPerPiece;
    } else if (weightPerWhole !== null) {   //If weight per piece is not defined, use whole weight.
        document.getElementById("weight_per_piece_input").value = weightPerWhole;
        weightPerPiece = weightPerWhole;
    } else if (weightPerServing !== null) {   //If weight per piece and whole weight are not defined, use serving weight.
        document.getElementById("weight_per_piece_input").value = weightPerServing;
        weightPerPiece = weightPerServing;
    } else {   //If none are defined, use default weight
        document.getElementById("weight_per_piece_input").value = defaultWeight;
        weightPerPiece = defaultWeight;
    }
}

// Pieces Per Serving: Simplifed solution as halves should be included maybe.
function piecesPerServingFn() {
    if (weightPerServing >= weightPerPiece) { // If the serving weight is greater than the weight per piece...
        piecesPerServing = Math.round(weightPerServing / weightPerPiece); // the 1st is divided by the 2nd. //?? Needs to go to 1 decimal place
        console.log("piecesPerServing", piecesPerServing);
        localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);
        document.getElementById("pieces_per_serving_input").value = piecesPerServing;
    } else {
        localStorage.setItem("piecesPerServing " + foodId, 1); // Otherwise the default is 1. 
        document.getElementById("pieces_per_serving_input").value = 1;
    }
}

// Batch Weight:  
function batchWeightFn() {
    batchWeight =  Math.round(numberOfServings * weightPerServing);
    document.getElementById("batch_weight_input").value = batchWeight;
    localStorage.setItem("batchWeight " + foodId, batchWeight);
}

// Batch Quantity: 
function batchQuantityFn() {
    quantityPerBatch =  Math.round(numberOfServings * piecesPerServing);
    document.getElementById("batch_quantity_input").value = quantityPerBatch; 
    localStorage.setItem("quantityPerBatch " + foodId, quantityPerBatch);
}

// Calories: ((Number of calories per 100g / 100) * weight per serving)
function caloriesFn() {
    caloriesPerServing = parseInt((caloriesPer100g / 100) * weightPerServing); //Calculate calories per serving, converting to a whole number...
    document.getElementById("calories_per_serving").textContent = caloriesPerServing; //add it to html and...
    localStorage.setItem("caloriesPerServing " + foodId, caloriesPerServing); //save to LS
}

// Per Piece Checkbox:
document.getElementById("measurement_checkbox").addEventListener("click", checkBox);
function checkBox() {
    var checkBox = document.getElementById("measurement_checkbox");
    if (checkBox.checked === true) {
        document.getElementById("pieces_row").style.display = "block";  //If Checked: Pieces row is displayed
        document.getElementById("ingredient_batch_qty_div").style.display = "block"; //If Checked: Batch row is displayed
        localStorage.setItem("checkBoxStatusKey "  + foodId, true); //If Checked: Checkbox status "true" saved to local storage

        //If checked, the weight per serving is calculated instead of being taken from API
        //New calulation is saved to local storage
        weightPerServing = Math.round(weightPerPiece * piecesPerServing);
        localStorage.setItem("weightPerServing "  + foodId, weightPerServing);

        //If checked, the weight per serving input changes to <p>
        document.getElementById("weight_per_serving_container").innerHTML = `
            <p id="weight_per_serving_input">${weightPerServing}</p>
        `;

        batchWeightP();
        caloriesFn();
    } else if (checkBox.checked === false) {
        document.getElementById("pieces_row").style.display = "none"; //If Unchecked: Pieces row is hidden
        document.getElementById("ingredient_batch_qty_div").style.display = "none"; //If Unhecked: Batch row is hidden
        localStorage.setItem("checkBoxStatusKey "  + foodId, false); //If Unchecked: Checkbox status "false" saved to local storage

        //When unchecked, after being checked, the inputs are reinstated in place of the <p>tags
        //If either weight changed when checked, this becomes the displayed weight

        //Weight per Serving:
        document.getElementById("weight_per_serving_container").innerHTML = `
            <input id="weight_per_serving_input" type="text" 
            inputmode="numeric" pattern="[0-9]*" maxlength="7" class="input_weight_number" 
            name="total_amt" value="${weightPerServing}" onkeyup="weightPerServingManFn()"/>
        `;
        //Batch Weight:  Needs to be moved out to a separate function
        document.getElementById("batch_weight_input").outerHTML = `
            <input id="batch_weight_input" type="text" inputmode="numeric" pattern="[0-9]*" 
            maxlength="7" class="input_weight_number" value="${batchWeight}" onkeyup="weightPerServingCalcFn2()"/>
        `;
       
        caloriesFn(); //?? Don't know if this works
    }
}

//If "Per Piece" Checkbox is checked, batch weight is calculated instead of being taken from API
//It also changes from an input to a <p> tag.
function batchWeightP(){
    batchWeight =  Math.round(numberOfServings * weightPerServing);
    document.getElementById("batch_weight_input").outerHTML = `
        <p id="batch_weight_input">${batchWeight}</p>
    `; 
    localStorage.setItem("batchWeight " + foodId, batchWeight);
    //weightPerServingManFn();
}


// Manual Functions: Calulations carried out when a User manually types into the input
// As the user types, the data inputted is saved to Local Storage and related functions
// called to update any fields affected by the change.

// Number of Servings Manual Function:
function numberOfServingsManFn() {
    numberOfServings = document.getElementById('number_of_servings_input').value;
    localStorage.setItem("numberOfServings", numberOfServings);
    batchWeightFn();
    batchQuantityFn();
    checkBox(); // Updates the Batch Weight if Per Piece checkbox is checked
}

// Weight per Serving Manual Function:
function weightPerServingManFn() {
    weightPerServing = document.getElementById("weight_per_serving_input").value;
    localStorage.setItem("weightPerServing " + foodId, weightPerServing);
    batchWeightFn();
    caloriesFn();
}

// Batch Weight Manual Function
function batchWeightManFn() {
    batchWeight = document.getElementById("batch_weight_input").value;
    localStorage.setItem("batchWeight " + foodId, batchWeight);
    weightPerServingCalcFn();
    caloriesFn();
}

// Weight per Serving Batch Weight Calculation // Not fully working
// When the Batch Weight input is changed manually with batchWeightManFn(), the Weight per Serving changes
function weightPerServingCalcFn() {
    weightPerServing = Math.round(batchWeight / numberOfServings);
    document.getElementById('weight_per_serving_input').input = weightPerServing; // Not working
    localStorage.setItem("weightPerServing " + foodId, weightPerServing);
}

// Pieces per Serving Manual Function:
function piecesPerServingManFn () {
    piecesPerServing = document.getElementById('pieces_per_serving_input').value;
    localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);

    batchQuantityFn(); // Batch Quantity is affected
    weightPerServingCalcFn2(); // Weight per Serving is affected
    caloriesFn(); // Calories is affected
    batchWeightP(); // Batch Weight is affected
}

// Weight per Piece Manual Function
// Called when User types into the Weight per Piece input
function weightPerPieceManFn() {
    weightPerPiece = document.getElementById('weight_per_piece_input').value;
    localStorage.setItem("weightPerPiece " + foodId, weightPerPiece);

    weightPerServingCalcFn2(); // Weight per Serving is affected
    caloriesFn(); // Calories is affected
    batchWeightP(); // Batch Weight is affected
}

// weightPerServingCalcFn2(); //Name needs updating
// Called when User changes number of Pieces per Serving, Weight per Piece or Batdh Quantity
function weightPerServingCalcFn2() {
    weightPerServing = Math.round(weightPerPiece * piecesPerServing);
    document.getElementById('weight_per_serving_input').innerHTML = weightPerServing;
    localStorage.setItem("weightPerServing " + foodId, weightPerServing);
}

// Batch Quantity Manual Function
//Called when users changes the input in Batch Quantity
function batchQuantityManFn() {
    batchQuantity = document.getElementById('batch_quantity_input').value;
    localStorage.setItem("batchQuantity " + foodId, batchQuantity);

    piecesPerServingCalcFn() // Pieces per Serving is affected
    weightPerServingCalcFn2() // Weight per Serving is affected
    caloriesFn(); // Calories is affected
    batchWeightP(); // Batch Weight is affected
}

// Pieces per Serving Calculation Function
// When user manually changes batch quantity with batchQuantityManFn(), pieces per serving is affected
function piecesPerServingCalcFn(){
    piecesPerServing = Math.round(batchQuantity / numberOfServings); //?? Needs to go to 1 decimal place
    console.log("piecesPerServing", piecesPerServing);
    document.getElementById('pieces_per_serving_input').value = piecesPerServing;
    localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);
}