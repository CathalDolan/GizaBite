var ingredientCheckBox = localStorage.getItem('ingredientCheckBox');
//var list = document.getElementById(ingredient_batch_qty_div);

if (ingredientCheckBox === "false"){
        document.getElementById("ingredient_batch_qty_div").style.display = "none";
        console.log("false");
    } else {
        document.getElementById("ingredient_batch_qty_div").style.display = "block";
        console.log("true");
    }
console.log(ingredientCheckBox);

/*
// Portions Page: Ingredients section calculations - Untested
// The fields should all be autocompleted based on Ingredients page and default data
calculate = function (){
    let numberOfServings = getElementById("number_of_servings_input").value;
    // Only takes affect if User changes Batch Quantity in Portions. Changes on Ingredients page
    let piecesPerServing = getElementById('ingredient_batch_quantity_input').value / getElementById("number_of_servings_input").value;
    document.getElementById('measure_weight_per_piece_input').value = parseInt(piecesPerServing);
    // Only displays if "by the piece" is checked on ingredient page
    let batchQuantity = getElementById("number_of_servings_input").value * getElementById("pieces_per_serving_input").value; // Latter is from Ingredient page
    document.getElementById('ingredient_batch_quantity_input').value = parseInt(batchQuantity);
    // Calculates total amount of ingredient needed for a batch
    let batchWeight = getElementById("number_of_servings_input").value * ingredientServingWeight;
    document.getElementById('ingredient_batch_weight_input').value = parseInt(batchWeight);
    // Gets the value from the Ingredient page 
    let ingredientServingWeight = getElementById("weight_per_serving_input").value; 
    document.getElementById('ingredient_serving_weight_input').value = ingredientServingWeight;
    // If the User changes the Batch Weight in Portions, per serving weight updates in Ingredients
    let ingredientServingWeightChange = batchWeight / numberOfServings;
    document.getElementById('measure_weight_per_piece_input').value = parseInt(ingredientServingWeightChange);
    // If the User changes the Serving Weight in Portions, per serving weight updates in Ingredients
    let ingredientServingWeightChange2 = batchWeight / numberOfServings;
    document.getElementById('measure_weight_per_piece_input').value = parseInt(ingredientServingWeightChange2);
    // Value is supplied by API, details tbc
    let kcal= tbc;
    document.getElementById('ingredient_kcal_value').text = parseInt(kcal);
    // Total serving weight
    let servingTotalWeight = "sum of all ingredientServingWeight"; 
    document.getElementById('total_serving_weight').text = parseInt(servingTotalWeight); 
    // Total serving kcal
    let servingTotalKcal = "sum of all kcal"; 
    document.getElementById('total_serving_kcal').text = parseInt(servingTotalKcal);
} */