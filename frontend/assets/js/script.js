const testAPI = fetch("http://localhost:3000/api/attendees/");

testAPI.then((response) =>
  response.json().then((json) => {
    console.log(json);
  })
);
