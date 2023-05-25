function delFetch(id) {
  return fetch("http://localhost:3000/api/events/" + id);
}
