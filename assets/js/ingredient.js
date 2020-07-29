var foodId = document.location.search.replace(/^.*?\=/,'');

// Add href to add icon to bring user to portion page
var addIngredient = document.getElementById("add_ingredient_icon");
console.log(addIngredient);
addIngredient.outerHTML = `
    <a href="new_portion.html?foodId=${foodId}" target="_self">
        <div id="add_ingredient_icon" class="row_icon_container plus_icon pointer alignR floatR">
        </div>
    </a>    
`;

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
        ingredientNameId = document.getElementById("ingredient_product_name"); // Takes the tag with id inside as outer, and everything in it
        ingredientListId = document.getElementById("ingredients_ingredients_list");

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

        if (item.food.category === "Packaged foods") {
        product_name = ('"' + capitalized_product_name(item.food.brand) + '"' + ' - ' + capitalized_product_name(item.food.label)); //Search Page:  To list out and concatenate the product brands and names, and convert to lower case
        } else if (item.food.category === "Generic foods") {
        product_name = capitalized_product_name(item.food.label);
        } else {
        return;
        }

        // Displays product name on the Ingredient Page
        ingredientNameId.innerHTML = `${product_name}`;
        //console.log(product_name);

        var ingredientList = '';

        //Extracts and then injects the contents food labels (ingredients) into the DOM, creating an unordered html list
        if ('undefined' !== typeof item.food.foodContentsLabel) { // Excludes "undefined" items, ie items that don't have ingredients
        let foodContentsLabels = item.food.foodContentsLabel; // Food's ingredients listed in a string
        //console.log(foodContentsLabels);
        let foodContentsLabelsArray = foodContentsLabels.split(";"); // Food's ingredients list string converted to an array
        //console.log(foodContentsLabelsArray);
        if (foodContentsLabelsArray.length > 1) { // Excludes products where there was only one ingredient. Not quite correct, should only eliminate single words maybe.
            foodContentsLabelsArray.forEach(function (foodContentsLabelsArrayLooped) {
            ingredientList += '<li class="ingredient_ingredient"> - ' + foodContentsLabelsArrayLooped + '</li>';
            })
            ingredientList = '<ul>' + ingredientList + '</ul>'; // Adds <ul> to the existing <li> html 
            
            ingredientListId.innerHTML = `${ingredientList}`;
            }
        }

        // Extract calories from API
        kcalPer100g = item.food.nutrients.ENERC_KCAL;
        console.log(product_name, "kcalPer100g", kcalPer100g);
        localStorage.setItem("kcalPer100g" + foodId, kcalPer100g)

        // Extract Measurements from API
        let measure = item.measures;
        let label;
        let weight;
        let servingWeight;
        let pieceWeight;
        let wholeWeight;
        let defaultWeight = 123;

        for(let i=0; i<measure.length; i++){
            label = (measure[i].label);
            weight =(measure[i].weight);
            if (label === "Piece"){
                pieceWeight = Math.round(weight);
            }
        }
        for(let i=0; i<measure.length; i++){
            label = (measure[i].label);
            weight =(measure[i].weight);
            if (label === "Serving"){
                servingWeight = Math.round(weight);
            }
        }
        for(let i=0; i<measure.length; i++){
            label = (measure[i].label);
            weight =(measure[i].weight);
            if (label === "Whole"){
                wholeWeight = Math.round(weight);
            }
        }

        //--- Serving Weight: Set in local storage and on html
        if (servingWeight !== undefined) {//If serving weight is defined, use it.
            localStorage.setItem("APIweightPerServing" + foodId, servingWeight);
            document.getElementById("weight_per_serving_input").value = servingWeight;
        } else if (pieceWeight !== undefined) { //If serving weight is not defined, use weight per piece
            localStorage.setItem("APIweightPerServing" + foodId, pieceWeight);
            document.getElementById("weight_per_serving_input").value = pieceWeight;
        } else if (wholeWeight !== undefined) { //If serving weight and weight per piece are not defined, use whole weight
            localStorage.setItem("APIweightPerServing" + foodId, wholeWeight);
            document.getElementById("weight_per_serving_input").value = wholeWeight;
        } else { //If none are defined, use default weight
            localStorage.setItem("APIweightPerServing" + foodId, defaultWeight);
            document.getElementById("weight_per_serving_input").value = defaultWeight;
        }

        //--- Weight Per Piece: Set in local storage and on html
        if (pieceWeight !== undefined) {   //If weight per piece is defined, use it.
            localStorage.setItem("APIweightPerPiece" + foodId, pieceWeight);
            document.getElementById("weight_per_piece_input").value = pieceWeight;
        } else if (wholeWeight !== undefined) {   //If weight per piece is not defined, use whole weight.
            localStorage.setItem("APIweightPerPiece" + foodId, wholeWeight);
            document.getElementById("weight_per_piece_input").value = wholeWeight;
        } else if (servingWeight !== undefined) {   //If weight per piece and whole weight are not defined, use serving weight.
            localStorage.setItem("APIweightPerPiece" + foodId, servingWeight);
            document.getElementById("weight_per_piece_input").value = servingWeight;
        } else {   //If none are defined, use default weight
            localStorage.setItem("APIweightPerPiece" + foodId, defaultWeight);
            document.getElementById("weight_per_piece_input").value = defaultWeight;
        }

        // Pieces Per Serving: If the serving weight is greater than the weight per piece, 
        // the 1st is divided by the 2nd. Otherwise the default is 1. Simplifed solution.
        weightPerServingLs = localStorage.getItem("APIweightPerServing" + foodId);
        weightPerPieceLs = localStorage.getItem("APIweightPerPiece" + foodId);
        let piecesPerServing;
        if (weightPerServingLs >= weightPerPieceLs) {
            piecesPerServing = Math.round(weightPerServingLs / weightPerPieceLs);
            localStorage.setItem("APIpiecesPerServing" + foodId, piecesPerServing);
            document.getElementById("pieces_per_serving_input").value = piecesPerServing;
        } else {
            localStorage.setItem("APIpiecesPerServing" + foodId, 1);
            document.getElementById("pieces_per_serving_input").value = 1;
        }
    });

}; //Search is all contained in here

// Checks if checkbox was already checked and updates page accordingly. For returning to an ingredient.
var checkBoxStatus = localStorage.getItem(checkBoxStatusKey);
//console.log(checkBoxStatus)
if (checkBoxStatus == "true"){
    document.getElementById("measurement_checkbox").checked = true;
    checkBox();
}


// Make fields appear when servings checkbox is ticked
var checkBoxInput = document.querySelector("input[name=measurement_checkbox]");
var checkBoxStatusKey = 'ingredientCheckBox' + foodId;

// Additional fields displayed if checkbox is checked
function checkBox() {
    if (checkBoxInput.checked) {
        document.getElementById(measure_weight_per_piece).style.display = "block";
        document.getElementById(pieces_per_serving_container).style.display = "block";
        localStorage.setItem(checkBoxStatusKey, true);
    } else {
        document.getElementById(measure_weight_per_piece).style.display = "none";
        document.getElementById(pieces_per_serving_container).style.display = "none";
        localStorage.setItem(checkBoxStatusKey, false);

        document.getElementById('weight_per_serving_container').innerHTML = `
            <input id="weight_per_serving_input" type="number" inputmode="numeric" 
            pattern="[0-9]*" maxlength="7" class="input_weight_number" 
            name="total_amt" onkeyup="weightPerServingManFn()"/>
        `;
    }
}

// Get Weight Per Serving input value and save to local storage
var weightPerServingLs = localStorage.getItem('weightPerServing' + foodId, weightPerServing);

var weightPerServing;
// Called when User types into the input field
var weightPerServingManFn = function () {
    weightPerServing = document.getElementById('weight_per_serving_input').value;
    localStorage.setItem("weightPerServing" + foodId, weightPerServing);
}
// Called automatically to extract the Value from local storage
var weightPerServingFn = function (){
    if (weightPerServingLs === null){
        weightPerServing = document.getElementById('weight_per_serving_input').value = weightPerServing;
        localStorage.setItem("weightPerServing" + foodId, weightPerServing);
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
    localStorage.setItem("weightPerServing" + foodId, weightPerServing);
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
var weightPerPieceLs = localStorage.getItem('weightPerPiece' + foodId, weightPerPiece);
var weightPerPiece;

var weightPerPieceFn = function (){
    if (weightPerPieceLs === null){ // Checks for no value in Local Storage, then
        weightPerPiece = document.getElementById('weight_per_piece_input').value; // Extracts the default value from the html
        localStorage.setItem("weightPerPiece" + foodId, weightPerPiece); // Adds the default value to local storage
    } else {
        weightPerPiece = weightPerPieceLs; // If there is a value in local storage...
    }
}
//weightPerPieceFn();

// Called when User types into the Weight Per Piece field input
var weightPerPieceManFn = function () {
    weightPerPiece = document.getElementById('weight_per_piece_input').value; // Extracts the value that the User types
    localStorage.setItem("weightPerPiece" + foodId, weightPerPiece); // Adds this value to Local Storage
}


//--- Pieces Per Serving: Get from local storage if available
var piecesPerServingLs = localStorage.getItem('piecesPerServing' + foodId, piecesPerServing);


var piecesPerServing;
// Called automatically to extract the Value from local storage
var piecesPerServingFn = function (){
    if (piecesPerServingLs === null){
        piecesPerServing = document.getElementById('pieces_per_serving_input').value;
        localStorage.setItem("piecesPerServing" + foodId, piecesPerServing);
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
    localStorage.setItem("piecesPerServing" + foodId, piecesPerServing);
}

