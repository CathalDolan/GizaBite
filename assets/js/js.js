$(document).ready(function(){
    console.log("Hello World!");
});


/*--- Search Functionality ---*/
let app_id = "1234dec7",
    app_key = "634dea9e2c3835579ba9232e741217fc",
    edamamURL = "https://api.edamam.com/api/food-database/v2/parser";

async function searchAPI(){
    let searchTerm = document.getElementById('search_widget_input').value;
    await searchIngredients(searchTerm);
    await searchPortions(searchTerm);
}

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






/*--- Tooltip Funcion ---*/
$(function(){
    $('[data-toggle="tooltip"]').tooltip();
});


/*--- Change Brick Colours. Not correct ---*/
$(".brick").on("click", function() {
    $(this).css("background", "orange");
})
$(".brick>p").on("click", function() {
    $(this).css("color", "white");
})


/* Back Button function. Take from w3schools.*/
function goBack() { 
  window.history.back();
}


/* Funtion to allow the "Advance" section in Search expand and collape upwards */
$(".header").click(function() {
  $('.content1').slideToggle().toggleClass('active');
  if ($('.content1').hasClass('active')) {
    $('.header').text('Close Advanced');
  } else {
    $('.header').text('Advanced');
  }
});


/* Funtion to allow the text wrap within a textarea input. From SpyYk3 http://jsfiddle.net/SpYk3/m8Qk9/ */
$(function() {
    //  changes mouse cursor when highlighting lower right of box
    $(document).on('mousemove', 'textarea', function(e) {
		var a = $(this).offset().top + $(this).outerHeight() - 16,	//	top border of bottom-right-corner-box area
			b = $(this).offset().left + $(this).outerWidth() - 16;	//	left border of bottom-right-corner-box area
		$(this).css({
			cursor: e.pageY > a && e.pageX > b ? 'nw-resize' : ''
		});
	})
    //  the following simple make the textbox "Auto-Expand" as it is typed in
    .on('keyup', 'textarea', function(e) {
        //  the following will help the text expand as typing takes place
        while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
            $(this).height($(this).height()+1);
        };
    });
});