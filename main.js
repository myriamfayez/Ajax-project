var cartoona = [];
if (localStorage.getItem("storage" == null)) {
  cartoona = [];
} else {
  cartoona = JSON.parse(localStorage.getItem("storage"));
}

function subscribe() {
  var mail = document.getElementById("sub").value;

  cartoona.push(mail);

  localStorage.setItem("storage", JSON.stringify(cartoona));
  clear();
}

function clear() {
  document.getElementById("sub").value = "";
}

let day = document.getElementById("day");
let dayNo = document.getElementById("dayno");
let city = document.getElementById("city");
let temp = document.getElementById("temp");
let icon = document.getElementById("icon");
let hum = document.getElementById("hum");
let wind = document.getElementById("wind");
let dir = document.getElementById("dir");
let today = document.getElementById("today");

function view(data) {
  let date = new Date();
  document.querySelector("#today").innerHTML = date.toLocaleDateString(
    "en-us",
    { weekday: "long" }
  );
  
  day.innerHTML = data.location.name;

  temp.innerHTML = data.current.temp_c + "C";
  icon.setAttribute("src", `https:${data.current?.condition.icon}`); 
  hum.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + "Km/h";
  dir.innerHTML = data.current.wind_dir;
}

function next(data) {
  
  let forecastData = data.forecast?.forecastday;
  console.log(forecastData);
  // to bring tomorrow
  let nextday = new Date(forecastData[1].date);
  document.querySelector("#nextDay").innerHTML = nextday.toLocaleDateString(
    "en-us",
    { weekday: "long" }
  );
  // ----------------
  document.querySelector(".max").innerHtml = forecastData[1].day.maxtemp_c;
  document.querySelector(".min").innerHTML = forecastData[1].day.mintemp_c;
  document
    .querySelector(".img")
    .setAttribute("src", `https:${forecastData[1].day.condition.icon}`);
  document.querySelector(".text").innerHTML =
    forecastData[1].day.condition.text;
}

function nextd(data) {
  

  let forecastData = data.forecast.forecastday;
  // To bring after tomorrow

  let next2day = new Date(forecastData[2].date);
  document.querySelector("#next2day").innerHTML = next2day.toLocaleDateString(
    "en-us",
    { weekday: "long" }
  );
  // -----------------------------------------------
  document.querySelector(".x").innerHtml = forecastData[2].day.maxtemp_c;
  document.querySelector(".in").innerHTML = forecastData[2].day.mintemp_c;
  document
    .querySelector(".im")
    .setAttribute("src", `https:${forecastData[2].day.condition.icon}`);
}

// function search(userWord)
// {

// var hsalah;
// if(data.includes(userWord)){

// hsalah+=`<tr>

// <td>${data.location.name}</td>

// </tr>`

// display()

// }

// document.getElementById("table").innerHTML=hsalah

// }

// var y;  //lazem a7ot el var bara 3shan lma andoho fl clear interval ykon global
//   function start(){

// y= setInterval(function(){    // 3rfto bara w 7tet el setinterval kolha gowa var 3shan a3rf andha fl clear interval

//     var x = new Date();
// document.getElementById("h").innerHTML=x.toLocaleTimeString()

// },1000)
//   }

// function stop(){

//     clearInterval(y)
// }

document.getElementById("searchInput").addEventListener("input", function (e) {
  var x = e.target.value;

  display(x);
});

async function display(userWord) {
  var data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=8491d6e65b83430cbe0184237230808&q=${userWord}&days=3`
  ); //default is get
  data = await data.json();
  view(data);
  next(data);
  nextd(data);
}
