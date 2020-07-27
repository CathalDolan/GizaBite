//--- Weight Per Piece: Get from local storage if available
var weightPerServingLs = localStorage.getItem('weightPerServing' + foodId);
console.log("weightPerServingLs", weightPerServingLs);

var weightPerServing;

// Called when User types into the input field
var weightPerServingManFn = function () {
    weightPerServing = document.getElementById('ingredient_serving_weight_input').value;
    localStorage.setItem("weightPerServing" + foodId, weightPerServing);
}