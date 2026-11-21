
const recipeIdInput = document.getElementById("recipe-id");
const getBtn = document.getElementById("get-btn");
const statusParagraph = document.getElementById("status");
const recipeDiv = document.getElementById("recipe");
const dishNameInput = document.getElementById("dish-name");
const postBtn = document.getElementById("post-btn");
const postStatusParagraph = document.getElementById("post-status");
const savedDiv = document.getElementById("saved");

async function getRecipe() {
    recipeDiv.textContent = "";

    const recId = recipeIdInput.value;
    
    const url = `https://dummyjson.com/recipes/${recId}`;

    const response = await fetch(url);
    const recipe = await response.json();
    console.log(recipe);

    const cardClasses = "card p-3 mb-5 w-50";

    const card = document.createElement("div");
    card.className = cardClasses;

    const title = document.createElement("h2");
    title.textContent = recipe.name;
    card.appendChild(title);

    const cuisine = document.createElement("h5");
    cuisine.textContent = recipe.cuisine;
    card.appendChild(cuisine);

    const cookTime = document.createElement("p");
    cookTime.textContent = `Your cook time should be ${recipe.cookTimeMinutes} minutes`;
    card.appendChild(cookTime);

    const caloricInfo = document.createElement("p");
    caloricInfo.textContent = `Total calories: ${recipe.caloriesPerServing}`;
    card.appendChild(caloricInfo);

    const ingredients = document.createElement("ul");
    recipe.ingredients.forEach(ingredient => {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient;
        ingredients.appendChild(listItem);
    });
    card.appendChild(ingredients);

    const instructions = document.createElement("ol");
    recipe.instructions.forEach((instruction)=>{
        const listItem = document.createElement("li");
        listItem.textContent = instruction;
        instructions.appendChild(listItem);
    })
    card.appendChild(instructions);

    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;
    img.className = "rounded-2";
    card.prepend(img);


    recipeDiv.appendChild(card);
}

getBtn.addEventListener("click", getRecipe);