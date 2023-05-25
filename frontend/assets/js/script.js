import { getFetch } from "./_fetchGet.js";
import { postFetch } from "./_fetchAdd.js";
import { displayEventsHtml } from "./_displayhtml.js";

let body = JSON.stringify({
  name: "Carlos",
  dates: ["2023-08-22", "2023-08-23", "2023-08-24"],
  author: "Bernard",
  description: "Balade au bord de mer",
});

displayEventsHtml();

let doc = document.querySelector(".tryfetch");
doc.addEventListener("click", () => postFetch("postOneEvent", "", body));
