
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

//function to convert a unix timestamp to xx:xxam/pm:
const unixToReadable = timestamp => {
    let date = new Date(timestamp);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amPm = "";

    if (hours < 12) {
        amPm = "am";
    }
    else {
        amPm = "pm";
        hours - 12;
    }

    if (minutes < 10) {
        minutes = `0${minutes.toString()}`;
    }

    return `${hours}:${minutes}${amPm}`;
}

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
        const country = weatherData.sys.country; //country info not displayed for responsiveness
        cityAndCountry.innerText = `${city}`;
        weatherDisplay.appendChild(cityAndCountry);

        //then, display weather icon:
        const weatherId = weatherData.weather[0].icon;

        weatherImage.src = `http://openweathermap.org/img/wn/${weatherId}@2x.png`;
        weatherDisplay.appendChild(weatherImage);

        //then the accompanying weather text:
        weatherMain.innerText = weatherData.weather[0].main.toLowerCase();
        weatherDisplay.appendChild(weatherMain);

        //default measurements are in metric (units=metric) via api call:
        const tempCelsius = parseInt(weatherData.main.temp.toFixed(0));
        const tempFahrenheit = parseInt(((tempCelsius * 1.8) + 32).toFixed(0));

        temperature1.innerText = `${tempCelsius}°`;
        weatherDisplay.appendChild(temperature1);

        //grey dashboard which will display two flex columns for granular data:
        weatherDisplay.appendChild(dashboard);

        //left column will have feels_like; temp_min; and temp_max:
        const tempMin = weatherData.main.temp_min.toFixed(0);
        const tempMax = weatherData.main.temp_max.toFixed(0);
        leftColumn.innerText = `low: \u00A0\u00A0${tempMin}°\n high: \u00A0${tempMax}°`
        dashboard.appendChild(leftColumn);


        //right column will have humidity, sunrise, sunset:
        const humidity = weatherData.main.humidity;
        console.log(humidity);

        const sunrise = unixToReadable(weatherData.sys.sunrise);
        const sunset = unixToReadable(weatherData.sys.sunset);

        rightColumn.innerText = `humidity: \u00A0\u00A0${humidity}% \n sunrise:\u00A0${sunrise}\n sunset:\u00A0\u00A0${sunset}`
        dashboard.appendChild(rightColumn);
    }

    getWeather();
});
