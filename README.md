# GizaBite
- [Web](https://cathaldolan.github.io/GizaBite/index.html)
- [GitHub](https://github.com/CathalDolan/GizaBite)

## Background
GizaBite was created as my full stack web development course milestone two project. The site
is a scaled down version of a larger idea that includes greater functionality and provides additional UX
options for users, including creating a log in account and the ability to record personal preferences.

# Contents

- [What is GizaBite?](#what-is-gizabite)
- [How it Works](#how-it-works)
- [Site Contents](#site_contents)
- [Website Style & Design](#website-style-&-design)
- [Github & Version Control](#github-&-version-control)
- [Testing](#testing)
- [Third Party](#third-party)

# What is GizaBite?
[Back to Contents](#contents),

GizaBite is a website where chefs can compile recipes that automatically calculate the total number of calories in a dish.

## What Problem Does It Address?

Impending legislative regulations will require food outlets to display the number of calories in each dish on their menu. This presents 
a challenge for cooks because the process of manually compiling nutritional data is time consuming and can be confusing. 
Although much of the required information for individual foods is readily available on Google and sites like [www.myfitnesspal.com](www.myfitnesspal.com), 
they don’t provide a way to compile a recipe. This means significant manual input is still required by the User to calculate total values 
as they must be added together one by one.

The Food Safety Authority of Ireland have gone some way to addressing this issue by developing a website; [https://menucal.fsai.ie/](https://menucal.fsai.ie/). 
While it allows its Users to create specific dishes, it has some significant shortcomings:
- It is cumbersome to use, offering a poor user experience
- It is very limited with regards to cooking methods, an area that can significantly 
impact calorific values. This is also true of the other sites mentioned.

## What Solution Does GizaBite Offer?

It allows chefs to efficiently create dish recipes and calculate dish calories. This is achieved by providing access to a comprehensive library 
of ingredients*, along with functionality that automatically calculates a dish’s calorific values. Crucially, this calculation also includes the 
cooking processes involved in preparing the dish.

## *Data Sources API

Individual food data is provided by [https://developer.edamam.com/food-database-api](https://developer.edamam.com/food-database-api).


# How it Works
[Back to Contents](#contents),

## Introduction
To calculate the number of calories in a dish we need to know what’s in it. So we create a recipe, i.e. a list of all the ingredients 
in the dish along with any cooking methods. As the dish is being compiled, and of course when complete, the site diosplays a reunning calorie sum total.

## The Process
Compiling a dish involves repeatiung a 4-step process until the User is satisfied they have added all ingredients to their list.

- Input a search term into a search field and either click the search button or the "return" key
- Choose an ingredient from the list of Results
- Adjust default measurements if required and add cooking criteria
- Add to dish
- Repeat steps 1 to 4 until dish is complete

[**Video Demo**](https://youtu.be/Iai-qh7k4RY)

## Local Storage
In the absence of a database, local storage is employed by the site. It enables the user to set their own data 
and have it retained, as well as view product data on multiple pages.


# Website Style & Design
[Back to Contents](#contents)

The website style is that of a contemporary rustic "hipster" feel as currently found in many eateries.

## Colours

### Primary Colours
Created through the use of two strong complimentary and contrasting colours, dark greys and orange.
White is also employed.
- Grey: Varying degrees of grey are employed as backgrounds layered on top of each other to provide subtleyty and depth.
- Orange: Employed on page rules and to indicate that an element is interactive. With the exception of rules, anything orange can be clicked.
- White: Used predominetly for text. It is also employed where a section needs to stand out from the background.

### Tertiary Colour
An additional colour is required to highlight Dish Pages. 
Inspirtation was taken from [Homedit](https://www.homedit.com/colors-that-go-with-orange/stosa-cucine-dark-backsplash-with-open-orange-shelves/)
- Dish: Red

## Typography
Three GoogleFonts fonts are employed on the site:
- Body Text: [Lato](https://fonts.google.com/specimen/Lato?query=lato)
- Headings: [Roboto](https://fonts.google.com/specimen/Roboto)
- Hero Image: [Parisienne](https://fonts.google.com/specimen/Parisienne?query=parisie)

## Images
Copyright free images were taken from https://www.pexels.com/. They are employed to give colour to the pages, being displayed in the header as a hero image. 
Informational pages were given a larger image as the aesthetics need to be more pleasing. Functional pages have a small hero image.
- Index: https://www.pexels.com/photo/grilled-salmon-fish-on-rectangular-black-ceramic-plate-842142/
- Search: https://www.pexels.com/photo/sliced-fried-chicken-2232433/
- Dish: https://www.pexels.com/photo/close-up-photo-of-french-fries-4109234/
- Ingredient: https://www.pexels.com/photo/sliced-fried-chicken-2232433/
- Contact:https://www.pexels.com/photo/cheeseburger-and-fries-2725744/

## Responsiveness
The site is equally responsive on all devices from mobile to large screen desktop.


# Site Contents
[Back to Contents](#contents)
The site comprises of five pages:

## 1 - Index/Home Page
The page content is designed to speak to the site's target audience in a clear, easy to understand manner,
delivered concisely. It contains several calls to action and videos to engage the User and encourage them
to navigate further into the site. It curcially contains a "Search" option that makes the page interactive.

- **Wireframes**
    - [Mobile](https://imgur.com/j14UUp1)
    - [Desktop](https://imgur.com/FIMEETx)

## 2 - Search
The Search page is broken into two sections:

1 - The search widget with input field and button that allows the User to condust a search
2 - The result section that displays the results and allows the User to access their specifics

- **Wireframes**
    - [Mobile](https://imgur.com/VtVy3jx)
    - [Desktop](https://imgur.com/HjucYO7)

## 3 - Ingredients
Upon landing on the ingredient page for the first time, it will include all default measurements and data.
Users can manipulate this by altering any of the inputs. Altering one, can have an affect on others.

The page enables Users to manipulate the data based on whether an ingredient is sold by weight or by the piece.
Their choice dectates what fields are displayed and which can be manipulated by the User.

### Sold by Weight
This provides 4 fields:
- Number of Servings: Set to 10 by default
- Weight per Serving: As per API data
- Batch Weight: A multiplication of Number of Servings by Weight per Serving
- Calories per Serving: Calculated based on the serving weight.

- **Wireframes**
    - [Mobile](https://imgur.com/KBMI8fi)
    - [Desktop](https://imgur.com/YnoiQ0C)

### Sold by the Piece 
Checking the "Sold by the Piece" checkbox reveals additional fields:
- Pieces per Serving
- Weight per Piece
- Batch Quantity 

- **Wireframes**
    - [Mobile](https://imgur.com/8jWHR23)
    - [Desktop](https://imgur.com/bBoitVj)

### Cooking
The cooking method and substrate used to prepare a food can have a significant imapct of the number of
calories in a dish. With this in mind, a range of methods and substrates are provided, with the latter 
only being display if a related method is selected.

It should be noted that not all methods affect the calorific value, and some will affect it more than
others. However, this is equally dependant upon the substrate chosen.

- **Wireframes**
    - [Mobile](https://imgur.com/8jWHR23)
    - [Desktop](https://imgur.com/bBoitVj)

## 4 - Dish
The dish page is where each of the individual ingredients is listed, one beneath the other. It includes
the product name, serving weight and calories per serving. It also includes a running weight and calories
total for all ingredients added. Users are also encouraged to give their dish a name.

The page also includes two delete options: remove everything and start again or just remove a single
ingredient. 

- **Wireframes**
    - [Mobile](https://imgur.com/6omdPPh)
    - [Desktop](https://imgur.com/WwCEBt2)

## 5 - Contact
User are given multiple means by which to make contact via the Contact page:
- Email Form (powered by Formspree)
- Physical Address
- Email Address
- Phone Number
- Social Media Links

- **Wireframes**
    - [Mobile](https://imgur.com/G4proWZ)
    - [Desktop](https://imgur.com/ZIgdwK2)


# Github & Version Control
[Back to Contents](#contents)

## Github
The code was written in GitPod, with Github is used as a code repository.

### Branches
Two branches were employed during development so as to help prevent the unintended over-writing of code:
- dev_branch: Where work was carried out
- master: Where completed work was stored and from where the site us published.

## Pushes, Pulls & Deployment

Each time a new piece of code was completed it was added to the repository via the terminal:
- git add . / git add [file_name]
- git commit -m "Reason for commit"
- git push
- GitHub: 
    - Resolve conflicts (if any)
    - Merge dev_branch into master and deployment

On occassion the following is required to force a push:
- git push origin dev_branch --force: required on occassion


# Testing
[Back to Contents](#contents)
Although the intention was to use Test Driven Development with Jasmine to build the site, this was
abandoned early on due to lack of knowledge and difficulty implementing it. Therefore, the site
relied upon manual testing throughout. 

## Devices
Testing was done by way of Chrome Developer Tools emulator with a focus on viewing the site on the 
following devices:

- Desktop
- Laptop
- iPad
- iPad Pro 
- iPhones 5 to X
- Galaxy S5

## Validation
All code was put through a validator. This process presented some issues, the majority of which were
rectified. Some issues highlighted were not changed as they would either have a negative impact on
the site, or the effort involved would reap negligible returns. This is particularly the case regarding
keeping Javascript lines to under 80 characters.
- [HTML from w3.org](https://validator.w3.org/nu/)
- [CSS from w3.org](https://jigsaw.w3.org/css-validator/)
- [JSLint](https://jslint.com/)

## Testing Suite
A complete texting suite was prepared for each page and is stored in the "testing" folder inside the "assets" folder:

- [Index](/assets/testing/index_page_testing.md)
- [Search](/assets/testing/search_page_testing.md)
- [Ingredient](/assets/testing/ingredient_page_testing.md)
- [Dish](/assets/testing/dish_page_testing.md)
- [Contact](/assets/testing/contact_page_testing.md)

## Known Bugs 
Several bugs still exist on the site. They remain as they have negligible impact and there was
insufficient time to correct them:

- ****Ingredient Page**: Changing the "Number of Servings" input, deactivates the "Batch Weight" input
- **Ingredient Page**: Where a User indicates a product is sold by the piece and attempts to reverse
this upon returning to the product page, it is not possible.
- **Search Page**: The Results do not include pagination
- **Collapse/Expand Arrows**: Upon arrival to a page, the arrows point in the wrong direction
- **Dish**: Users cannot use the Return key to save the dish name
- **User Inputs**: Validation not added
- **Dish Page**: On occassion when the 2nd last product is deleted, the total servings weight and calories reflects the values of
the deleted product as opposed to the remaining product


# Third Party
[Back to Contents](#contents)
Third party input was required in several areas, be it a technology platform or reuse of others' code.

## Technologies Used

### GitHub
GitHub is used to store the code, control versions and deploy the site publicly.

### Formspree
Enables Users to send messages from the Contact page. https://formspree.io/

### Bootstrap4
Although a great time saver, owing to styling difficulties and the "sameness" look of Bootstrap 
elements, it was used sparingly and only as a last resort. 

### jQuery
Although the site was built as much as possible using vanilla Javascript, lack of knowledge
meant that on occassion the jQuery library was employed. The decision to use as little as
possible is based on the fact that jQuery is becoming somewhat obselete since all browsers
are somewhat standardized in how they read Javascript.

### Fontawesome
Used to add icons throughout the site https://fontawesome.com/

### Imgur
Although most iumages are hosted on the site backend itself, for demo purposes, some are 
hosted on Imgur.com, a free to use image hosting platform. https://imgur.com/

## Code
Owing to lack of knowledge in certain areas, assistance was sought elsewhere to compile certain code:

- Accordion: https://www.w3schools.com/bootstrap4/bootstrap_collapse.asp
- Buttons: https://getbootstrap.com/docs/4.0/components/buttons/
- Capitalise Results in "Search": Solution from "I'm a little teapot" in https://stackoverflow.com/questions/32589197/how-to-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript/45620677#45620677" 
- Search: Trigger with button click or return key - https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_trigger_button_enter
- Ingredient Page: Checkbox trigger https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
- Ingredient Page: Accessing the foodId from the URL https://www.youtube.com/watch?v=GNZg1KRsWuU
- Ingredient Page - Round Pieces per Serving to 1 decimal, Billy Moon on https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
- Ingredient Page: Capitalise first letter https://www.w3resource.com/javascript-exercises/javascript-string-exercise-9.php
- Ingredient Page: Add each ingredieint measurement to a single LS "Object" - https://gomakethings.com/how-to-update-localstorage-with-vanilla-javascript/#:~:text=Add%20to%20an%20object%20%23&text=var%20existing%20%3D%20localStorage.-,getItem(name)%3B%20%2F%2F%20If%20no%20existing%20data%2C%20create%20an,setItem(name%2C%20JSON
- Ingredient Page: Looping through Local Storage for key and values - https://stackoverflow.com/questions/8419354/get-html5-localstorage-keys
- Local Storage: General information - https://blog.logrocket.com/the-complete-guide-to-using-localstorage-in-javascript-apps-ba44edb53a36/
- Dish Page: Extracting the foodId to allow for deletion - Viktor S in https://stackoverflow.com/questions/12456399/how-to-use-this-reference-of-the-element-calling-the-function
- Contact: Email form w3 schools
- Contact: Send email from form - https://github.com/formspree/formspree