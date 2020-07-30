var foodId = document.location.search.replace(/^.*?\=/,'');

async function searchAPI() {
   await searchIngredients(foodId);
    //await searchPortions(searchTerm);
}

// Search: Ingredients
async function searchIngredients(foodId) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${foodId}&app_id=${app_id}&app_key=${app_key}&category=generic-foods`;
    //console.log(url);

    var product_name = '',
        ingredientNameId = document.getElementById("ingredient_product_name"); // Takes the tag with id inside as outer, and everything in it

    response = await fetch(url, {headers: {"Access-Control-Allow-Origin": "*"}});
        //console.log(response);
    recipes = await response.json();
        //console.log(recipes);

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
        //console.log(product_name);

    // All of the data being extracted here shouldn't be. It should be extracted when
    // the user clicks the + icon on the search results or portion page, and lands on
    // the ingredient page. Instead of below, the data should be extracted from LS. 


        // Extract Measurements from API
        let measure = item.measures;
        let label;
        let weight;
        let numberOfServings;
        let weightPerServing;
        let weightPerPiece;
        let weightPerWhole;
        let caloriesPer100g;
        let caloriesPerServing;
        let piecesPerServing;
        let defaultWeight = 123;
        let batchWeight;
        let quantityPerBatch;

        // Extract calories from API
        caloriesPer100g = item.food.nutrients.ENERC_KCAL;
        localStorage.setItem("caloriesPer100g " + foodId, caloriesPer100g)
        console.log("Calories per 100g", foodId, caloriesPer100g)

        // Extract default number of servngs from html
        numberOfServings = document.getElementById("number_of_servings_input").value;
        localStorage.setItem("numberOfServings " + foodId, numberOfServings);
        console.log("numberOfServings" + foodId, numberOfServings);

        // Below functions should only kick in when the user lands on page for
        // the first time, because "serving weight from line 87 will be empty.
        // After this the data will be in local storage and these functions are not required.
        // But it's not working. Serving Weight keeps reverting to what's taken from 
        // the functions below. It like line 98 is being ignored. 

        for(let i=0; i<measure.length; i++){
            label = (measure[i].label);
            weight =(measure[i].weight);
            if (label === "Piece"){
                weightPerPiece = Math.round(weight);
            }
        }
        for(let i=0; i<measure.length; i++){
            label = (measure[i].label);
            weight =(measure[i].weight);
            if (label === "Serving"){
                weightPerServing = Math.round(weight);
            }
        }
        for(let i=0; i<measure.length; i++){
            label = (measure[i].label);
            weight =(measure[i].weight);
            if (label === "Whole"){
                weightPerWhole = Math.round(weight);
            }
        }
    
        //--- Serving Weight: Set in local storage and on html
        if (weightPerServing !== undefined) {//If serving weight is defined, use it.
            localStorage.setItem("weightPerServing " + foodId, weightPerServing);
            document.getElementById("weight_per_serving_input").value = weightPerServing;
            weightPerServing = weightPerServing;
        } else if (weightPerPiece !== undefined) { //If serving weight is not defined, use weight per piece
            localStorage.setItem("weightPerServing " + foodId, weightPerPiece);
            document.getElementById("weight_per_serving_input").value = weightPerPiece;
            weightPerServing = weightPerPiece;
        } else if (weightPerWhole !== undefined) { //If serving weight and weight per piece are not defined, use whole weight
            localStorage.setItem("weightPerServing " + foodId, weightPerWhole);
            document.getElementById("weight_per_serving_input").value = weightPerWhole;
            weightPerServing = weightPerWhole;
        } else { //If none are defined, use default weight
            localStorage.setItem("weightPerServing " + foodId, defaultWeight);
            document.getElementById("weight_per_serving_input").value = defaultWeight;
            weightPerServing = defaultWeight;
        }

        //--- Weight Per Piece: Set in local storage and on html
        if (weightPerPiece !== undefined) {   //If weight per piece is defined, use it.
            localStorage.setItem("weightPerPiece " + foodId, weightPerPiece);
            document.getElementById("weight_per_piece_input").value = weightPerPiece;
            weightPerPiece = weightPerPiece;
        } else if (weightPerWhole !== undefined) {   //If weight per piece is not defined, use whole weight.
            localStorage.setItem("weightPerPiece " + foodId, weightPerWhole);
            document.getElementById("weight_per_piece_input").value = weightPerWhole;
            weightPerPiece = weightPerWhole;
        } else if (weightPerServing !== undefined) {   //If weight per piece and whole weight are not defined, use serving weight.
            localStorage.setItem("weightPerPiece " + foodId, weightPerServing);
            document.getElementById("weight_per_piece_input").value = weightPerServing;
            weightPerPiece = weightPerServing;
        } else {   //If none are defined, use default weight
            localStorage.setItem("weightPerPiece " + foodId, defaultWeight);
            document.getElementById("weight_per_piece_input").value = defaultWeight;
            weightPerPiece = defaultWeight;
        }

        // Pieces Per Serving: If the serving weight is greater than the weight per piece, 
        // the 1st is divided by the 2nd. Otherwise the default is 1. Simplifed solution.
        if (weightPerServing >= weightPerPiece) {
            piecesPerServing = Math.round(weightPerServing / weightPerPiece);
            localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);
            document.getElementById("pieces_per_serving_input").value = piecesPerServing;
        } else {
            localStorage.setItem("piecesPerServing " + foodId, 1);
            document.getElementById("pieces_per_serving_input").value = 1;
        }

        //Batch Weight: First check to see if there is a value in LS. 
        let batchWeightLS = localStorage.getItem("batchWeight " + foodId);
        console.log("batchWeight", batchWeightLS);
        if (batchWeightLS === null) { //If there is no existing data in LS...
            batchWeight =  numberOfServings * weightPerServing; //run calculation...
            document.getElementById("batch_weight_input").value = batchWeight; //add it to html and...
            localStorage.setItem("batchWeight " + foodId, batchWeight); //save to LS
        } else {
            document.getElementById("batch_weight_input").value = batchWeightLS; // If there is a value in LS, add it to html
            console.log("batchWeight", batchWeightLS);
        }

        //Batch Quantity: First check to see if there is a value in LS. 
        let quantityPerBatchLS = localStorage.getItem("quantityPerBatch " + foodId);
        console.log("quantityPerBatch", quantityPerBatchLS);
        if (quantityPerBatchLS === null) { //If there is no existing data in LS...
            quantityPerBatch =  numberOfServings * piecesPerServing; //run calculation...
            console.log("Number of servings", numberOfServings);
            console.log("Pieces per Serving", piecesPerServing);
            document.getElementById("batch_quantity_input").value = quantityPerBatch; //add it to html and...
            localStorage.setItem("quantityPerBatch " + foodId, quantityPerBatch); //save to LS
        } else {
            document.getElementById("batch_quantity_input").value = quantityPerBatchLS; // If there is a value in LS, add it to html
            console.log("quantityPerBatch", quantityPerBatchLS);
        }

    });

    // Checks if measure checkbox was already checked and updates fields accordingly.
    var checkBoxStatus = localStorage.getItem("checkBoxStatusKey " + foodId);
    console.log("checkBoxStatus", checkBoxStatus);
    if (checkBoxStatus == "true"){
        document.getElementById("measurement_checkbox").outerHTML = `
        <input type="checkbox" id="measurement_checkbox" class="input_percent" 
        name="measurement_checkbox" checked>
        `;
    checkBox(); //Why is this not firing?
    }
}; //Search is all contained in here

//All of these variable are already declared inside the search function but due
//to scope need to be redecalred here. Due to async and await, they don't get 
//the necessary values as quickly as they need to.
// Extract Measurements from local storage

let numberOfServings;
let weightPerServing;
let weightPerPiece;
let caloriesPer100g;
let caloriesPerServing;
let piecesPerServing;
let batchWeight;
let quantityPerBatch;
document.getElementById("measurement_checkbox").addEventListener("click", getData);
function getData (){
    numberOfServings = localStorage.getItem("numberOfServings " + foodId);
    weightPerServing = localStorage.getItem("weightPerServing " + foodId);
    weightPerPiece = localStorage.getItem("weightPerPiece " + foodId);
    caloriesPer100g = localStorage.getItem("caloriesPer100g " + foodId);
    caloriesPerServing = localStorage.getItem("caloriesPerServing " + foodId);
    piecesPerServing = localStorage.getItem("piecesPerServing " + foodId);
    batchWeight = localStorage.getItem("batchWeight " + foodId);
    quantityPerBatch = localStorage.getItem("quantityPerBatch " + foodId);
    checkBox();
    console.log("weightPerServing", weightPerServing);
}



// Per Piece Checkbox: Additional "Batch" and "Piece" fields displayed if checkbox is checked
//document.getElementById("measurement_checkbox").addEventListener("click", checkBox);
function checkBox() {
    var checkBox = document.getElementById("measurement_checkbox");
    if (checkBox.checked === true) {
        document.getElementById("pieces_row").style.display = "block";
        document.getElementById("ingredient_batch_qty_div").style.display = "block";
        localStorage.setItem("checkBoxStatusKey "  + foodId, true);

        //If checked, the weight per serving is calculated instead of being taken from API
        weightPerServing = weightPerPiece * piecesPerServing;
        console.log("Weight per serving", weightPerServing)

        //If checked, the weight per serving input changes to <p>
        document.getElementById("weight_per_serving_container").innerHTML = `
            <p id="weight_per_serving_input">${weightPerServing}</p>
        `;

    } else if (checkBox.checked === false) {
        document.getElementById("pieces_row").style.display = "none";
        document.getElementById("ingredient_batch_qty_div").style.display = "none";
        localStorage.setItem("checkBoxStatusKey "  + foodId, false);

        document.getElementById("weight_per_serving_container").innerHTML = `
            <input id="weight_per_serving_input" type="number" 
            inputmode="numeric" pattern="[0-9]*" maxlength="7" class="input_weight_number" 
            name="total_amt" value="123" onkeyup="weightPerServingManFn()"/>
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
// Called automatically to extract the Value from local storage
var weightPerServingFn = function (){
    if (weightPerServingLs === null){
        weightPerServing = document.getElementById('weight_per_serving_input').value = weightPerServing;
        localStorage.setItem("weightPerServing " + foodId, weightPerServing);
        console.log("hello one");
    } else {
        weightPerServing = document.getElementById('weight_per_serving_input').value = weightPerServingLs;
        console.log("hello too");
    }
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

//--- Weight Per Piece: Get from local storage if available
var weightPerPieceLs = localStorage.getItem('weightPerPiece ' + foodId, weightPerPiece);

var weightPerPieceFn = function (){
    if (weightPerPieceLs === null){ // Checks for no value in Local Storage, then
        weightPerPiece = document.getElementById('weight_per_piece_input').value; // Extracts the default value from the html
        localStorage.setItem("weightPerPiece " + foodId, weightPerPiece); // Adds the default value to local storage
    } else {
        weightPerPiece = weightPerPieceLs; // If there is a value in local storage...
    }
}
//weightPerPieceFn();

// Called when User types into the Weight Per Piece field input
var weightPerPieceManFn = function () {
    weightPerPiece = document.getElementById('weight_per_piece_input').value; // Extracts the value that the User types
    localStorage.setItem("weightPerPiece " + foodId, weightPerPiece); // Adds this value to Local Storage
}


//--- Pieces Per Serving: Get from local storage if available
var piecesPerServingLs = localStorage.getItem('piecesPerServing ' + foodId, piecesPerServing);


// Called automatically to extract the Value from local storage
var piecesPerServingFn = function (){
    if (piecesPerServingLs === null){
        piecesPerServing = document.getElementById('pieces_per_serving_input').value;
        localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);
        console.log("piecesPerServingLs", piecesPerServing);
    } else {
        piecesPerServing = piecesPerServingLs;
        console.log("piecesPerServing Serving Fn", piecesPerServing);
    }
}
//piecesPerServingFn();

// Called when User types into the input field
var piecesPerServingManFn = function () {
    piecesPerServing = document.getElementById('pieces_per_serving_input').value;
    localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);
}

