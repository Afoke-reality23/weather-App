const search = document.querySelector("#search");
const btn = document.querySelector("#btn");
const day = document.querySelector(".day");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const mainImg = document.querySelector(".condition_img");
const subImg = document.querySelector(".sub_condition_img");
const tempImg = document.querySelector(".current_temp_img");
const condText = document.querySelector(".condition_text");
const temp = document.querySelector(".temp");
const hoursDiv = document.querySelector(".hours");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const hourlyForecast = document.querySelector(".next_23_hours");
const loader = document.querySelector(".loader");
const dailyForecast = document.querySelector(".daily_forecast");
const mapLayer = document.getElementById("map");
const content = document.querySelector(".main_content");
console.log(content);

btn.addEventListener("click", () => {
  loader.classList.toggle("show");
  content.classList.toggle("hide");

  fetch(`http://localhost:1998?client_port=${window.location.port}`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: search.value,
  })
    .then((response) => {
      loader.classList.toggle("show");
      content.classList.toggle("hide");
      if (response.ok) {
        if (response.headers.get("Content-Type") === "application/json") {
          return response.json();
        } else {
          return response.text();
        }
      }
    })
    .then((data) => {
      let hourlyForecastData = data.forecaste_response.forecast.forecastday;
      let condition = data.current_response.current;
      let lat = data.forecaste_response.location.lat;
      let lon = data.forecaste_response.location.lon;
      setCordinates(lat, lon);
      setDayAndTime(condition);
      populateAirCondition(condition);
      createHourlyDiv(hourlyForecastData);
    })
    .catch((error) => {
      console.error("Failed to fetch:", error);
    });
});

function setCordinates(lat, lon) {
  if (currentMarker) {
    map.removeLayer(currentMarker);
  }
  map.setView([lat, lon]);
  currentMarker = L.marker([lat, lon]).addTo(map);
}

let map = L.map("map", {
  dragging: false,
}).setView([51.505, -0.09], 13);
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
  let minutes = dateTime.getMinutes();
  let hrmn;
  hrmn = `${hours}:${minutes <= 9 ? "0" + minutes : minutes}`;
  days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let currentDay = days[numOfDay];
  day.textContent = currentDay;
  date.textContent = dateNum;
  time.textContent = hrmn;
  mainImg.src = data.condition.icon;
  subImg.src = data.condition.icon;
  tempImg.src = data.condition.icon;
  condText.textContent = data.condition.text;
  //set temperature
  console.log(data);
  temp.textContent = `${data.temp_c}°C`;
}

function populateAirCondition(data) {
  console.log(data);
  console.log("i was called");
  wind.textContent = data.windchill_c;
  console.log(data.windchill_c);
  pressure.textContent = data.pressure_in;
  humidity.textContent = data.humidity;
}

function createHourlyDiv(data) {
  while (hourlyForecast.firstChild) {
    hourlyForecast.removeChild(hourlyForecast.firstChild);
  }
  for (i = 0; i < data[0].hour.length - 1; i++) {
    const hourlyDiv = document.createElement("div");
    hourlyForecast.appendChild(hourlyDiv);
  }
  const childDivs = hourlyForecast.querySelectorAll(".next_23_hours >*");
  childDivs.forEach((hour, index) => {
    if (data[0].hour[index]) {
      const temp = document.createElement("span");
      const img = document.createElement("img");
      const time = document.createElement("span");
      temp.textContent = `${data[0].hour[index].temp_c}°c`;
      img.src = data[0].hour[index].condition.icon;
      index = index === 0 ? index + 1 : index;
      const timeString = data[0].hour[index].time;
      const splitTime = timeString.split(" ");
      time.textContent = splitTime[1];

      hour.appendChild(temp);
      hour.appendChild(img);
      hour.appendChild(time);
    }
  });
}

// function populateDailyForecast(data) {
//   while (dailyForecast.firstChild) {
//     dailyForecast.removeChild(dailyForecast.firstChild);
//   }
//   for (const day of data) {hhh
//     let divDay = document.createElement("div");
//     console.log(dailyForecast);
//     dailyForecast.appendChild(divDay);
//   }
// }
