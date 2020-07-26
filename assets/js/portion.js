// Show "Batch Qty" fields if measure is checked in ingredient
var ingredientCheckBox = localStorage.getItem('ingredientCheckBox');

if (ingredientCheckBox === "false"){
        document.getElementById("ingredient_batch_qty_div").style.display = "none";
    } else {
        document.getElementById("ingredient_batch_qty_div").style.display = "block";
    }

// Portions Page: Ingredients section calculations
// The fields should all be autocompleted based on Ingredients page and default data
var numberOfServings;
console.log("# of servings " + numberOfServings);
var weightPerPiece = localStorage.getItem('weightPerPiece');
console.log("Weight per Piece " + weightPerPiece);
var piecesPerServing = localStorage.getItem('piecesPerServing');
console.log("Pieces per Serving " + piecesPerServing);
var weightPerServing = localStorage.getItem('weightPerServing');
console.log("Weight per Serving " + weightPerServing);
var batchQuantity;

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

calculate();