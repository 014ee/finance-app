export function $(className) {
  return document.querySelector(className);
}

export function fetchData(dataURL) {
  return fetch(dataURL).then(response => response.json());
}

export function sortByLatest(list) {
  return list.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
