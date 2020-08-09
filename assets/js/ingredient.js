//Global Variables used throughout the file
let foodId = document.location.search.replace(/^.*?\=/,''); //Food Id: Extracted from url
localStorage.setItem("foodId " + foodId, foodId);
let weightPerServing;
let weightPerPiece;
let caloriesPer100g;
let caloriesPerServing;
let piecesPerServing;
let batchWeight;
let quantityPerBatch;
let weightPerWhole;
let defaultWeight = 125;
let numberOfServings;
let productName;

// Triggers the searchIngredients function
function searchAPI() {
    searchIngredients(foodId);
}
searchAPI();

// Search: Ingredients
async function searchIngredients(foodId) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${foodId}&app_id=
                ${app_id}&app_key=${app_key}&category=generic-foods`;
    console.log(url);

    product_name = "";
    ingredientNameId = document.getElementById("ingredient_product_name"); // Takes the tag with id inside as outer, and everything in it

    response = await fetch(url, {headers: {"Access-Control-Allow-Origin": "*"}});
    recipes = await response.json();

    recipes.hints.filter((item) => {

        // API returns a variety of cases. This capitalises 1st letter of each word
        let capitalized_product_name = (product_name) => {
        let arr = product_name.toLowerCase().split(" ");
        arr.forEach(function (i, index) {
            if (i[0] !== undefined) {
            arr[index] = i.replace(i[0], i[0].toUpperCase());
            }
        });
        return arr.join(" ");
        };

        if (item.food.category === "Generic foods") {
        product_name = capitalized_product_name(item.food.label);
        } else {
        return;
        }

        // Displays product name on the Ingredient Page
        ingredientNameId.innerHTML = `${product_name}`;

        // Displays product name on the Ingredient Page "Add to Dish" button
        document.getElementById("add_to_dish_button_span").innerHTML = `${product_name}`;
        document.getElementById("add_to_dish_button_span2").innerHTML = `${product_name}`;
        localStorage.setItem("productName " + foodId, `${product_name}`);

        // Extract Measurements from API
        let measure = item.measures;
        let label;
        let weight;

        // Extract calories from API and saved to LS
        caloriesPer100g = item.food.nutrients.ENERC_KCAL;
        localStorage.setItem("caloriesPer100g " + foodId, caloriesPer100g)

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

    // Number of Servings: Initial on-page-load value determined here
    numberOfServings = localStorage.getItem("numberOfServings");
    if (numberOfServings === null){
        localStorage.setItem("numberOfServings", 10);
        document.getElementById("number_of_servings_input").value = 10;
        numberOfServings = 10;
        console.log("numberOfServings", numberOfServings);
    } else {
        document.getElementById("number_of_servings_input").value = numberOfServings;
        console.log("numberOfServings", numberOfServings);
    }

    await getDataFn();

    // Checks if "per piece" checkbox was already checked and updates fields accordingly.
    let checkBoxStatus = localStorage.getItem("checkBoxStatusKey " + foodId);
    if (checkBoxStatus == "true"){
        document.getElementById("measurement_checkbox").outerHTML = `
        <input type="checkbox" id="measurement_checkbox" class="input_percent"
        name="measurement_checkbox" checked>
        `;
    checkBox();
    }

}; // Search is all contained in here


// EXTRACT MEASUREMENTS FROM local storage
async function getDataFn() {
    weightPerServing = localStorage.getItem("weightPerServing " + foodId);
    weightPerPiece = localStorage.getItem("weightPerPiece " + foodId);
    caloriesPer100g = localStorage.getItem("caloriesPer100g " + foodId);
    caloriesPerServing = localStorage.getItem("caloriesPerServing " + foodId);
    piecesPerServing = localStorage.getItem("piecesPerServing " + foodId);
    batchWeight = localStorage.getItem("batchWeight " + foodId);
    quantityPerBatch = localStorage.getItem("quantityPerBatch " + foodId);
    weightPerWhole = localStorage.getItem("weightPerWhole " + foodId);
    productName = localStorage.getItem("productName " + foodId);
    numberOfServings = localStorage.getItem("numberOfServings");
    console.log("numberOfServings", numberOfServings);
    addedToDish = localStorage.getItem(foodId);

    await weightPerServingFn();
    await weightPerPieceFn();
    await piecesPerServingFn();
    await batchWeightFn();
    await batchQuantityFn();
    await caloriesFn();
    await getCookingData();
    await caloriesCookingCalulationFn();
}

// Weight per Serving:
function weightPerServingFn() {
    if (weightPerServing !== null) {  //If serving weight is defined, use it.
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
    localStorage.setItem("weightPerServing " + foodId, weightPerServing);
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

// Pieces Per Serving:
function piecesPerServingFn() {
    if (piecesPerServing !== null) { //If pieces per serving is defined, use it.
        document.getElementById("pieces_per_serving_input").value = piecesPerServing;
        piecesPerServing = piecesPerServing;
    } else if (parseInt(weightPerServing) >= parseInt(weightPerPiece)) { // If the serving weight is greater than the weight per piece...
        piecesPerServing = Math.round(weightPerServing / weightPerPiece); // the 1st is divided by the 2nd. //?? Needs to go to 1 decimal place
        localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);
        document.getElementById("pieces_per_serving_input").value = piecesPerServing;
    } else {
        localStorage.setItem("piecesPerServing " + foodId, 1); // Otherwise the default is 1.
        document.getElementById("pieces_per_serving_input").value = 1;
        
        // Needed for certain products like "Pizza", but not for "Hard-boiled Egg".
        // Don't know why they differ or whay this is needed.
        getDataFn();
        batchQuantityFn();
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
    console.log("numberOfServings", numberOfServings);
    console.log("piecesPerServing", piecesPerServing);
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
    let checkBox = document.getElementById("measurement_checkbox");
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

        // Cooking: Any existing selections are cleared
        $(".cooking_substrate_brick").css({"background": "var(--white)"}); // Makes all bricks white, thereby deselecting any brick already selected
        $(".cooking_substrate_brick>p").css({"color": "var(--first_layer)"}); // Makes all brick texts black, thereby deselecting any brick already selected
        $(".cooking_method_brick").css({"background": "var(--white)"}); // Makes all bricks white, thereby deselecting any brick already selected
        $(".cooking_method_brick>p").css({"color": "var(--first_layer)"}); // Makes all brick texts black, thereby deselecting any brick already selected
        localStorage.removeItem("cookingMethodBrick " + foodId);
        localStorage.removeItem("cookingSubstrateBrick " + foodId);
        localStorage.removeItem("cookingStatus " + foodId);

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
    numberOfServings = document.getElementById("number_of_servings_input").value;
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
    document.getElementById("weight_per_serving_input").value = weightPerServing;
    localStorage.setItem("weightPerServing " + foodId, weightPerServing);
}

// Pieces per Serving Manual Function:
function piecesPerServingManFn () {
    piecesPerServing = document.getElementById("pieces_per_serving_input").value;
    localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);

    batchQuantityFn(); // Batch Quantity is affected
    weightPerServingCalcFn2(); // Weight per Serving is affected
    caloriesFn(); // Calories is affected
    batchWeightP(); // Batch Weight is affected
}

// Weight per Piece Manual Function
// Called when User types into the Weight per Piece input
function weightPerPieceManFn() {
    weightPerPiece = document.getElementById("weight_per_piece_input").value;
    localStorage.setItem("weightPerPiece " + foodId, weightPerPiece);

    weightPerServingCalcFn2(); // Weight per Serving is affected
    caloriesFn(); // Calories is affected
    batchWeightP(); // Batch Weight is affected
}

// weightPerServingCalcFn2(); //Name needs updating
// Called when User changes number of Pieces per Serving, Weight per Piece or Batdh Quantity
function weightPerServingCalcFn2() {
    weightPerServing = Math.round(weightPerPiece * piecesPerServing);
    document.getElementById("weight_per_serving_input").innerHTML = weightPerServing;
    localStorage.setItem("weightPerServing " + foodId, weightPerServing);
}

// Batch Quantity Manual Function
//Called when users changes the input in Batch Quantity
function batchQuantityManFn() {
    batchQuantity = document.getElementById("batch_quantity_input").value;
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
    document.getElementById("pieces_per_serving_input").value = piecesPerServing;
    localStorage.setItem("piecesPerServing " + foodId, piecesPerServing);
}


// COOKING SECTION
// Designed to have similar functionality to radio buttons. Bricks and text handled separately.

// Cooking Method:
// Changes brick colour when clicked, saves data to LS and updates HTML
$(".cooking_method_brick").on("click", async function cookingBrickBgColourFn() {

    $(".cooking_method_brick").css({"background": "var(--white)"}); // Makes all bricks white, thereby deselecting any brick already selected
    $(".cooking_substrate_brick").css({"background": "var(--white)"}); // Clears any substrate selection

    $(this).css({"background": "var(--orange)"}); // Makes the selected brick orange
    let methodID = document.getElementById(this.id).id;  // Extracts the ID for the substrate selected
    localStorage.setItem("cookingMethodBrick " + foodId, methodID);  // Save the ID to LS

    // ID's are extracted in lowercase, underscore separated and the word "brick" 
    // at the end. The above are removed and first letters capitalised.
    let methodIDRemoveUnderscore = methodID.replace(/_/g, " "); // Replaces all _. The g captures all.
    let methodIDRemoveBrick = methodIDRemoveUnderscore.replace(/brick/g, " ");
    let methodIDCapitalise = methodIDRemoveBrick.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

    document.getElementById("cooking_method_span").innerHTML = methodIDCapitalise; // Adds method to "Cooking" HTML .cooking_method_span
    document.getElementById("substrate_span").innerHTML = ""; // Removes substrat from "Cooking" HTML .substrate_span

    await getCookingData(); //This make data saved available globally
    caloriesFn(); // Reverts to non-cooked calorie count

    // Scrolls the search widget to the top so that the results are visible.
    document.querySelector("#collapseFour").scrollIntoView({
        behavior: "smooth"
    });
});
// Handles the brick text
$(".cooking_method_brick>p").on("click", function cookingBrickTextColour() {
    $(".cooking_method_brick>p").css({"color": "var(--first_layer)"}); // Makes all brick texts black, thereby deselecting any brick already selected
    $(".cooking_substrate_brick>p").css({"color": "var(--first_layer)"}); // If User had selected a substrate but then choose another method, this clears the substrate
    $(this).css({"color": "var(--white)"});  // Makes the selected brick text white
});

// Cooking Substrate:
// Changes brick colour when clicked, saves data to LS and updates HTML
$(".cooking_substrate_brick").on("click", async function substrateBrickBgColourFn() {
    $(".cooking_substrate_brick").css({"background": "var(--white)"}); // Makes all bricks white, thereby deselecting any brick already selected
    $(this).css({"background": "var(--orange)"}); // Makes the selected brick orange
    let substrateID = document.getElementById(this.id).id; // Extracts the ID for the substrate selected
    localStorage.setItem("cookingSubstrateBrick " + foodId, substrateID); // Commit the ID to LS

    let substrateIDRemoveUnderscore = substrateID.replace(/_/g, " ");
    let substrateIDRemoveBrick = substrateIDRemoveUnderscore.replace(/brick/g, " ");
    let substrateIDCapitalise = substrateIDRemoveBrick.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    document.getElementById("substrate_span").innerHTML = " with " + substrateIDCapitalise; // Adds substrate to "Cooking" HTML .substrate_span

    await getCookingData(); //This make data saved available globally
    await caloriesCookingCalulationFn();
});
// Handles the brick text
$(".cooking_substrate_brick>p").on("click", function substrateBrickTextColourFn() {
    $(".cooking_substrate_brick>p").css({"color": "var(--first_layer)"}); // Makes all brick texts black, thereby deselecting any brick already selected
    $(this).css({"color": "var(--white)"});  // Makes the selected brick text white
});

// Cooking Data Variables:
let methodID;
let substrateID;
let totalCalories;

// Cooking Method on Return to Page:
// If User is returning to an existing ingredient, this colours the appropriate bricks
methodID = localStorage.getItem("cookingMethodBrick " + foodId);
substrateID = localStorage.getItem("cookingSubstrateBrick " + foodId);
console.log(methodID);
console.log(substrateID);

if (methodID !== null) {
    if (methodID == "no_further_cooking_needed_brick") {
        document.getElementById("no_further_cooking_needed_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("no_further_cooking_needed_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (methodID == "boiled_brick") {
        document.getElementById("boiled_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("boiled_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (methodID == "steamed_brick") {
        document.getElementById("steamed_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("steamed_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (methodID == "microwave_brick") {
        document.getElementById("microwave_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("microwave_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (methodID == "baked_brick") {
        document.getElementById("baked_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("baked_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (methodID == "roasted_brick") {
        document.getElementById("roasted_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("roasted_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (methodID == "grilled_brick") {
        document.getElementById("grilled_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("grilled_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (methodID == "pan_fried_brick") {
        document.getElementById("pan_fried_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("pan_fried_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (methodID == "shallow_fried_brick") {
        document.getElementById("shallow_fried_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("shallow_fried_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (methodID == "deep_fried_brick") {
        document.getElementById("deep_fried_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("deep_fried_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } 
}

if (substrateID !== null) {
    document.getElementById("cooking_substrate_container").style.display = "block";
    if (substrateID == "dry_brick") {
        document.getElementById("dry_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("dry_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (substrateID == "vegetable_oil_brick") {
        document.getElementById("vegetable_oil_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("vegetable_oil_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (substrateID == "animal_fat_brick") {
        document.getElementById("animal_fat_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("animal_fat_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (substrateID == "margarine_brick") {
        document.getElementById("margarine_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("margarine_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (substrateID == "butter_brick") {
        document.getElementById("butter_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("butter_brick_p").style.color = "var(--white)";
        console.log(methodID);
    } else if (substrateID == "low_cal_spray_brick") {
        document.getElementById("low_cal_spray_brick").style.backgroundColor = "var(--orange)";
        document.getElementById("low_cal_spray_brick_p").style.color = "var(--white)";
        console.log(methodID);
    }
}

// Get Cooking Data from Local Storage:
function getCookingData() {
    methodID = localStorage.getItem("cookingMethodBrick " + foodId);
    substrateID = localStorage.getItem("cookingSubstrateBrick " + foodId);
}

// Substrate Display Function:
// Allows Substrate section to display or hide when required
$(".cooking_method_brick").on("click", function substrateBrickFn() {
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
// There has to be a shorter way than this, pass in the variable maybe??
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
        caloriesFn(); // Allows "Dry" substrate to revert Calories per serving back to non-cooked value
    }
}

// Add Cooking Status to LS:
let cookingStatus;
document.getElementById("collapseFour").addEventListener("click", cookingStatusFn);
function cookingStatusFn() {
    cookingStatus = localStorage.setItem("cookingStatus " + foodId, "true");
}

// ADD INGREDIENT TO DISH

// Add Ingredient Status Function:
// If "Add to Dish" button is clicked on an ingredient, status "addedToDish" is saved to
// local storage. Using the foodId as the key and keeping the value as a constant allows
// us to extract individual product data elsewhere, regardless of what else is in LS.

document.getElementById("add_to_dish_button").addEventListener("click", addIngredientStatusFn);
document.getElementById("add_to_dish_button2").addEventListener("click", addIngredientStatusFn);

function addIngredientStatusFn() {
    cookingStatus = localStorage.getItem("cookingStatus " + foodId);
    if (cookingStatus === "true"){

        // Adds the href link to the html
        document.getElementById("add_to_dish_button_div").innerHTML = `
            <a href="dish.html" target="_self"><button id="add_to_dish_button" 
            type="button" class="btn">+ Add <span id="add_to_dish_button_span" 
            aria-hidden="true"></span> to Dish</button></a>
        `;

        // Sets the status of the ingredient, whether it's added to a dish or not
        localStorage.setItem(foodId, "addedToDish");

        // Calls the function again so that the User navigates to the dish.html page
        document.getElementById("add_to_dish_button").click();

    } else { 
        alert("Don't forget to checkout the cooking methods");
    }
}

// CREATE "STRING"
function addKeysValuesToLocalStorageObject() {
    addToLocalStorageObject(productName, "foodId", foodId);
    addToLocalStorageObject(productName, "weightPerServing", weightPerServing);
    addToLocalStorageObject(productName, "caloriesPerServing", caloriesPerServing);
    addToLocalStorageObject(productName, "piecesPerServing", piecesPerServing);
    addToLocalStorageObject(productName, "weightPerPiece", weightPerPiece);
    addToLocalStorageObject(productName, "batchWeight", batchWeight);
    addToLocalStorageObject(productName, "quantityPerBatch", quantityPerBatch);
}

let foodDetails = [];
let addToLocalStorageObject = function (name, key, value) {

	// Get the existing data
	let existing = localStorage.getItem(name);

	// If no existing data, create an array
	// Otherwise, convert the localStorage string to an array
	existing = existing ? JSON.parse(existing) : {};

	// Add new data to localStorage Array
	existing[key] = value;

	// Save back to localStorage
	localStorage.setItem(name, JSON.stringify(existing));
    foodDetails.push(name, existing);
    console.log(name, existing);
    console.log(foodDetails);
};