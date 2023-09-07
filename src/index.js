let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {

    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function createToyCard(toy) {
  const card = document.createElement("div");
  card.className = "card";


  const nameTag = document.createElement("h2");
  nameTag.innerText = toy.name;


  const imageTag = document.createElement("img");
  imageTag.src = toy.image;
  imageTag.className = "toy-avatar";


  const likesTag = document.createElement("p");
  likesTag.innerText = `${toy.likes} Likes`;


  const likeBtn = document.createElement("button");
  likeBtn.className = "like-btn";
  likeBtn.id = toy.id;
  likeBtn.innerText = "Like";
  likeBtn.addEventListener("click", () => {

  });


  card.appendChild(nameTag);
  card.appendChild(imageTag);
  card.appendChild(likesTag);
  card.appendChild(likeBtn);


  toyCollection.appendChild(card);
}

function handleNewToy(toyData) {
  createToyCard(toyData);
}


const toyForm = document.querySelector(".add-toy-form");

toyForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = toyForm.querySelector('input[name="name"]').value;
  const imageInput = toyForm.querySelector('input[name="image"]').value;


  const newToy = {
    name: nameInput,
    image: imageInput,
    likes: 0,
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newToy),
  })
    .then((response) => response.json())
    .then((toyData) => {

      createToyCard(toyData);
 
      toyForm.reset();
    });
});

toyCollection.addEventListener("click", (event) => {
  if (event.target.className === "like-btn") {
    const toyId = event.target.id;

    const toyCard = event.target.parentElement;
    const likesTag = toyCard.querySelector("p");
    const currentLikes = parseInt(likesTag.innerText);
    const newLikes = currentLikes + 1;

 
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ likes: newLikes }),
    })
      .then((response) => response.json())
      .then((updatedToyData) => {

        likesTag.innerText = `${updatedToyData.likes} Likes`;
      });
  }
});