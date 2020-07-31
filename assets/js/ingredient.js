//Global Variables used throughout the file
var foodId = document.location.search.replace(/^.*?\=/,''); //Food Id: Extracted from url
let numberOfServings;
let weightPerServing;
let weightPerPiece;
let caloriesPer100g;
let caloriesPerServing;
let piecesPerServing;
let batchWeight;
let quantityPerBatch;
let weightPerWhole;
let defaultWeight = 123;

async function searchAPI() {
    searchIngredients(foodId);
}
searchAPI();

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

        // Extract Measurements from API
        let measure = item.measures;
        let label;
        let weight;

        // Extract calories from API
        caloriesPer100g = item.food.nutrients.ENERC_KCAL;
        localStorage.setItem("caloriesPer100g " + foodId, caloriesPer100g)

        // Extract default number of servings from html
        numberOfServingsStr = document.getElementById("number_of_servings_input").value;
        numberOfServings = parseInt(numberOfServingsStr);
        localStorage.setItem("numberOfServings " + foodId, numberOfServings);

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

}; //Search is all contained in here


// Extract Measurements from local storage
function getDataFn() {
    numberOfServings = localStorage.getItem("numberOfServings " + foodId);
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
    } else if (weightPerWhole === null) {   //If weight per piece is not defined, use whole weight.
        document.getElementById("weight_per_piece_input").value = weightPerWhole;
        weightPerPiece = weightPerWhole;
    } else if (weightPerServing === null) {   //If weight per piece and whole weight are not defined, use serving weight.
        document.getElementById("weight_per_piece_input").value = weightPerServing;
        weightPerPiece = weightPerServing;
    } else {   //If none are defined, use default weight
        document.getElementById("weight_per_piece_input").value = defaultWeight;
        weightPerPiece = defaultWeight;
    }
}


// Pieces Per Serving: Simplifed solution as halves should be included maybe.
function piecesPerServingFn() {
    console.log("function fires");
    if (weightPerServing >= weightPerPiece) { // If the serving weight is greater than the weight per piece...
        piecesPerServing = Math.round(weightPerServing / weightPerPiece); // the 1st is divided by the 2nd.
        localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);
        document.getElementById("pieces_per_serving_input").value = piecesPerServing;
    } else {
        localStorage.setItem("piecesPerServing " + foodId, 1); // Otherwise the default is 1. 
        document.getElementById("pieces_per_serving_input").value = 1;
    }
}

// Batch Weight:  
function batchWeightFn() {
    let batchWeightLS = localStorage.getItem("batchWeight " + foodId);
    console.log("Batch Weight", batchWeightLS);
    if (batchWeightLS === null) { //If there is no existing data in LS...
        batchWeight =  numberOfServings * weightPerServing; //run calculation...
        document.getElementById("batch_weight_input").value = batchWeight; //add it to html and...
        localStorage.setItem("batchWeight " + foodId, batchWeight); //save to LS
    } else {
        document.getElementById("batch_weight_input").value = batchWeightLS; // If there is a value in LS, add it to html
    }
}

// Batch Quantity: 
function batchQuantityFn() {
    let quantityPerBatchLS = localStorage.getItem("quantityPerBatch " + foodId); // Extract data from LS if available
    if (quantityPerBatchLS === null) { //If there is no existing data in LS...
        quantityPerBatch =  numberOfServings * piecesPerServing; //run calculation...
        document.getElementById("batch_quantity_input").value = quantityPerBatch; //add it to html and...
        localStorage.setItem("quantityPerBatch " + foodId, quantityPerBatch); //save to LS
    } else {
        document.getElementById("batch_quantity_input").value = quantityPerBatchLS; // If there is a value in LS, add it to html
    }
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
        weightPerServing = weightPerPiece * piecesPerServing;
        localStorage.setItem("weightPerServing "  + foodId, weightPerServing);

        //If checked, the weight per serving input changes to <p>
        document.getElementById("weight_per_serving_container").innerHTML = `
            <p id="weight_per_serving_input">${weightPerServing}</p>
        `;

        //If checked, batch weight is calculated instead of being taken from API
        //It also changes from an input to a <p> tag.
        batchWeight =  numberOfServings * weightPerServing;
        document.getElementById("batch_weight_input").outerHTML = `
            <p id="batch_weight_input">${batchWeight}</p>
        `; 
        localStorage.setItem("batchWeight " + foodId, batchWeight);

    } else if (checkBox.checked === false) {
        document.getElementById("pieces_row").style.display = "none"; //If Unchecked: Pieces row is hidden
        document.getElementById("ingredient_batch_qty_div").style.display = "none"; //If Unhecked: Batch row is hidden
        localStorage.setItem("checkBoxStatusKey "  + foodId, false); //If Unchecked: Checkbox status "false" saved to local storage

        //When unchecked, after being checked, the inputs are reinstated in place of the <p>tags
        //If either weight changed when checked, this becomes the displayed weight

        //Weight per Serving:
        document.getElementById("weight_per_serving_container").innerHTML = `
            <input id="weight_per_serving_input" type="number" 
            inputmode="numeric" pattern="[0-9]*" maxlength="7" class="input_weight_number" 
            name="total_amt" value="${weightPerServing}" onkeyup="weightPerServingManFn()"/>
        `;
        //Batch Weight:
        document.getElementById("batch_weight_input").outerHTML = `
            <input id="batch_weight_input" type="text" inputmode="numeric" pattern="[0-9]*" 
            maxlength="7" class="input_weight_number" value="${batchWeight}" onkeyup="weightPerServingCalcFn()"/>
        `;
       
    }
}

// Get Weight Per Serving input value and save to local storage
var weightPerServingLs = localStorage.getItem('weightPerServing ' + foodId, weightPerServing);

// Called when User types into the input field
var weightPerServingManFn = function () {
    weightPerServing = document.getElementById('weight_per_serving_input').value;
    localStorage.setItem("weightPerServing " + foodId, weightPerServing);
}

//weightPerServingFn();
// Called when User changes number of piece per serving and/or weight per piece
var weightPerServingCalcFn = function () {
    weightPerServing = weightPerPiece * piecesPerServing;
    document.getElementById('weight_per_serving_input').innerHTML = weightPerServing;
    console.log("piecesPerServing CalcFn", piecesPerServing);
    console.log("weightPerPiece CalcFn", weightPerPiece);
    localStorage.setItem("weightPerServing " + foodId, weightPerServing);
}

// Change input to <p>, called when User changes number of pieces per serving and/or weight per piece
var weightPerServingP = function (){
    console.log(document.getElementById('weight_per_serving_input'));
    document.getElementById('weight_per_serving_container').outerHTML = `
    <div id="weight_per_serving_container" class="floatL">
        <p id="weight_per_serving_input" type="number">${weightPerServing}</p>
    </div>
    `;
}

// Called when User types into the Weight Per Piece field input
var weightPerPieceManFn = function () {
    weightPerPiece = document.getElementById('weight_per_piece_input').value; // Extracts the value that the User types
    localStorage.setItem("weightPerPiece " + foodId, weightPerPiece); // Adds this value to Local Storage
}

//--- Pieces Per Serving: Get from local storage if available
var piecesPerServingLs = localStorage.getItem('piecesPerServing ' + foodId, piecesPerServing);

// Called when User types into the input field
var piecesPerServingManFn = function () {
    piecesPerServing = document.getElementById('pieces_per_serving_input').value;
    localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);
}

