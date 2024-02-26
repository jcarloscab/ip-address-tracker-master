// variables
const searcher = document.getElementById("searcher");
const searchText = document.getElementById("search-text");
const btnSearch = document.getElementById("search");
const errorText = document.getElementById("error");
const ip = document.getElementById("ip");
const myLocation = document.getElementById("location");
const timeZone = document.getElementById("time-zone");
const isp = document.getElementById("isp");

// map
var map = L.map("map").setView([51.505, -0.09], 13);
var marker = L.marker([51.505, -0.09]).addTo(map);

// functions

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const getData = async (url) => {
  let data = await (await fetch(url)).json();
  // colocamos los datos en el board
  let latitud = data.location.lat;
  let longitud = data.location.lng;
  ip.textContent = data.ip;
  myLocation.textContent = `${data.location.city}, ${data.location.region}`;
  timeZone.textContent = `
      UTC${data.location.timezone}
      `;
  isp.textContent = data.isp;

  // map
  map.setView([latitud, longitud], 15);
  marker = L.marker([latitud, longitud]).addTo(map);
  // end of map
};

function validate(input, fn) {
  const regExpIp = /[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}$/;
  const regExpDom = /\w\.[a-z,A-Z]{2,3}$/;
  let url = "";
  if (regExpIp.test(input)) {
    url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_kycNubxWdI4ceeaC944F5VKlUz5XD&ipAddress=${input}`;
    fn(url);
  } else if (regExpDom.test(input)) {
    url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_kycNubxWdI4ceeaC944F5VKlUz5XD&domain=${input}`;
    fn(url);
  } else {
    searcher.classList.add("searcher--error");
    errorText.classList.add("error--show");
  }
}

function hideError() {
  searcher.classList.remove("searcher--error");
  errorText.classList.remove("error--show");
}

// Listeners
btnSearch.addEventListener("click", () => {
  validate(searchText.value, getData);
});
searchText.addEventListener("change", () => {
  validate(searchText.value, getData);
});
searchText.addEventListener("keydown", hideError);

// On Load
getData(
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_kycNubxWdI4ceeaC944F5VKlUz5XD&ipAddress="
);
