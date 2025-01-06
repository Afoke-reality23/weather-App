const search = document.querySelector("#search");
const btn = document.querySelector("#btn");
const day = document.querySelector(".day");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const mainImg = document.querySelector(".condition_img");
const subImg = document.querySelector(".sub_condition_img");
const tempImg = document.querySelector(".current_temp_img");
const condText = document.querySelector(".condition_text");
const forecast = document.querySelector(".next_four_days");

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
      //   dates = data.forecaste_response.forecast.forecastday;
      let forecast = data.forecaste_response.forecast.forecastday;
      let condition = data.current_response.current.condition;
      setDayAndTime(condition);
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

function setDayAndTime(data) {
  const dateTime = new Date();
  let numOfDay = dateTime.getDay();
  let dateNum = dateTime.getDate();
  let hours = dateTime.getHours();
  console.log(hours);
  let minutes = dateTime.getMinutes();
  let hrmn;
  hrmn = `${hours}:${minutes <= 9 ? "0" + minutes : minutes}`;
  days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let currentDay = days[numOfDay];
  day.textContent = currentDay;
  date.textContent = dateNum;
  time.textContent = hrmn;
  mainImg.src = data.icon;
  subImg.src = data.icon;
  tempImg.src = data.icon;
  condText.textContent = data.text;
}
function populateForecastDiv() {
  forecast.forEach((day, index) => {});
}
