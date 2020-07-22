


/*--- Search Functionality ---*/

async function searchIngredients(searchTerm) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${searchTerm}&app_id=${app_id}&app_key=${app_key}&category=generic-foods&category=packaged-foods&categoryLabel=food`;
    // console.log(url);
    // Clears the results list for every new search
    let list = document.getElementById("ingredient_results");
    list.innerHTML = "";

    //
    let response = await fetch(url), // "await" is linked to "async" and is a better option than "promises". It prevents the next event from happening until the current one completes
        recipes = await response.json();
        //console.log("Ingredients", recipes);
        //console.log(recipes.length);

    recipes.hints.filter((item) => {
        if(item.food.category === "Generic foods" || item.food.category === "Packaged foods"){
        let product_name = ('"' + item.food.brand + '"' + ' - ' + item.food.label).toLowerCase();
        //console.log(product_name);// Used to show comparisson to console.log(capitalized_product_name(product_name)); below
            
            // API returns a variety of cases. This and toLowerCase above are used to capitalise 1st letter of each word
            let capitalized_product_name = (product_name) => { /* Solution from "I'm a little teapot" in https://stackoverflow.com/questions/32589197/how-to-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript/45620677#45620677" */
            let arr = product_name.split(' ');
            arr.forEach(function(i, index) {
                arr[index] = i.replace(i[0], i[0].toUpperCase());
            });
            return arr.join(' ');
        };
        //console.log(capitalized_product_name(product_name)); // Returns some results then falters due maybe to toUpperCase, why?

        // Publishes the results to the Ingredients section
        list.innerHTML += `
        <div class="results_row section_in results_list">
            <h4 class="alignL results_row_name">${capitalized_product_name(product_name)}</h4>
            <div class="row_icon_container plus_icon pointer alignR">
            </div>
        </div>`;
    }
    })
}

async function searchPortions(searchTerm) {
    let url = `${edamamURL}?nutrition-type=logging&ingr=${searchTerm}&app_id=${app_id}&app_key=${app_key}&category=generic-meals&categoryLabel=meal`;
    let list = document.getElementById("portion_results");
    list.innerHTML = "";

    let response = await fetch(url),
        recipes = await response.json();
        //console.log("Portions", recipes);

    recipes.hints.filter((item) => {
        if(item.food.category === "Generic meals"){
            let product_name = (item.food.label).toLowerCase();
                let capitalized_product_name = (product_name) => {
                let arr = product_name.split(' ');
                arr.forEach(function(i, index) {
                    arr[index] = i.replace(i[0], i[0].toUpperCase());
                });
                return arr.join(' ');
            }
        };
        // console.log(capitalized_product_name(product_name)); 

        list.innerHTML += `
        <div class="results_row section_in">
            <div class="row_icon_container eye_icon pointer alignL" data-toggle="tooltip" data-placement="top" data-html="true" title="whats here">
            </div>
            <h4 class="alignL results_row_name pointer">${capitalized_product_name(product_name)}</h4>
            <div class="row_icon_container plus_icon pointer alignR">
            </div>
        </div>`;
    })
};