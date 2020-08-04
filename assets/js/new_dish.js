//Extracts all of the data from Local Storage as a string
let xyz = JSON.stringify(localStorage);
// Converts that string to an object
let obj = JSON.parse(xyz);

let totalCaloriesArray = [];
let totalServingWeightArray = [];

// Loop through the object: Purpose is find ingredients added to the dish
for (const [key, value] of Object.entries(obj)) {
    //console.log(`${key}: ${value}`);
    // Filter to leave addedToDish ingredients
    if (`${value}` == ("addedToDish")){
        let foodId = `${key}`;
        let numberOfServings = parseInt(localStorage.getItem("numberOfServings " + foodId));
        let caloriesPerServing = parseInt(localStorage.getItem("caloriesPerServing " + foodId));
        let weightPerServing = parseInt(localStorage.getItem("weightPerServing " + foodId));
        let batchWeight = parseInt(localStorage.getItem("batchWeightg " + foodId));
        let productName = localStorage.getItem("productName " + foodId);
        
        console.log("caloriesPerServing", caloriesPerServing);
        console.log("weightPerServing", weightPerServing);
        console.log("productName", productName);

        document.getElementById("description").innerHTML += `
        <h6 class floatL>${productName}</h6>
        <p class floatL>Calories Per Serving: ${caloriesPerServing}</p>
        <p class floatL>Weight Per Serving: ${weightPerServing}</p>
        `;

        //Adds the calorie value for each ingredient to the array
        totalCaloriesArray.push(caloriesPerServing);
        // Gets the sum of the numbers
        var totalCalories = totalCaloriesArray.reduce(function(a, b){
            return a + b;
        }, 0);
        console.log(totalCalories);

        //Adds the weight per serving value for each ingredient to the array
        totalServingWeightArray.push(weightPerServing);
        // Gets the sum of the numbers
        var totalServingWeight = totalServingWeightArray.reduce(function(a, b){
            return a + b;
        }, 0);
        console.log(totalServingWeight);
    }
}