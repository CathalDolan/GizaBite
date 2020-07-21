/*--- Search Functionality ---*/
let app_id = "1234dec7",
    app_key = "634dea9e2c3835579ba9232e741217fc",
    edamamURL = "https://api.edamam.com/api/food-database/v2/parser";

async function searchAPI(){
    let searchTerm = document.getElementById('search_widget_input').value;
    await searchIngredients(searchTerm);
}

async function searchIngredients(searchTerm) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${searchTerm}&app_id=${app_id}&app_key=${app_key}&category=generic-foods&category=packaged-foods&categoryLabel=food`;
    // Clears the results list for every new search
    let list = document.getElementById("ingredient_results");
    list.innerHTML = "";

    
    let response = await fetch(url), // "await" is linked to "async" and is a better option than "promises". It prevents the next event from happening until the current one completes
        recipes = await response.json();
        console.log("Ingredients", recipes);
        console.log(typeof recipes);
        console.log(Object.keys(recipes.hints).length);

    // To list out product information
    recipes.hints.filter((item) => {
        if(item.food.category === "Generic foods" || item.food.category === "Packaged foods"){
        let product_name = ('"' + item.food.brand + '"' + ' - ' + item.food.label).toLowerCase();
        console.log(product_name);
        }  
    })

    // Returns the contents food label (ingredients) as a string and excludes any products that don't have them (are "undefined")
    recipes.hints.filter((item) => {
        if(item.food.category === "Generic foods" || item.food.category === "Packaged foods"){
            if ('undefined' !== typeof item.food.foodContentsLabel)
            console.log(item.food.foodContentsLabel); //Lists out ingredient contents in a string
        }
    })

    // Injects the contents food labels (ingredients) into the DOM, creating an unordered list in html
    recipes.hints.filter((item) => {
        if(item.food.category === "Generic foods" || item.food.category === "Packaged foods"){
            if ('undefined' !== typeof item.food.foodContentsLabel){
                let foodContentsLabels = item.food.foodContentsLabel;
                console.log(foodContentsLabels);

                var res = foodContentsLabels.split(";"); // Converts the string to an array
                console.log(res);

                var html = '';
                res.forEach(function (res) {
                    html += '<li>' + res + '</li>'; // Pushes each result into the empty html string
                })
                
                html = '<ul>' + html + '</ul>'; // Adds <ul> to the existing <li> html 
                console.log(html);
                //document.querySelector('target').innerHTML = html;
            }
             
        }
    })

    //To calculate the number of results
    let resultNames = [];
    recipes.hints.filter((item) => {
        if(item.food.category === "Generic foods" || item.food.category === "Packaged foods"){
        resultNames.unshift(item.food.label);
        }  
    })
    console.log(resultNames.length); // Used to display "Number of Results" on frontend

    // To list out and concatenate the product brands and names
    recipes.hints.filter((item) => {
        if(item.food.category === "Generic foods" || item.food.category === "Packaged foods"){
        let product_name = ('"' + item.food.brand + '"' + ' - ' + item.food.label).toLowerCase();
        console.log(product_name);
        console.log(item.food.label);
        }  
    })

    // Return serving size (for "Portion g" fields) - Not working
    recipes.hints.filter((item) => {
        if(item.measures.label === "Serving"){
        console.log(item.measures.label);
        }  
    })
    // Return per piece size (for "Weight per Piece" fields) - Not working
    recipes.hints.filter((item) => {
        if(item.measures.label === "Piece"){
        console.log(item.measures.label);
        }  
    })

}

// Make field appear when checkbox is ticked
var checkbox = document.querySelector("input[name=checkbox]"); // https://stackoverflow.com/questions/14544104/checkbox-check-event-listener

checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        document.getElementById("measure_weight_per_piece").style.display = "block";
        document.getElementById("pieces_per_serving_container").style.display = "block";
    } else {
        document.getElementById("measure_weight_per_piece").style.display = "none";
        document.getElementById("pieces_per_serving_container").style.display = "none";
    }
});

// Ingredients "Portion g" Field Calculation
