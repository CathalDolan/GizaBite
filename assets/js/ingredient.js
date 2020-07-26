var foodId = document.location.search.replace(/^.*?\=/,'');

$(document).ready(function(){

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
            //  list.innerHTML = "";

        response = await fetch(url),
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
                //console.log("Line 63", ingredientList);
                ingredientList = '<ul>' + ingredientList + '</ul>'; // Adds <ul> to the existing <li> html 
                
                ingredientListId.innerHTML = `${ingredientList}`;
                //console.log(ingredientList);
                }
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
        
}); // All doc.ready function inside here

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
    }
}

// Get Weight Per Serving input value and save to local storage
var weightPerServingLs = localStorage.getItem('weightPerServing' + foodId, weightPerServing);
// Get default weight value
var weightPerServingVal = weightPerServing = document.getElementById('weight_per_serving_input').value;

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
    } else {
        weightPerServing = document.getElementById('weight_per_serving_input').value = weightPerServingLs;
    }
}
weightPerServingFn();
// Called when User changes number of piece per serving and/or weight per piece
var weightPerServingCalcFn = function () {
    weightPerServing = weightPerPiece * piecesPerServing;
    document.getElementById('weight_per_serving_input').value = weightPerServing;
    localStorage.setItem("weightPerServing" + foodId, weightPerServing);
}


// Get Weight Per Piece input value and save to local storage
var weightPerPieceLs = localStorage.getItem('weightPerPiece' + foodId, weightPerPiece);
console.log("weightPerPieceLs", weightPerPieceLs);
// Get default Weight Per Piece value
var weightPerPieceVal = weightPerPiece = document.getElementById('weight_per_piece_input').value;
console.log("weightPerPieceVal", weightPerPieceVal);

var weightPerPiece;
// Called when User types into the input field
var weightPerPieceManFn = function () {
    weightPerPiece = document.getElementById('weight_per_piece_input').value;
    localStorage.setItem("weightPerPiece" + foodId, weightPerPiece);
}
// Called automatically to extract the Value from local storage
var weightPerPieceFn = function (){
    if (weightPerPieceLs === null){
        weightPerPiece = document.getElementById('weight_per_piece_input').value = weightPerPiece;
        localStorage.setItem("weightPerPiece" + foodId, weightPerPiece);
    } else {
        weightPerPiece = document.getElementById('weight_per_piece_input').value = weightPerPieceLs;
    }
}
weightPerPieceFn();
console.log('weightPerPiece' + foodId, weightPerPiece);


// Get number of Pieces Per Serving input value and save to local storage
var piecesPerServingLs = localStorage.getItem('piecesPerServing' + foodId, piecesPerServing);
console.log("piecesPerServingLs", piecesPerServingLs);
// Get default pieces per Serving value
var piecesPerServingVal = piecesPerServing = document.getElementById('pieces_per_serving_input').value;
console.log("piecesPerServingVal", piecesPerServingVal);

var piecesPerServing;
// Called when User types into the input field
var piecesPerServingManFn = function () {
    piecesPerServing = document.getElementById('pieces_per_serving_input').value;
    localStorage.setItem("piecesPerServing" + foodId, piecesPerServing);
}
// Called automatically to extract the Value from local storage
var piecesPerServingFn = function (){
    if (piecesPerServingLs === null){
        piecesPerServing = document.getElementById('pieces_per_serving_input').value = piecesPerServing;
        console.log("piecesPerServing", piecesPerServing);
        localStorage.setItem("piecesPerServing" + foodId, piecesPerServing);
        
    } else {
        piecesPerServing = document.getElementById('pieces_per_serving_input').value = piecesPerServingLs;
    }
}
piecesPerServingFn();
console.log('piecesPerServing' + foodId, piecesPerServing);

/*
console.log("weightPerPiece", weightPerPiece);
let weightPerPieceId = ("weightPerPiece" + foodId);
console.log("weightPerPieceId", weightPerPieceId);
let piecesPerServing = document.getElementById('pieces_per_serving_input').value;
console.log("piecesPerServing", piecesPerServing);

let weightPerServing = parseInt(weightPerPiece) * parseInt(piecesPerServing);
document.getElementById('weight_per_serving_input').value = weightPerServing;

// Called when user changes the Standard Serving or Pieces per serving inputs
var calculateIngredientPage = function () {

}





/* // Ingredients Page: "Servings g" Field Calculation
calculateIngredientPage = function () {

  let piecesPerServing = document.getElementById('pieces_per_serving_input').value;
  let weightPerServing = parseInt(weightPerPiece) * parseInt(piecesPerServing);
  document.getElementById('weight_per_serving_input').value = weightPerServing;
  //localStorage.setItem('weightPerPiece' + foodId, weightPerPiece);
  //localStorage.setItem('piecesPerServing' + foodId, piecesPerServing);
  //localStorage.setItem('weightPerServing' + foodId, weightPerServing);
};
calculateIngredientPage(); */
