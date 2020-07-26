var foodId = document.location.search.replace(/^.*?\=/,'');

$(document).ready(function(){

    /*
    // Add href to add icon to bring user to portion page
    var addIngredient = document.getElementById("add_ingredient_icon");
    console.log(addIngredient);
    addIngredient.outerHTML = `
        <a href="new_portion.html?foodId=${foodId} target="_self">
            <div id="add_ingredient_icon" class="row_icon_container plus_icon pointer alignR floatR">
            </div>
        </a>    
    `; */
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
           
            //Extracts number of calories from the API
            var kcal = parseInt(item.food.nutrients.ENERC_KCAL);
            console.log(kcal);
            document.getElementById("ingredient_kcal_value").innerHTML = kcal;

        });
    }; //Search is all contained in here

    // Servings Checkbox on Ingredients Page: Checks if it's ticked and if "true" Batch Qty displays.
    var checkBoxStatus = localStorage.getItem(checkBoxStatusKey);
    console.log(checkBoxStatus);
    if (checkBoxStatus == "true"){
        document.getElementById("ingredient_batch_qty_div").style.display = "block";
    } else {
        document.getElementById("ingredient_batch_qty_div").style.display = "none";
    } 
    
}); // Everything required on.ready behind here

// Make fields appear when Servings checkbox is ticked on Ingredients Page
var checkBoxStatusKey = 'ingredientCheckBox' + foodId;


// Number of Servings: Extracts the default value
var numberOfServings;
var numberOfServingsFn = function () {
    numberOfServings = document.getElementById("number_of_servings_input").value;
    console.log("numberOfServings", numberOfServings);
}
numberOfServingsFn();

// Weight Per Serving: Get value from local storage and input into html
let weightPerServingId = 'weightPerServing' + foodId; // Creates the name of the key
let weightPerServing = localStorage.getItem(weightPerServingId); // Extracts the Key value
console.log("weightPerServing", weightPerServing);
document.getElementById("ingredient_serving_weight_input").value = weightPerServing; // Inputs the value into the html input

// Weight Per Piece: Extract value from local storage for use in calculations
let weightPerPieceId = 'weightPerPiece' + foodId;
let weightPerPiece = localStorage.getItem(weightPerPieceId);
console.log("weightPerPiece", weightPerPiece);

// Pieces Per Serving: Extract value from local storage for use in calculations
let piecesPerServingId = 'piecesPerServing' + foodId;
let piecesPerServing = localStorage.getItem(piecesPerServingId);
console.log("piecesPerServing", piecesPerServing);

// Batch Quantity: 
var batchQuantity;
var batchQuantityFn = function () {
    batchQuantity = numberOfServings * piecesPerServing;
    console.log("batchQuantity", batchQuantity);
    document.getElementById("ingredient_batch_quantity_input").value = batchQuantity;
}
batchQuantityFn();

// Batch Weight:
var batchWeight;
var batchWeightFn = function () {
    batchWeight = numberOfServings * weightPerServing;
    console.log("batchWeight", batchWeight);
    document.getElementById("ingredient_batch_weight_input").value = batchWeight;
}
batchWeightFn();

/*
  let weightPerPieceId = ("weightPerPiece" + foodId);
  console.log(weightPerPieceId);

  let piecesPerServing = document.getElementById('pieces_per_serving_input').value;
  let weightPerServing = parseInt(weightPerPiece) * parseInt(piecesPerServing);
  document.getElementById('weight_per_serving_input').value = weightPerServing;
  localStorage.setItem('weightPerPiece' + foodId, weightPerPiece);
  localStorage.setItem('piecesPerServing' + foodId, piecesPerServing);
  localStorage.setItem('weightPerServing' + foodId, weightPerServing);
};


// Portions Page: Ingredients section calculation variables
// The fields should all be autocompleted based on Ingredients page and default data
//var numberOfServings;
//console.log("# of servings " + numberOfServings);

// Weight per piece. Conditional
//var weightPerPieceId = 'weightPerPiece' + foodId;
////console.log(weightPerPieceId);
//var weightPerPiece = localStorage.getItem(weightPerPieceId);
//console.log(weightPerPiece);

//var piecesPerServing = localStorage.getItem('piecesPerServing');
//console.log("Pieces per Serving" + piecesPerServing);

//var weightPerServing = localStorage.getItem('weightPerServing');
//console.log("Weight per Serving" + weightPerServing);

//var batchQuantity;


/*
// Portions Page: Ingredients section calculations
calculate = function (){
    numberOfServings = document.getElementById("number_of_servings_input").value;
    console.log("# of servings2 " + numberOfServings);

    // Batch Quantity: Only displays if "by the piece" is checked on ingredient page
    batchQuantity = numberOfServings * piecesPerServing;
    console.log("Batch Quantity " + batchQuantity);
    document.getElementById('ingredient_batch_quantity_input').value = batchQuantity;
   
    // Batch Weight: Calculates total amount of ingredient needed for a batch
    let batchWeight = numberOfServings * weightPerServing;
    console.log("Batch Weight " + batchWeight);
    document.getElementById('ingredient_batch_weight_input').value = batchWeight;
   
    // Ingredient Serving Weight: Gets the value from the Ingredient page 
    let ingredientServingWeight = weightPerServing; 
    console.log("Ingr Serving Weight " + ingredientServingWeight);
    document.getElementById('ingredient_serving_weight_input').value = ingredientServingWeight;
  
    // If the User changes the Batch Weight in Portions, per serving weight updates in Ingredients
    // let ingredientServingWeightChange = batchWeight / numberOfServings;
    //console.log(ingredientServingWeightChange);
    //document.getElementById('measure_weight_per_piece_input').value = parseInt(ingredientServingWeightChange);
 
    // If the User changes the Serving Weight in Portions, per serving weight updates in Ingredients
    //let ingredientServingWeightChange2 = batchWeight / numberOfServings;
    //console.log(ingredientServingWeightChange2);
    //document.getElementById('measure_weight_per_piece_input').value = parseInt(ingredientServingWeightChange2);
 
    // Value is supplied by API, details tbc
    //let kcal= tbc;
    //console.log(kcal);
    //document.getElementById('ingredient_kcal_value').text = parseInt(kcal);
  
    //Total serving weight
    //let servingTotalWeight = "sum of all ingredientServingWeight"; 
    //console.log(servingTotalWeight);
    //document.getElementById('total_serving_weight').text = parseInt(servingTotalWeight); 
  
    // Total serving kcal
   // let servingTotalKcal = "sum of all kcal"; 
   //console.log(servingTotalKcal);
   // document.getElementById('total_serving_kcal').text = parseInt(servingTotalKcal);
}

calculate(); */