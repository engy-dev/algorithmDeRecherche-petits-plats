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

function createItemsLists(currentRecipesList) {
    currentIngredientsList = [];
    currentAppliancesList = [];
    currentUstensilsList = [];
    currentRecipesList.forEach(currentRecipe => {
        // we refresh the list of ingredients, appliances and ustensils in the searched recipes
        currentRecipe.ingredients.forEach(ingredientRecipe => {
            currentIngredientsList.push(ingredientRecipe.ingredient);
        });
        currentAppliancesList.push(currentRecipe.appliance);
        currentRecipe.ustensils.forEach(ustensilRecipe => {
            currentUstensilsList.push(ustensilRecipe);
        });
    });
};

function sortListItems(currentListItems) {
    currentListItems = [...new Set(currentListItems.map(currentListItem => currentListItem.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))];
    currentListItems.sort();
    return currentListItems;
};

function createTag(button) {
    //creating tags
    const dropListButtonSelected = document.createElement("button");
    dropListButtonSelected.type = "button";
    dropListButtonSelected.className = "dropListButtonSelected";
    const dropListButtonSelectedImage = document.createElement("img");
    dropListButtonSelectedImage.className = "closeTag";
    dropListButtonSelectedImage.src = "assets/icons/closeButton.svg";
    dropListButtonSelectedImage.alt = "Close Tag";
    dropListButtonSelected.innerText = button.innerText;
    //showing tags
    searchContainer.appendChild(dropdownTagContainer);
    dropdownTagContainer.appendChild(dropListButtonSelected);
    dropListButtonSelected.appendChild(dropListButtonSelectedImage);
};

function updateItemsList(itemsListUl, currentItemsList) {
    const allItems = itemsListUl.querySelectorAll("li");

    allItems.forEach(displayItem => {
        const itemInDisplayItemsList = currentItemsList.some(item => item === displayItem.innerText.toLowerCase());
        if (!itemInDisplayItemsList) {
            displayItem.remove();
        }
    });
};

function tagUpdateRecipeList() {
    const tagValueAll = document.querySelectorAll(".dropListButtonSelected");
    tagValueAll.forEach(tagValue => {

        currentRecipesList = currentRecipesList.filter(recipe => {
            return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === tagValue.innerText.toLowerCase())
                || recipe.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === tagValue.innerText.toLowerCase()
                || recipe.ustensils.some(ustensil => ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === tagValue.innerText.toLowerCase());
        });
    });
};

displayRecipes(currentRecipesList);
displayNumberRecipes(null);
createItemsLists(currentRecipesList);
currentIngredientsList = sortListItems(currentIngredientsList);
currentAppliancesList = sortListItems(currentAppliancesList);
currentUstensilsList = sortListItems(currentUstensilsList);
displayDropListItems(currentIngredientsList, listIngredientsContainer);
displayDropListItems(currentAppliancesList, listAppliancesContainer);
displayDropListItems(currentUstensilsList, listUstensilsContainer);

// event listeners
searchBarButton.addEventListener("click", () => {
    searchBarValue = document.getElementById("searchBar").value;
    const normalizedInput = searchBarValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalizedInput.length >= 3 && /^[a-zA-Z\s]*$/.test(normalizedInput)) {
        currentRecipesList = recipes.filter(recipe => {
            const recipeTitle = recipe.name.toLowerCase();
            const recipeDesc = recipe.description.toLowerCase();
            let recipeIngr = false;
            recipe.ingredients.forEach(ingredient => {
                ingredient.ingredient.toLowerCase();
                if (ingredient.ingredient.toLowerCase().includes(normalizedInput.toLowerCase())) {
                    recipeIngr = true;
                };
            });

            if (recipeTitle.includes(normalizedInput.toLowerCase())) {
                return true
            } else if (recipeDesc.includes(normalizedInput.toLowerCase())) {
                return true
            } else if (recipeIngr) {
                return true
            } else {
                return false
            }
        });
        if (currentRecipesList.length === 0) {
            numberRecipes.innerText = "Aucune recette ne contient '" + searchBarValue + "'. Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.";
        } else {
            displayRecipes(currentRecipesList);
            displayNumberRecipes(currentRecipesList);
            createItemsLists(currentRecipesList);
            currentIngredientsList = sortListItems(currentIngredientsList);
            currentAppliancesList = sortListItems(currentAppliancesList);
            currentUstensilsList = sortListItems(currentUstensilsList);
            updateItemsList(listIngredientsContainer, currentIngredientsList);
            updateItemsList(listAppliancesContainer, currentAppliancesList);
            updateItemsList(listUstensilsContainer, currentUstensilsList);
        };
    } else {
        currentRecipesList= recipes;
        displayRecipes(currentRecipesList);
        displayNumberRecipes(null);
        createItemsLists(currentRecipesList);
        currentIngredientsList = sortListItems(currentIngredientsList);
        currentAppliancesList = sortListItems(currentAppliancesList);
        currentUstensilsList = sortListItems(currentUstensilsList);
        displayDropListItems(currentIngredientsList, listIngredientsContainer);
        displayDropListItems(currentAppliancesList, listAppliancesContainer);
        displayDropListItems(currentUstensilsList, listUstensilsContainer);
    };
});

dropdownButtons.forEach(button => {
    button.addEventListener("click", () => {

        const siblingElement = button.nextElementSibling; // Accédez à l'élément qui suit immédiatement le bouton
        if (siblingElement) {
            siblingElement.classList.toggle("show"); // Manipulez l'élément suivant en fonction de vos besoins
            button.classList.toggle("show");
        };
    });
});

document.addEventListener("click", function (event) {
    /*currentRecipesList = recipes;*/
    if ((event.target.classList.contains('closeTag')) || (event.target.classList.contains('validate'))) {
        if (event.target.classList.contains('validate')) {
            event.target.classList.remove("validate");
            const allTags = document.querySelectorAll(".closeTag");
            allTags.forEach(tag => {
                if (event.target.innerText.toLowerCase() === tag.parentElement.innerText.toLowerCase()) {
                    tag.parentElement.remove();
                };
            });
            const spanElement = event.target.querySelector("span");
            event.target.removeChild(spanElement);
        } else {
            //delete the container
            event.target.parentElement.remove();
            //remove the class "validate" depending on the closed tag
            document.querySelectorAll(".dropdown-content ul").forEach(container => {
                const selectDropListButtons = container.querySelectorAll("li");
                selectDropListButtons.forEach(button => {
                    if (event.target.parentElement.innerText.toLowerCase() === button.innerText.toLowerCase()) {
                        button.classList.remove("validate");
                    };
                });
            });
        };
        if (searchBarValue) {
            const normalizedInput = searchBarValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if ((document.querySelectorAll('.closeTag').length > 0)) {
                console.log("yo");
                currentRecipesList = recipes.filter(recipe => {
                    const recipeTitle = recipe.name.toLowerCase();
                    const recipeDesc = recipe.description.toLowerCase();
                    let recipeIngr = false;
                    recipe.ingredients.forEach(ingredient => {
                        ingredient.ingredient.toLowerCase();
                        if (ingredient.ingredient.toLowerCase().includes(normalizedInput.toLowerCase())) {
                            recipeIngr = true;
                        };
                    });

                    if (recipeTitle.includes(normalizedInput.toLowerCase())) {
                        return true
                    } else if (recipeDesc.includes(normalizedInput.toLowerCase())) {
                        return true
                    } else if (recipeIngr) {
                        return true
                    } else {
                        return false
                    };
                });
                currentRecipesList = recipes.filter(recipe => {
                    const recipeTitle = recipe.name.toLowerCase();
                    const recipeDesc = recipe.description.toLowerCase();
                    let recipeIngr = false;
                    recipe.ingredients.forEach(ingredient => {
                        ingredient.ingredient.toLowerCase();
                        if (ingredient.ingredient.toLowerCase().includes(normalizedInput.toLowerCase())) {
                            recipeIngr = true;
                        };
                    });

                    if (recipeTitle.includes(normalizedInput.toLowerCase())) {
                        return true
                    } else if (recipeDesc.includes(normalizedInput.toLowerCase())) {
                        return true
                    } else if (recipeIngr) {
                        return true
                    } else {
                        return false
                    };
                });
                //search bar function recipes
                tagUpdateRecipeList;
                displayRecipes(currentRecipesList);
                displayNumberRecipes(currentRecipesList);
                createItemsLists(currentRecipesList);
                currentIngredientsList = sortListItems(currentIngredientsList);
                currentAppliancesList = sortListItems(currentAppliancesList);
                currentUstensilsList = sortListItems(currentUstensilsList);
                updateItemsList(listIngredientsContainer, currentIngredientsList);
                updateItemsList(listAppliancesContainer, currentAppliancesList);
                updateItemsList(listUstensilsContainer, currentUstensilsList);
            } else {
                console.log("ya");
                currentRecipesList = recipes.filter(recipe => {
                    const recipeTitle = recipe.name.toLowerCase();
                    const recipeDesc = recipe.description.toLowerCase();
                    let recipeIngr = false;
                    recipe.ingredients.forEach(ingredient => {
                        ingredient.ingredient.toLowerCase();
                        if (ingredient.ingredient.toLowerCase().includes(normalizedInput.toLowerCase())) {
                            recipeIngr = true;
                        };
                    });
                    
                    if (recipeTitle.includes(normalizedInput.toLowerCase())) {
                        return true
                    } else if (recipeDesc.includes(normalizedInput.toLowerCase())) {
                        return true
                    } else if (recipeIngr) {
                        return true
                    } else {
                        return false
                    };
                });
                // search bar function
                
                displayRecipes(currentRecipesList);
                displayNumberRecipes(currentRecipesList);
                createItemsLists(currentRecipesList);
                currentIngredientsList = sortListItems(currentIngredientsList);
                currentAppliancesList = sortListItems(currentAppliancesList);
                currentUstensilsList = sortListItems(currentUstensilsList);
                updateItemsList(listIngredientsContainer, currentIngredientsList);
                updateItemsList(listAppliancesContainer, currentAppliancesList);
                updateItemsList(listUstensilsContainer, currentUstensilsList);
            };
        } else {
            if ((document.querySelectorAll('.closeTag').length > 0)) {
                console.log("ye");
                tagUpdateRecipeList();
                displayRecipes(currentRecipesList);
                displayNumberRecipes(currentRecipesList);
                createItemsLists(currentRecipesList);
                currentIngredientsList = sortListItems(currentIngredientsList);
                currentAppliancesList = sortListItems(currentAppliancesList);
                currentUstensilsList = sortListItems(currentUstensilsList);
                updateItemsList(listIngredientsContainer, currentIngredientsList);
                updateItemsList(listAppliancesContainer, currentAppliancesList);
                updateItemsList(listUstensilsContainer, currentUstensilsList);
            } else {
                console.log("yu");
                currentRecipesList = recipes;
                displayRecipes(currentRecipesList);
                displayNumberRecipes(null);
                createItemsLists(recipes);
                currentIngredientsList = sortListItems(currentIngredientsList);
                currentAppliancesList = sortListItems(currentAppliancesList);
                currentUstensilsList = sortListItems(currentUstensilsList);
                displayDropListItems(currentIngredientsList, listIngredientsContainer);
                displayDropListItems(currentAppliancesList, listAppliancesContainer);
                displayDropListItems(currentUstensilsList, listUstensilsContainer);
            };
        };

    } else if (event.target.tagName === 'LI' && event.target.closest('.dropdown-content ul')) {
        if (!searchBarValue) {
            currentRecipesList = recipes;
        };
        // deleting the div that contains the list 
        const parentElement = event.target.parentNode.parentNode;
        parentElement.classList.toggle("show");
        // search the tags in the list of recipes
        if (event.target.parentNode === listIngredientsContainer) {
            currentRecipesList = currentRecipesList.filter(recipe => {
                return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === event.target.innerText.toLowerCase());
            });
        } else if (event.target.parentNode === listAppliancesContainer) {
            currentRecipesList = currentRecipesList.filter(recipe => {
                return recipe.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === event.target.innerText.toLowerCase();
            });
        } else if (event.target.parentNode === listUstensilsContainer) {
            currentRecipesList = currentRecipesList.filter(recipe => {
                return recipe.ustensils.some(ustensil => ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === event.target.innerText.toLowerCase());
            });
        };

        displayRecipes(currentRecipesList);
        createItemsLists(currentRecipesList);
        currentIngredientsList = sortListItems(currentIngredientsList);
        currentAppliancesList = sortListItems(currentAppliancesList);
        currentUstensilsList = sortListItems(currentUstensilsList);
        displayNumberRecipes(currentRecipesList);
        createTag(event.target);
        event.target.classList.add("validate");
        event.target.innerHTML += '<span><img class="closeLi" src="assets/icons/closeLi.svg" alt="close LI"></span>';
        updateItemsList(listIngredientsContainer, currentIngredientsList);
        updateItemsList(listAppliancesContainer, currentAppliancesList);
        updateItemsList(listUstensilsContainer, currentUstensilsList);
    };
});


const divDropContainer = document.querySelectorAll(".dropdownDivContainer");
divDropContainer.forEach(div => {
    div.addEventListener("mouseout", function (event) {
        const targetElement = event.relatedTarget;
        const dropdownContent = this.querySelector('.dropdown-content');


        if (!this.contains(targetElement)) {
            dropdownContent.classList.toggle("show", false);
        };
    });
});

