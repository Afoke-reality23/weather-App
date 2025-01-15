const hourlyForecast = document.querySelector(".next_four_hours");
function createHourlyDiv() {
    data=new Array(20)
    console.log(data)
  for (i=0;i<data.length-1;i++) {
    const hourlyDiv = document.createElement("div");
    // hourlyDiv.textContent = "hello";
    hourlyForecast.appendChild(hourlyDiv);
  }
  
}

document.querySelector('.trybtn').addEventListener('click',createHourlyDiv)