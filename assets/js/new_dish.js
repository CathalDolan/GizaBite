let foodId;
let weightPerServing;
let weightPerPiece;
let caloriesPer100g;
let caloriesPerServing;
let piecesPerServing;
let batchWeight;
let quantityPerBatch;
let weightPerWhole;
let numberOfServings;

foodId = localStorage.getItem("foodId " + foodId);
weightPerServing = localStorage.getItem("weightPerServing " + foodId);
weightPerPiece = localStorage.getItem("weightPerPiece " + foodId);
caloriesPer100g = localStorage.getItem("caloriesPer100g " + foodId);
caloriesPerServing = localStorage.getItem("caloriesPerServing " + foodId);
piecesPerServing = localStorage.getItem("piecesPerServing " + foodId);
batchWeight = localStorage.getItem("batchWeight " + foodId);
quantityPerBatch = localStorage.getItem("quantityPerBatch " + foodId);
weightPerWhole = localStorage.getItem("weightPerWhole " + foodId);
numberOfServings = localStorage.getItem("numberOfServings " + foodId);

let localStorageKey;
let localStorageValue;

for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    localStorageKey = localStorage.key(i);
    localStorageValue = localStorage.getItem( localStorage.key(i));
    console.log(localStorageKey + ":", localStorageValue); // Prints the last one in the loop
    if (localStorageKey == "addToFoodDish " + foodId && localStorageValue == true){
        console.log(localStorageKey + ":", localStorageValue); // Prints the last one in the loop
        break;
        
    }
}
console.log(localStorageKey + ":", localStorageValue); // Prints the last one in the loop

function allStorage() {

    var archive = {}, // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        archive[ keys[i] ] = localStorage.getItem( keys[i] );
    }

    console.log(archive);
}
allStorage();


/**
 * Add an item to a localStorage() object
 * @param {String} name  The localStorage() key
 * @param {String} key   The localStorage() value object key
 * @param {String} value The localStorage() value object value
 */
let foodDetails = [];
var addToLocalStorageObject = function (name, key, value) {

	// Get the existing data
	var existing = localStorage.getItem(name);

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