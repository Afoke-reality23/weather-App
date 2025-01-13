const hourlyForecast = document.querySelector(".next_four_hours");
function createHourlyDiv() {
  for (i=0;i<20;i++) {
    const hourlyDiv = document.createElement("div");
    // hourlyDiv.textContent = "hello";
    hourlyForecast.appendChild(hourlyDiv);
  }
  
}

document.querySelector('.trybtn').addEventListener('click',createHourlyDiv)