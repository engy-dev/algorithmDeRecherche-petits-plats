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
