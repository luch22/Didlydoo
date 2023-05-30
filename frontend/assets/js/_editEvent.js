import { getFetch } from "./_fetchGet.js";
import { editFetch } from "./_fetchUpdate.js";

let main = document.querySelector("main");
let modal = document.querySelector("dialog");

export function openEditModal() {
  modal.innerHTML = "";
  modal.classList.add("hidden", "modal");
  let modalContent = document.createElement("div");
  modalContent.classList.add("hidden", "overlay");
  let submitButton = document.createElement("button");
  submitButton.setAttribute("class", event.target.classList[0]);
  let authorInput = document.createElement("input");
  authorInput.setAttribute("id", "Modal__Author__Input");
  authorInput.setAttribute("type", "text");
  let descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("id", "Modal__Description__Input");
  descriptionInput.setAttribute("type", "text");
  let nameInput = document.createElement("input");
  nameInput.setAttribute("id", "Modal__Name__Input");
  nameInput.setAttribute("type", "text");
  getFetch("getOneEvent", event.target.classList[0]).then((response) =>
    response.json().then((json) => {
      nameInput.value = json.name;
      authorInput.value = json.author;
      descriptionInput.value = json.description;
    })
  );

  submitButton.textContent = "submit";
  submitButton.addEventListener("click", () => closeEdit());
  main.appendChild(modal);
  modal.appendChild(modalContent);
  modal.appendChild(nameInput);
  modal.appendChild(authorInput);
  modal.appendChild(descriptionInput);
  modal.appendChild(submitButton);
  console.log("hello");
}

function closeEdit() {
  let body = JSON.stringify({
    name: document.getElementById("Modal__Name__Input").value,
    author: document.getElementById("Modal__Author__Input").value,
    description: document.getElementById("Modal__Description__Input").value,
  });
  console.log(body);
  editFetch(event.target.classList[0], body);
  modal.close();
}
