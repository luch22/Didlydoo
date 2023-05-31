import { getFetch } from "./_fetchGet.js";
import { delFetch } from "./_fetchDelete.js";
import { openEditModal } from "./_editEvent.js";
let listEvents;
let modal = document.querySelector("dialog");
const main = document.querySelector("main");
export function displayEventsHtml() {
  getFetch("getAllEvents").then((response) =>
    response.json().then((json) => {
      displayEvent(json);
    })
  );
  getFetch("getAllAttendees").then((response) =>
    response.json().then((json) => {
      displayAttendees(json);
    })
  );
}

function displayEvent(data) {
  let ul = document.createElement("ul");

  data.forEach((element) => {
    let li = document.createElement("li");
    li.className = `${element.name} li_display__event`;

    let deleteButton = document.createElement("button");
    deleteButton.classList.add(element.id, "deleteButton");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => delFetch(element.id));
    li.appendChild(deleteButton);

    let editButton = document.createElement("button");
    editButton.classList.add(element.id, "editButton");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => openEditModal());
    editButton.addEventListener("click", () => modal.showModal());
    li.appendChild(editButton);

    Object.entries(element).forEach(([key, value]) => {
      let div = document.createElement("div");
      div.className = key;

      if (key == "dates") {
        let table = document.createElement("table");
        table.append(document.createElement("th"));
        table.id = element.id;

        value.forEach((e) => {
          let th = document.createElement("th");
          th.innerHTML = e.date;
          table.append(th);
        });
        div.append(table);
      } else {
        div.innerHTML = `<span>${key}: ${value}</span>`;
      }
      li.append(div);
    });
    ul.append(li);
  });
  main.append(ul);
  let day_select = document.getElementById("day-select");
  day_select.addEventListener("change", (e) => {
    let displayInput = document.querySelector(".display_input__date");
    displayInput.innerHTML = "";
    for (let i = 0; i < day_select.value; i++) {
      let inputDate = document.createElement("input");
      inputDate.type = "date";
      inputDate.id = `date_${i}`;
      displayInput.append(inputDate);
    }
  });
}
function displayAttendees(data) {
  let tables = document.querySelectorAll("table");
  data.forEach((e) => {
    e.events.forEach((event) => {
      if (event.id == tables.id) {
        console.log(event);
      }

      console.log(event);
    });
  });

  // tables.forEach((t) => {
  //   let table = document.getElementById(t.id);
  //   data.forEach((attende) => {
  //     let tr = document.createElement("tr");
  //     attende.events.forEach((eve) => {
  //       console.log(eve);
  //       let tdName = document.createElement("td");
  //       tdName.innerText = `${attende.name}`;
  //       if (eve.id === table.id) {
  //         tr.append(tdName);

  //         let ths = table.querySelectorAll("th");
  //         ths.forEach((th) => {
  //           let count = 0;
  //           eve.dates.forEach((date) => {
  //             let tdDate = document.createElement("td");
  //             if (date.date === th.innerText) {
  //               tdDate.innerText = `${date.available}`;
  //               tr.append(tdDate);
  //             }
  //           });
  //         });
  //       }
  //     });
  //     table.append(tr);
  //   });
  // });
}
