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
    console.log("batchWeightManFn Function Fires");
    batchWeight = document.getElementById("batch_weight_input").value;
    localStorage.setItem("batchWeight " + foodId, batchWeight);
    weightPerServingCalcFn();
    caloriesFn();
}

// Weight per Serving Batch Weight Calculation // Not fully working
// When the Batch Weight input is changed manually with batchWeightManFn(), the Weight per Serving changes
function weightPerServingCalcFn() {
    weightPerServing = Math.round(batchWeight / numberOfServings);
    document.getElementById('weight_per_serving_input').value = weightPerServing; // Not working
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
    piecesPerServingCalc = batchQuantity / numberOfServings;
    let multiplier = Math.pow(10, 1 || 0);
    piecesPerServing = Math.round(piecesPerServingCalc * multiplier) / multiplier;
    console.log("piecesPerServing", piecesPerServing);
    document.getElementById('pieces_per_serving_input').value = piecesPerServing;
    localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);
}


// COOKING SECTION
// Designed to have similar functionality to radio buttons. Bricks and text handled separately.

// Cooking Method:
// Changes brick colour when clicked, saves data to LS and updates HTML
$(".cooking_method_brick").on("click", async function () {

    $(".cooking_method_brick").css({"background": "var(--white)"}); // Makes all bricks white, thereby deselecting any brick already selected
    $(".cooking_substrate_brick").css({"background": "var(--white)"}); // Clears any substrate selection

    $(this).css({"background": "var(--orange)"}); // Makes the selected brick orange
    let methodID = document.getElementById(this.id).id;  // Extracts the ID for the substrate selected
    localStorage.setItem("cookingMethodBrick " + foodId, methodID);  // Save the ID to LS
    document.getElementById("cooking_method_span").innerHTML = methodID; // Adds method to "Cooking HTML"

    await getCookingData(); //This make data saved available globally
    caloriesFn(); // Reverts to non-cooked calorie count
});
// Handles the brick text
$(".cooking_method_brick>p").on("click", function () {
    $(".cooking_method_brick>p").css({"color": "var(--first_layer)"}); // Makes all brick texts black, thereby deselecting any brick already selected
    $(".cooking_substrate_brick>p").css({"color": "var(--first_layer)"}); // If User had selected a substrate but then choose another method, this clears the substrate
    $(this).css({"color": "var(--white)"});  // Makes the selected brick text white
});


// Cooking Substrate:
// Changes brick colour when clicked, saves data to LS and updates HTML
$(".cooking_substrate_brick").on("click", async function () {
    $(".cooking_substrate_brick").css({"background": "var(--white)"}); // Makes all bricks white, thereby deselecting any brick already selected
    $(this).css({"background": "var(--orange)"}); // Makes the selected brick orange
    let substrateID = document.getElementById(this.id).id; // Extracts the ID for the substrate selected
    localStorage.setItem("cookingSubstrateBrick " + foodId, substrateID); // Commit the ID to LS
    document.getElementById("substrate_span").innerHTML = " with " + substrateID; // Adds substrate to "Cooking HTML"

    await getCookingData(); //This make data saved available globally
    await caloriesCookingCalulationFn();
});
// Handles the brick text
$(".cooking_substrate_brick>p").on("click", function () {
    $(".cooking_substrate_brick>p").css({"color": "var(--first_layer)"}); // Makes all brick texts black, thereby deselecting any brick already selected
    $(this).css({"color": "var(--white)"});  // Makes the selected brick text white
});

// Cooking Data Variables:
let methodID;
let substrateID;
let totalCalories;

// Get Cooking Data from Local Storage:
async function getCookingData() {
    methodID = localStorage.getItem("cookingMethodBrick " + foodId);
    substrateID = localStorage.getItem("cookingSubstrateBrick " + foodId);
}

console.log(methodID);

// Substrate Display Function:
// Allows Substrate section to display or hide when required
$(".cooking_method_brick").on("click", function () {
    console.log(methodID);
    if (methodID == "microwave_brick" || methodID == "baked_brick" || 
        methodID == "roasted_brick" || methodID == "grilled_brick" || 
        methodID == "pan_fried_brick" || methodID == "shallow_fried_brick" || 
        methodID == "deep_fried_brick" ){ // Should be a shorter way of doing this using "substrate_yes" class...
            document.getElementById("cooking_substrate_container").style.display = "block"; // Display the substrate section
            document.getElementById("low_cal_spray_brick").style.display = "none"; // Ensures Low Cal Spray only displayed with Pan Fried
    } else {
        document.getElementById("cooking_substrate_container").style.display = "none"; // Keeps substrate section hidden
        localStorage.removeItem("cookingSubstrateBrick " + foodId); // If selected has no substrate associated with it, existing one is removed.

        // Ensures Low Cal Spray is only displayed with Pan Fried is selected, 
        // by hiding it if anything else is selected.
        // Connected to if statement at the end of this function
        document.getElementById("low_cal_spray_brick").style.display = "none";

        // Not sure why I put these two in here...
        $(".cooking_substrate_brick").css({"background": "var(--white)"});
        $(".cooking_substrate_brick>p").css({"color": "var(--first_layer)"});
    }

    // Low Cal Spray displays in Substrates if Pan Fried is selected as a method
    if (methodID == "pan_fried_brick"){
        document.getElementById("low_cal_spray_brick").style.display = "block";
    }
});



// Calories Cooking Calculation: Called from getCookingData() when required data is extracted from LS
// Calculates the calories per swerving based on cooking method and substrate
// There has to be a shorter way than this!!
function caloriesCookingCalulationFn() {
    if (substrateID == "vegetable_oil_brick" && (methodID == "microwave_brick" ||
        methodID == "baked_brick" || methodID == "roasted_brick" ||
        methodID == "grilled_brick")) {
        totalCalories = Math.round(caloriesPerServing * 1.2);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "animal_fat_brick" && (methodID == "microwave_brick" ||
        methodID == "baked_brick" || methodID == "roasted_brick" ||
        methodID == "grilled_brick")) {
        totalCalories = Math.round(caloriesPerServing * 1.22);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "margarine_brick" && (methodID == "microwave_brick" ||
        methodID == "baked_brick" || methodID == "roasted_brick" ||
        methodID == "grilled_brick")) {
        totalCalories = Math.round(caloriesPerServing * 1.15);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "butter_brick" && (methodID == "microwave_brick" ||
        methodID == "baked_brick" || methodID == "roasted_brick" ||
        methodID == "grilled_brick")) {
        totalCalories = Math.round(caloriesPerServing * 1.15);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "vegetable_oil_brick" && methodID == "pan_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.25);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "animal_fat_brick" && methodID == "pan_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.27);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "margarine_brick" && methodID == "pan_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.20);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "butter_brick" && methodID == "pan_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.20);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "low_cal_spray_brick" && methodID == "pan_fried_brick") {
        totalCalories = caloriesPerServing + 1; // Needs to be One per serving
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "vegetable_oil_brick" && methodID == "shallow_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.50);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "animal_fat_brick" && methodID == "shallow_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.55);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "margarine_brick" && methodID == "shallow_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.40);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "butter_brick" && methodID == "shallow_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.40);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "vegetable_oil_brick" && methodID == "deep_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.75);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "animal_fat_brick" && methodID == "deep_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.82);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "margarine_brick" && methodID == "deep_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.60);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else if (substrateID == "butter_brick" && methodID == "deep_fried_brick") {
        totalCalories = Math.round(caloriesPerServing * 1.60);
        document.getElementById("calories_per_serving").textContent = totalCalories;
        localStorage.setItem("caloriesPerServing " + foodId, totalCalories);
    } else {
        console.log("caloriesPerServing", caloriesPerServing);
    }
}

