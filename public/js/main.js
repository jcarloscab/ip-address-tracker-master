// variables

const ip = document.getElementById('ip');
const myLocation = document.getElementById('location');
const timeZone = document.getElementById('time-zone');
const isp = document.getElementById('isp');

// functions

const getData = async (url)=>{
    let data = await(await (fetch(url))).json();
    // colocamos los datos en el board
    let latitud = data.location.lat;
    let longitud = data.location.lng;
    ip.textContent = data.ip;
    myLocation.textContent = `${data.location.city}, ${data.location.region}`;
    timeZone.textContent = `
    UTC${data.location.timezone}
    `
    isp.textContent = data.isp;
    
    // map
    let map = L.map('map').setView([latitud, longitud], 15);
    let marker = L.marker([latitud, longitud]).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    // end of map
}


getData('https://geo.ipify.org/api/v2/country,city?apiKey=at_kycNubxWdI4ceeaC944F5VKlUz5XD&ipAddress=');
// getData('https://geo.ipify.org/api/v2/country,city?apiKey=at_kycNubxWdI4ceeaC944F5VKlUz5XD&domain=');