//declaring variables for DOM
let inputCity = document.querySelector(".searchbox input");
let temp = document.querySelector(".temp");
let city = document.querySelector(".city");
let pressure = document.querySelector("#pressure");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
let condition = document.querySelector(".type");
// let rainfall=document.querySelector(".rainfall")
// For date 
function updateTime() {
    let time = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dates = time.toLocaleDateString(undefined, options);
    document.querySelector("#date").innerHTML = dates;
    let hours = time.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    const am = hours >= 12 ? "PM" : "AM";
    //Changing to 12 hours format
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    let min = time.getMinutes();
    min = min < 10 ? "0" + min : min;

    document.querySelector(".time").innerHTML = 'TIME:' + hours + ":" + min + am;
}
updateTime();
setInterval(updateTime, 1000);
// main functions:
async function weatherData(place) {
    api = "e3ad9685b27061fdb70bdd86c8780ffd";
    place = place.toLowerCase();
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=+" + place + "&appid=" + api + "&units=metric");
    //checking for error
    if (!response.ok) {
        alert("city not found")
    }
    let data = await response.json();
    console.log(data);
    temp.innerHTML = Math.round(data.main.temp) + " °C";
    city.innerHTML = data.name + ", " + data.sys.country;
    humidity.innerHTML = data.main.humidity + " %";
    pressure.innerHTML = data.main.pressure + " hPa"
    windSpeed.innerHTML = Math.round(data.wind.speed * 3.6) + " km/hr";
    condition.innerHTML = data.weather[0].main;
    document.querySelector(".condition").src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";//to change the icon

}
//adding default city if no city name is entered
if (!inputCity.value) {
    weatherData("Montgomery COUNTY");
}
function mainFunction() {
    weatherData(inputCity.value);
}