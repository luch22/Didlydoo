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
      getFetch("getAllAttendees").then((response) =>
        response.json().then((json) => {
          displayAttendees(json);
        })
      );
    })
  );
}

const listDateEvents = new Map();

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
        table.id = element.id;
        let trdate = document.createElement("tr");
        trdate.append(document.createElement("th"));
        let tabDate = [];
        value.forEach((e) => {
          trdate.className = "date";
          let th = document.createElement("th");
          th.innerHTML = e.date;
          tabDate.push(e.date);
          trdate.append(th);
          table.append(trdate);
          div.append(table);
        });
        listDateEvents.set(element.id, tabDate);
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
  data.forEach((attendee) => {
    console.log(attendee);
    Object.entries(attendee).forEach(([key, value]) => {
      if (key == "events") {
        value.forEach((eventElement) => {
          let table = document.getElementById(eventElement.id);
          let listDateEvent = listDateEvents.get(eventElement.id);
          let childDate = table.children.item(0);
          let trdata = document.createElement("tr");
          console.log(listDateEvent);
          let myDate = eventElement.dates.map((date) => {
            let result = "";
            Array.from(childDate.children).forEach((val) => {
              if (date.date == val.textContent) {
                console.log(date.available);
                result = date.available;
              }
            });
            return result;
          });
          console.log(myDate);
          for (let i = 0; i < childDate.children.length; i++) {
            const element = childDate.children[i];
            if (element.textContent == "") {
              let td = document.createElement("td");
              trdata.className = attendee.name;
              td.innerText = attendee.name;
              trdata.append(td);
            }

            table.append(trdata);
          }
        });
      }
    });
  });
}

//   let tables = document.querySelectorAll("table");
//   data.forEach((e) => {
//     e.events.forEach((event) => {
//       tables.forEach((tab) => {
//         if (event.id == tab.id) {
//           console.log(data);
//           console.log(e);
//           let tr = document.createElement("tr");
//           let tdName = document.createElement("td");
//           tdName.innerHTML = e.name;
//           tr.append(tdName);
//           event.dates.forEach((date) => {
//             let tdAvailable = document.createElement("td");
//             tab.childNodes.forEach((o) => {
//               o.childNodes.forEach((eve) => {
//                 if (date.date == eve.textContent) {
//                   tdAvailable.textContent = date.date;
//                   tr.append(tdAvailable);
//                 }
//               });
//             });
//           });
//           tab.append(tr);
//         }
//       });
//     });
//   });
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
// }
