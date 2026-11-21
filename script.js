
const recipeIdInput = document.getElementById("recipe-id");
const getBtn = document.getElementById("get-btn");
const statusParagraph = document.getElementById("status");
const recipeDiv = document.getElementById("recipe");
const dishNameInput = document.getElementById("dish-name");
const postBtn = document.getElementById("post-btn");
const postStatusParagraph = document.getElementById("post-status");
const savedDiv = document.getElementById("saved");

async function getRecipe() {

    try{
        recipeDiv.textContent = "";
        statusParagraph.textContent = "";

        if(recipeIdInput.value === ""){
            statusParagraph.textContent = "Type a number first!"
            return;
        }
        statusParagraph.textContent = "Loading...";

        const recId = recipeIdInput.value;
        
        const url = `https://dummyjson.com/recipes/${recId}`;

        const response = await fetch(url);
        if(!response.ok){
            statusParagraph.textContent = "No recipie with that number. Try a number between 1 and 50.";
            return;
        }
        const recipe = await response.json();
        console.log(recipe);
        
        statusParagraph.textContent = "";

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
    } catch(error){
        statusParagraph.textContent = "It appears your internet is out, try reconnecting and try again!";
        console.log("an error has occured within GET");
        console.error(error);
        
    }
    
}

async function addDish() {
    try{
        savedDiv.textContent = "";
        postStatusParagraph.textContent = "";

        if(dishNameInput.value === ""){
            postStatusParagraph.textContent = "Type a dish name first!";
            return;
        }

        postStatusParagraph.textContent = "Loading...";

        const url = `https://dummyjson.com/recipes/add`;
        const jsonedInput = JSON.stringify({ name: dishNameInput.value });
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonedInput,
        });
        
        if(!response.ok){
            postStatusParagraph.textContent = "The server did not add it. Try again!";
            return;
        }

        const newDish = await response.json()
        console.log(newDish);

        postStatusParagraph.textContent = "";

        const message = document.createElement("p");
        message.className = "alert alert-success";
        message.textContent = `Added ${newDish.name} to the box with the id of ${newDish.id} (practice server, no real save has been commited)`;

        savedDiv.appendChild(message);

        dishNameInput.value = "";
    } catch(error){

        postStatusParagraph.textContent = "It appears your internet is out, try reconnecting and try again!";

        console.log("An error has occured within POST");
        console.error(error);
    }
}

getBtn.addEventListener("click", getRecipe);
postBtn.addEventListener("click", addDish);