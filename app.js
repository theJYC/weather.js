const weatherDisplay = document.getElementById("weatherbox");

//div to display location (string) as title:
const cityAndCountry = document.createElement("div");
cityAndCountry.classList.add("locationTitle");

//div to display temp in celsius:
const temperature1 = document.createElement("div");
temperature1.classList.add("temperature");

//div to display temp in fahrenheit:
const temperature2 = document.createElement("div");
temperature2.classList.add("temperature");

//img to display the weather icon
const weatherImage = document.createElement("img")

//btn to submit the weather search based on user location input
const searchBtn = document.getElementById("search");

//api key:
let apiKey = "be2f9820c6286708f298276e996fa57d"

//eventlistener for when search is performed:
searchBtn.addEventListener("click", event => {

    //preventing the page from refreshing with queried url:
    event.preventDefault();

    const searchedCity = document.getElementById("searchText").value;

    //constructing the api endpoint based on the user inputted location:
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`


    async function getWeather() {
        const response = await fetch(apiURL);
        const weatherData = await response.json();

        //logging to make sure that json is returned upon api call:
        console.log(weatherData);

        //first, display the location as title:
        const city = weatherData.name;
        const country = weatherData.sys.country;
        cityAndCountry.innerText = `${city}, ${country}`;
        weatherDisplay.appendChild(cityAndCountry);

        //then, display weather icon:
        const weatherId = weatherData.weather[0].icon;

        weatherImage.src = `http://openweathermap.org/img/wn/${weatherId}@2x.png`;
        weatherDisplay.appendChild(weatherImage);

        //then, two rows that display the temp, in 1) celsius, and 2) fahrenheit:

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
