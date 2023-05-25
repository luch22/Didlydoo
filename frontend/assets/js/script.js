import { getFetch } from "./_fetchGet.js";
import { postFetch } from "./_fetchAdd.js";

getFetch("getAllEvents").then((response) =>
  response.json().then((json) => {
    console.log(json);
  })
);
// let body = JSON.stringify({
//   name: "Jean",
//   dates: ["2023-08-22", "2023-08-23", "2023-08-24"],
//   author: "Claude",
//   description: "Balade au bord de mer",
// });

// console.log(body);

// postFetch("postOneEvent", "f5b6564b5dc4", body)
//   .then((response) => response.json())
//   .then((json) => console.log(json));
