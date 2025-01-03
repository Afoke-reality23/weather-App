const search = document.querySelector("#search");
const btn = document.querySelector("#btn");
const day = document.querySelector(".day");
const date = document.querySelector(".date");
const time = document.querySelector(".time");

btn.addEventListener("click", () => {
  fetch(`http://localhost:1998?client_port=${window.location.port}`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: search.value,
  })
    .then((response) => {
      if (response.ok) {
        if (response.headers.get("Content-Type") === "application/json") {
          return response.json();
        } else {
          return response.text();
        }
      }
    })
    .then((data) => {
      console.log(data);
      dates = data.forecaste_response.forecast.forecastday;
      console.log(dates);
      setDayAndTime();
    })
    .catch((error) => {
      console.error("Failed to fetch:", error);
    });
});

let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);
let currentMarker = L.marker([51.505, -0.09]).addTo(map);
L.Control.geocoder({
  defaultMarkGeocode: true,
}).addTo(map);

function setDayAndTime() {
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[0];
  day.textContent = currentDay;
}
