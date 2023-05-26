import { getFetch } from "./_fetchGet.js";
let listEvents;
const main = document.querySelector("main");
export function displayEventsHtml() {
  getFetch("getAllEvents").then((response) =>
    response.json().then((json) => {
      display(json);
    })
  );
}

function display(data) {
  let ul = document.createElement("ul");

  data.forEach((element) => {
    let li = document.createElement("li");
    li.className = `${element.name} li_display__event`;

    Object.entries(element).forEach(([key, value]) => {
      let div = document.createElement("div");
      div.className = key;

      if (key == "dates") {
        let span = document.createElement("span");
        span.innerHTML = `${key}: `;
        div.append(span);
        value.forEach((e) => {
          let time = document.createElement("time");
          time.innerHTML = `<br> ${e.date}`;
          div.append(time);
        });
        li.append(div);
      } else {
        div.innerHTML = `<span>${key}: ${value}</span>`;
        li.append(div);
      }
    });
    ul.append(li);
  });
  main.append(ul);
}
