const appid = "84696ed31392c080c0ecc9751e96e339";
const appUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
  const response = await fetch(appUrl + `&q=${city}` + `&appid=${appid}`);
  const data = await response.json();
  const image = document.querySelector(".weather-icon");
  const err = document.querySelector(".error-card");

  if (!data.main) {
    err.innerHTML = `❌${searchBox.value}❌ is not in our document. please try another city`;
    err.style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".temp").innerHTML =
      Math.floor(data.main.temp) + "°c";
    document.querySelector(".city").innerHTML = city;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    image.src = `/images/${data.weather[0].main}.png`;
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error-card").style.display = "none";
  }
  searchBox.value = "";
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value) {
    document.querySelector(".weather-text").style.display = "none";
    checkWeather(searchBox.value);
  }
});

searchBox.addEventListener("keypress", (e) => {
  if (searchBox.value) {
    if (e.key === "Enter") {
      document.querySelector(".weather-text").style.display = "none";
      checkWeather(searchBox.value);
      searchBox.blur();
    }
  }
});

document.getElementById("dMode-img").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    document.getElementById("dMode-img").src = "/images/moon.png";
  } else {
    document.getElementById("dMode-img").src = "/images/sun.png";
  }
});
