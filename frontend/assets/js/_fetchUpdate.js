export function editFetch(id, body) {
  fetch("http://localhost:3000/api/events/" + id, {
    method: "PATCH",
    body: body,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
