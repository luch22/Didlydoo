export function postFetch(key, value, body) {
  const ListFetchPost = new Map();

  ListFetchPost.set("postOneEvent", "http://localhost:3000/api/events/");
  ListFetchPost.set(
    "postDateToEvent",
    `http://localhost:3000/api/events/${value}/add_dates`
  );
  ListFetchPost.set(
    "postAttendToEvent",
    `http://localhost:3000/api/events/${value}/attend`
  );

  return fetch(ListFetchPost.get(key), {
    method: "POST",
    body: body,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
