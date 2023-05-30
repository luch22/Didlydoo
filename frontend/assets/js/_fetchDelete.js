export function delFetch(id) {
  fetch("http://localhost:3000/api/events/" + id, { method: "DELETE" });
}
