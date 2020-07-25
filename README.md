# Contents

- [Github & Version Control](#github-&-version-control),
- [What is GizaBite?](#what-is-gizabite),
- [Website Style & Design](#website-style-&-design),
- [Third Party](#third-party),


# Github & Version Control
[Back to Contents](#contents),

## Github

Github is used as a code repository.

### Branches
Two branches were employed during development so as to help prevent the unintended over-writing of code
- dev_branch: Where work was carried out
- master branch: Where completed work was stored and from where the site us published.

## Pushes & Pulls
### Local
Each time a new piece of code was completed it was added to the repository:
- git add . / git add [file_name]
- git commit -m "Reason for commit"
- git push

### Github
Intermittently, the code was added to the master branch:
- git checkout master
- git merge dev_branch
- git push
- git push origin master --force: required on occassion
- Go to github and if there are conflicts resolve them
- git checkout dev_branch

### Experimental Code
On occassion when a new branch was required for experimental code, it was created from teh dev_branch:

- git checkout -b [new_branch_name]
- git push origin [new_branch_name]
- git push --set-upstream origin ingredient_page_update
- Delete a branch on your local filesystem : $ git branch -d [name_of_your_new_branch]
- To force the deletion of local branch on your filesystem : $ git branch -D [name_of_your_new_branch]
- Delete the branch on github : $ git push origin :[name_of_your_new_branch]

You can see all the branches created by using : $ git branch -a

Which will show :
* approval_messages
  master
  master_clean


# What is GizaBite?
[Back to Contents](#contents),

GizaBite is a website where chefs can compile dish recipes that automatically calculate the total number of calories and nutrients, 
and identify any allergen information in a dish.

## What Problem Does It Address?

Existing legislation requires food outlets to declare [allergen information](https://www.fsai.ie/legislation/food_legislation/food_information_fic/allergens.html) 
for each dish they serve. In addition, impending regulations will require food outlets to also display the number of calories in each dish.

This presents a challenge for cooks because the process of manually compiling nutritional data is time consuming and can be confusing. 
Although much of the required information for individual foods is readily available on Google and sites like www.myfitnesspal.com, 
they don’t provide a way to compile a recipe. This means significant manual input is still required by the User to calculate total values 
as they must be added together one by one.

The Food Safety Authority of Ireland have gone some way to addressing this issue by developing a website, [https://menucal.fsai.ie/](https://menucal.fsai.ie/). 
While it allows its Users to create specific dishes, it has some significant shortcomings:
- It is cumbersome to use, offering a poor user experience It is very limited with regards to cooking methods, an area that can significantly 
impact nutritional values. This is also true of the other sites mentioned

## What Solution Does GizaBite Offer?

It allows chefs to efficiently create dish recipes and calculate their nutritional values. This is achieved by providing a comprehensive library 
of ingredients, along with functionality that automatically calculates a dish’s nutritional values. Crucially, this calculation also includes the 
cooking processes involved in preparing the dish.

## Data Sources API

Individual food data is provided by [https://developer.edamam.com/food-database-api](https://developer.edamam.com/food-database-api).



# How it Works
[Back to Contents](#contents),

## Introduction
To calculate the nutritional values of a dish we need to know what’s in it. So we need to create a recipe, i.e. a list of all the ingredients 
in the dish. We’ve already established that it is easy to find nutritional values for individual foods. Therefore, once we have the recipe, 
calculating the total calories and nutrients in the completed dish is straight forward. The same is also true for identifying whether it 
contains any allergens, and if so, highlighting what they are. 

## Creating a Recipe
Traditionally a recipe is a simple list containing all of the ingredients in a dish. Think about how recipes are usually displayed in cookbooks 
or consider the common pub lunch “Fish & Chips”. It might look like this:

### Ingredients:
- Cod
- Flour
- Eggs
- Water
- Potatoes
- Canned Mushy Peas

### Cooking Methods:
- Deep fry the fish
- Deep fry the potatoes
- Boil the peas

However, preparing it is not that simple. Although everything is presented as a single dish on the plate and in the recipe, during preparation 
different ingredients need to be grouped and cooked separately; We have to batter and deep fry the fish, separately deep fry the potatoes to make 
the chips, and boil the canned mushy peas. What we’re actually doing is breaking the dish into 3 component parts:

- Battered Fish
- Chips
- Mushy Peas 

## Dish Components (“Portions”)
Interestingly, not only is each component a stand-alone dish in its own right, usually sold as a side or a portion, each can be included in other 
dishes, e.g. “chicken & chips” or “Leg of Lamb with Mushy Peas”. Even the batter on the fish is a stand-alone product that can be used in other 
dishes such as battered sausages or to make pancakes. This highlights a significant inefficiency with the traditional recipe format: Cooks need 
to continuously repeat themselves in order to achieve the same result. For example, if I prepare three recipes that require batter, I must list 
flour, eggs and water, and include them individually in the nutritional calculation three different times.

GizaBite will eradicate this inefficiency by providing a comprehensive library of traditional ingredients for cooks to call upon. Crucially however, 
they will also have access to a library of pre-compiled “Portion” ingredients, each of which includes the cooking methods data. So, in the case of 
the “Fish & Chips”, rather than having to list each individual ingredient, the cook need only add the three components mentioned previously:

- Battered Fish
- Chips
- Mushy Peas

## So, what is an “Ingredient”?

Are chips really an ingredient? When they form part of a larger dish, the answer is yes! They’re just a bit more complex as an ingredient than the 
potatoes they are made from. With this in mind we have two ingredient categories:

- **Base Ingredients** (referred to as Ingredients): These are ingredients that haven't had anything else added and for the most part haven’t been processed by the cook. They are 
“as delivered”. In other words, they are as per the state they were received in. This means that in most cases they need to be combined with other 
ingredients and/or processed further in order to make them saleable.

In general this equates to raw ingredients such as carrots or potatoes. However, they can also be pre-processed products such as gravy granules, 
pre-packed “BBQ chicken wings”, or even a sliced loaf of bread. Once the chef doesn’t add any other ingredients to it, it remains a “Base Ingredient”. 

- **Portions**: These are what were referred to previously as “components”. They are more complex than base ingredients as they usually require the 
combining of several ingredients. With a few exceptions (batter mix for example), they also include the cooking process. 

Portion ingredients are generally prepared in-house by the chef and in general are saleable on their own, usually being displayed as an extra portion 
or as a “side” on a menu, hence the name “Sides” Ingredients. 

## How does this Help?
Having a library of base and “sides” ingredients available dramatically speeds up the process of creating a recipe. Think of it as jQuery or
Bootstrap for chefs. As mentioned previously in the “fish and chips” example, rather than a chef having to add each individual ingredient to the recipe, 
they need only add three: Battered Cod, Chips and Mushy Peas. However, they are still provided with a complete recipe (that includes all nutritional 
information) and it’s presented in a much more structured format. 





# Website Style & Design
[Back to Contents](#contents),

The website style is that of a contemporary rustic feel.

## Colours

### Primary Colours
Created through the use of two strong complimentary and contrasting colours, dark greys and orange.
White is also employed.
- Grey: Varying degrees of grey are employed as backgrounds layered on top of each other to provide subtleyty and depth.
- Orange: Employed on page rules and to indicate that an element is interactive. With teh exception of rules, anything orange can be clicked.
- White: Used predominetly for text. It is also employed where a section needs to stand out from the background.

### Tertiary Colours
Three additional colours were required to highlight Dish, Portion and Ingredient Pages. 
Inspirtation was taken from https://www.homedit.com/colors-that-go-with-orange/stosa-cucine-dark-backsplash-with-open-orange-shelves/
- Ingredients: Green
- Portions: Yellow
- Dishes: Red

## Images
Copyright free images were taken from https://www.pexels.com/. They are employed to give colour to the pages, being displayed in the header as a hero image. 
Informational pages were given a larger image as the aesthetics need to be more pleasing. Functional pages have a small hero image.
- Index: https://www.pexels.com/photo/grilled-salmon-fish-on-rectangular-black-ceramic-plate-842142/
- Search: https://www.pexels.com/photo/sliced-fried-chicken-2232433/
- Dish: https://www.pexels.com/photo/pasta-noodles-tomato-sauce-spirelli-14737/
- New Dish: https://www.pexels.com/photo/cooked-food-1998920/
- Portion: https://www.pexels.com/photo/cheeseburger-and-fries-2725744/
- New Portion: https://www.pexels.com/photo/close-up-photo-of-french-fries-4109234/
- Ingredient: https://www.pexels.com/photo/sliced-fried-chicken-2232433/
- About: https://www.pexels.com/photo/food-chicken-fresh-rice-105588/
- Contact:https://www.pexels.com/photo/assorted-variety-of-foods-on-plates-on-dining-table-1528013/


# Third Party
[Back to Contents](#contents),

## Code
Accordion - https://www.w3schools.com/bootstrap4/bootstrap_collapse.asp
Buttons - https://getbootstrap.com/docs/4.0/components/buttons/
API Packaged Products Ingredieints Lists - https://gomakethings.com/two-different-ways-to-create-html-from-an-array-of-data-with-vanilla-js/  &  https://codepen.io/cferdinandi/pen/mYmbgL
Capitalise Results in "Search" capitalized_product_name - Solution from "I'm a little teapot" in https://stackoverflow.com/questions/32589197/how-to-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript/45620677#45620677" 
Search: Trigger with button click or return key - https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_trigger_button_enter
Ingredient Page: Checkbox trigger https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
Ingredient Page: Accessing teh foodId from the URL https://www.youtube.com/watch?v=SHLI2rvmJdc &  https://www.youtube.com/watch?v=GNZg1KRsWuU