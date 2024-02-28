import { recipes } from '../data/recipes.js';
// dropdown lists
let currentIngredientsList = [];
let currentAppliancesList = [];
let currentUstensilsList = [];
let currentRecipesList = recipes;
let searchBarValue = "";

//declaring the variables
const mainContainer = document.querySelector('main');
const numberRecipes = document.getElementById('numberRecipes');
const searchBarInput = document.getElementById("searchBar");

const recipesContainer = document.createElement('div');
recipesContainer.className = 'recipesContainer';

const searchBarButton = document.getElementById("searchBarButton");
const dropdownButtons = document.querySelectorAll('.dropbtn');
const searchContainer = document.querySelector(".searchContainer");
const dropdownTagContainer = document.createElement("div");
dropdownTagContainer.className = "dropdownTagContainer";

const listIngredientsContainer = document.getElementById("ingredients-list");
const listAppliancesContainer = document.getElementById("appliances-list");
const listUstensilsContainer = document.getElementById("ustensils-list");

// functions
function displayRecipes(recipesList) {
    recipesContainer.innerText = ""; // empty the current recipe container
    // creating a visual for each recipe included in a list 
    recipesList.forEach(recipe => {
        createRecipeCard(recipe);
    });
};

function displayNumberRecipes(recipesList) {
    if (recipesList === null) {
        numberRecipes.innerText = "1500 recettes";
    } else if (recipesList.length === 0) {
        numberRecipes.innerText = "Il n'y a pas de recette correspondante à votre demande.";
    } else if (recipesList.length === 1) {
        numberRecipes.innerText = recipesList.length + " recette";
    } else {
        numberRecipes.innerText = recipesList.length + " recettes";
    }
};

function displayDropListItems(itemList, container) {
    container.innerText = "";
    itemList.forEach(item => {
        const dropItem = document.createElement('li');
        const firstCharItemUppercase = item.charAt(0).toUpperCase() + item.slice(1);
        dropItem.innerText = firstCharItemUppercase;
        container.appendChild(dropItem);
    });
};

function createRecipeCard(recipe) {
    const recipeCard = document.createElement('article');
    recipeCard.className = 'recipeCard';
    const recipeImage = document.createElement('img');
    recipeImage.src = 'assets/recipes/' + recipe.image;
    recipeImage.alt = recipe.name;
    recipeImage.className = 'recipeImage';
    const recipeTime = document.createElement('div');
    recipeTime.className = 'recipeTime';
    recipeTime.innerText = recipe.time + "min";
    const recipeName = document.createElement('h3');
    recipeName.className = 'recipeName';
    recipeName.innerText = recipe.name;
    const recipeContent = document.createElement('div');
    recipeContent.className = 'recipeContent';
    const recipeContentDescription = document.createElement('div');
    recipeContentDescription.className = 'recipeContentDescription';
    const recipeTitleDescription = document.createElement("h4");
    recipeTitleDescription.className = "recipeTitle";
    recipeTitleDescription.innerText = "RECETTE";
    const recipeDescription = document.createElement("p");
    recipeDescription.className = "recipeDescription";
    recipeDescription.innerText = recipe.description;
    const recipeContentIngredients = document.createElement('div');
    recipeContentIngredients.className = 'recipeContentIngredients';
    const recipeTitleIngredients = document.createElement("h4");
    recipeTitleIngredients.className = "recipeTitle";
    recipeTitleIngredients.innerText = "INGRéDIENTS";
    const listIngredients = document.createElement('ul');
    listIngredients.className = 'listIngredients';

    // creating a list of ingredients for the recipes shown
    recipe.ingredients.forEach(ingredientRecipe => {
        const ingredient = document.createElement("li");
        ingredient.className = "ingredient";
        let ingredientQuantityInfo = "";

        if (ingredientRecipe.unit) {
            ingredientQuantityInfo = (ingredientRecipe.quantity + " " + ingredientRecipe.unit);
        } else if (!ingredientRecipe.quantity) {
            ingredientQuantityInfo = ("-");
        } else {
            ingredientQuantityInfo = (ingredientRecipe.quantity);
        };
        ingredient.innerHTML = '<span class="ingredientName">' + ingredientRecipe.ingredient + '</span><br><span class="ingredientQuantity">' + ingredientQuantityInfo + '</span>';

        listIngredients.appendChild(ingredient);

        //showing this visual
        mainContainer.appendChild(recipesContainer);
        recipesContainer.appendChild(recipeCard);
        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeTime);
        recipeCard.appendChild(recipeName);
        recipeCard.appendChild(recipeContent);
        recipeContent.appendChild(recipeContentDescription);
        recipeContentDescription.appendChild(recipeTitleDescription);
        recipeContentDescription.appendChild(recipeDescription);
        recipeContent.appendChild(recipeContentIngredients);
        recipeContentIngredients.appendChild(recipeTitleIngredients);
        recipeContentIngredients.appendChild(listIngredients);
    });
};
