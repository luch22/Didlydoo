export function getFetch(key, value) {
  const ListFetchGet = new Map();

  ListFetchGet.set("getAllEvents", "http://localhost:3000/api/events/");
  ListFetchGet.set("getOneEvent", "http://localhost:3000/api/events/");
  ListFetchGet.set("getAllAttendees", "http://localhost:3000/api/attendees/");
  ListFetchGet.set("getOneAttendee", "http://localhost:3000/api/attendees/");

  if (value != null) {
    return fetch(`${ListFetchGet.get(key) + value}`);
  }
  return fetch(`${ListFetchGet.get(key)}`);
}
