const search = document.querySelector("#search");
const btn = document.querySelector("#btn");
const day = document.querySelector(".day");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const mainImg = document.querySelector(".condition_img");
const subImg = document.querySelector(".sub_condition_img");
const tempImg = document.querySelector(".current_temp_img");
const condText = document.querySelector(".condition_text");
const hourlyForecast = document.querySelector(".next_four_hours");
const dailyForecast = document.querySelector(".daily_forecast");

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
      let hourlyForecastData = data.forecaste_response.forecast.forecastday;
      console.log(hourlyForecastData);
      let condition = data.current_response.current.condition;
      setDayAndTime(condition);
      // populateHourlyForecast(hourlyForecast);
      createHourlyDiv(hourlyForecastData);
      // populateDailyForecast(hourlyForecast);
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
// function populateHourlyForecast(data) {
//   hourlyForecast.forEach((day, index) => {
//     console.log(index);
//     if (data[0].hour[index]) {
//       while (day.firstChild) {
//         day.removeChild(day.firstChild);
//       }
//       const temp = document.createElement("span");
//       const img = document.createElement("img");
//       const time = document.createElement("span");
//       temp.textContent = data[0].hour[index].temp_c;
//       img.src = data[0].hour[index].condition.icon;
//       const timeString = data[0].hour[index + 1].time;
//       const splitTime = timeString.split(" ");
//       time.textContent = splitTime[1];

//       day.appendChild(temp);
//       day.appendChild(img);
//       day.appendChild(time);
//     }
//   });
// }
function createHourlyDiv(datas) {
  for (const data of datas[0].hour) {
    const hourlyDiv = document.createElement("div");
    // hourlyDiv.textContent = "hello";
    hourlyForecast.appendChild(hourlyDiv);
  }
  const childDivs = hourlyForecast.querySelectorAll(".next_four_hours >*");
  childDivs.forEach((hour, index) => {
    while (childDivs.firstChild) {
      childDivs.remove(childDivs.firstChild);
    }
    if (datas[0].hour[index]) {
      const temp = document.createElement("span");
      const img = document.createElement("img");
      const time = document.createElement("span");
      temp.textContent = datas[0].hour[index].temp_c;
      img.src = datas[0].hour[index].condition.icon;
      index = index === 0 ? index + 1 : index;
      const timeString = datas[0].hour[index].time;
      console.log(timeString);
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
//   for (const day of data) {
//     let divDay = document.createElement("div");
//     console.log(dailyForecast);
//     dailyForecast.appendChild(divDay);
//   }
// }
