const weatherDisplay = document.getElementById("weatherbox");

const cityName = document.createElement("div");
cityName.classList.add("cityName");

const temperature1 = document.createElement("div");
temperature1.classList.add("temperature");

const temperature2 = document.createElement("div");
temperature2.classList.add("temperature");

const weatherImage = document.createElement("img")

const searchBtn = document.getElementById("search");

//api key:
apiKey = "be2f9820c6286708f298276e996fa57d"
//
// weatherText.innerText = `It is ${tempCelsius} °c / ${tempFahrenheit} °f in ${location}`
// weatherDisplay.appendChild(weatherText);

searchBtn.addEventListener("click", event => {

    event.preventDefault();
    const searchedCity = document.getElementById("searchText").value;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`

    async function getWeather() {
        const response = await fetch(apiURL);
        const weatherData = await response.json();

        console.log(weatherData);

        const city = weatherData.name;
        cityName.innerText = city;
        weatherDisplay.appendChild(cityName);

        //weather icon:
        const weatherId = weatherData.weather[0].icon;

        weatherImage.src = `http://openweathermap.org/img/wn/${weatherId}@2x.png`;
        weatherDisplay.appendChild(weatherImage);

        //default measurements are in metric (units=metric) via api call:
        const tempCelsius = parseInt(weatherData.main.temp.toFixed(2));
        const tempFahrenheit = parseInt(((tempCelsius * 1.8) + 32).toFixed(2));


        temperature1.innerText = `${tempCelsius} °c`;
        weatherDisplay.appendChild(temperature1);

        temperature2.innerText = `${tempFahrenheit} °f`;
        weatherDisplay.appendChild(temperature2);

    }
    getWeather();
})
