const weatherDisplay = document.getElementById("weatherdisplay");

//display location (string) as title:
const cityAndCountry = document.createElement("div");
cityAndCountry.classList.add("locationTitle");

//display temp in celsius:
const temperature1 = document.createElement("div");
temperature1.classList.add("temperature");

//display weather, main:
const weatherMain = document.createElement("div");
weatherMain.classList.add("weather");

//img to display the weather icon
const weatherImage = document.createElement("img");

//to display the more granular data, below the current temp:
const dashboard = document.createElement("div");
dashboard.classList.add("dashboard")

//leftColumn to contain feels_like, temp_min, temp_max:
const leftColumn = document.createElement("div");
leftColumn.classList.add("dashLeft");

//rightColumn to contain humidity, sunrise, sunset:
const rightColumn = document.createElement("div");
rightColumn.classList.add("dashRight");

//api key:
let apiKey = "be2f9820c6286708f298276e996fa57d"

//btn to submit the weather search based on user location input
const searchBtn = document.getElementById("search");

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

        weatherDisplay.classList.add("weatherContainer")

        //logging to make sure that json is returned upon api call:
        console.log(weatherData);

        //first, display the location as title:
        const city = weatherData.name;
        const country = weatherData.sys.country;
        cityAndCountry.innerText = `${city}, ${country}`;
        if (cityAndCountry.innerText.length > 13) {
            cityAndCountry.classList.add("locationTitleLong")
        }
        weatherDisplay.appendChild(cityAndCountry);

        //then, display weather icon:
        const weatherId = weatherData.weather[0].icon;

        weatherImage.src = `http://openweathermap.org/img/wn/${weatherId}@2x.png`;
        weatherDisplay.appendChild(weatherImage);

        //then the accompanying weather text:
        weatherMain.innerText = weatherData.weather[0].main.toLowerCase();
        weatherDisplay.appendChild(weatherMain);

        //default measurements are in metric (units=metric) via api call:
        const tempCelsius = parseInt(weatherData.main.temp.toFixed(2));
        const tempFahrenheit = parseInt(((tempCelsius * 1.8) + 32).toFixed(2));

        temperature1.innerText = `${tempCelsius}°c`;
        weatherDisplay.appendChild(temperature1);

        //grey dashboard which will display two flex columns for granular data:
        weatherDisplay.appendChild(dashboard);

        //left column will have feels_like; temp_min; and temp_max:
        leftColumn.innerText = `min:   16\n max:   23`
        dashboard.appendChild(leftColumn);


        //right column will have humidity, sunrise, sunset:
        rightColumn.innerText = `humidity: 8% \n sunrise: 06:00am \n sunset: 8:30pm`
        dashboard.appendChild(rightColumn);
    }

    getWeather();
});
