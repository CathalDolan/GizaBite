$(document).ready(function(){
    foodId = document.location.search.replace(/^.*?\=/,'');
    //console.log(foodId);
    
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

            // Displays product name on the Ingredient Page
            ingredientNameId.innerHTML = `${product_name}`;
            console.log(product_name);

            var ingredientList = '';

            //Extracts and then injects the contents food labels (ingredients) into the DOM, creating an unordered html list
            if ('undefined' !== typeof item.food.foodContentsLabel) { // Excludes "undefined" items, ie items that don't have ingredients
            let foodContentsLabels = item.food.foodContentsLabel; // Food's ingredients listed in a string
            console.log(foodContentsLabels);
            let foodContentsLabelsArray = foodContentsLabels.split(";"); // Food's ingredients list string converted to an array
            console.log(foodContentsLabelsArray);
            if (foodContentsLabelsArray.length > 1) { // Excludes products where there was only one ingredient. Not quite correct, should only eliminate single words maybe.
                foodContentsLabelsArray.forEach(function (foodContentsLabelsArrayLooped) {
                ingredientList += '<li class="ingredient_ingredient"> - ' + foodContentsLabelsArrayLooped + '</li>';
                })
                console.log("Line 63", ingredientList);
                ingredientList = '<ul>' + ingredientList + '</ul>'; // Adds <ul> to the existing <li> html 
                
                ingredientListId.innerHTML = `${ingredientList}`;
                console.log(ingredientList);
                }
            }
    });


    }; //Search is all conrained in here


});