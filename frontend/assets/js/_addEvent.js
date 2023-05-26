import { postFetch } from "./_fetchAdd.js";

let body;
let doc = document.querySelector(".tryfetch");
let dateInput = [];

export function addEvent() {
  doc.addEventListener("click", (e) => {
    e.preventDefault();

    for (let i = 0; i < document.getElementById("day-select").value; i++) {
      dateInput.push(document.getElementById(`date_${i}`).value);
    }
    body = JSON.stringify({
      name: document.getElementById("_name").value,
      author: document.getElementById("author").value,
      description: document.getElementById("description").value,
      dates: dateInput,
    });
    dateInput = [];
    postFetch("postOneEvent", null, body);
  });
}

//
