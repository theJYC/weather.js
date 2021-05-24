const weatherDisplay = document.getElementById("weatherbox");
const weatherText = document.createElement("div");

const searchBtn = document.getElementById("search");

//api key:
apiKey = "be2f9820c6286708f298276e996fa57d"
//
// weatherText.innerText = `It is ${tempCelsius} °c / ${tempFahrenheit} °f in ${location}`
// weatherDisplay.appendChild(weatherText);

searchBtn.addEventListener("click", event => {

    event.preventDefault();
    const searchedCity = document.getElementById("searchText").value;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}`

    async function getWeather() {
        const response = await fetch(apiURL);
        const weatherData = await response.json();

        console.log(weatherData)




    }
    getWeather();
})
