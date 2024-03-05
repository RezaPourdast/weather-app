const appid = "84696ed31392c080c0ecc9751e96e339";
const appUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
  const response = await fetch(appUrl + `&q=${city}` + `&appid=${appid}`);
  const data = await response.json();
  const image = document.querySelector(".weather-icon");

  if (!data.main) {
    alert(
      `the ${
        "<<" + searchBox.value + ">>"
      } is not in our document. try another city`
    );
  } else {
    document.querySelector(".temp").innerHTML =
      Math.floor(data.main.temp) + "°c";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    image.src = `/images/${data.weather[0].main}.png`;
    document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  searchBox.value = "";
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
    searchBox.value = "";
  }
});
