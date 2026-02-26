// Function to get latitude & longitude from city name
async function getCoordinates(city) {
    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
        const response = await fetch(geoUrl);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("City not found");
        }

        const { latitude, longitude, name, country, timezone } = data.results[0];
        return { latitude, longitude, name, country, timezone };

    } catch (error) {
        throw new Error(error.message);
    }
}

async function getWeather() {
    const cityInput = document.getElementById("city").value.trim();
    const resultDiv = document.getElementById("result");

    if (!cityInput) {
        resultDiv.innerHTML = "Please enter a city.";
        return;
    }

    resultDiv.innerHTML = "Loading...";

    try {
    
        const location = await getCoordinates(cityInput);
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;
        const response = await fetch(weatherUrl);
        const data = await response.json();

        const weather = data.current_weather;
        resultDiv.innerHTML = `
            <h3>${location.name}, ${location.country}</h3>
            <p>Temperature: ${weather.temperature} °C</p>
            <p>Wind Speed: ${weather.windspeed} km/h</p>
            <p>Weather Code: ${weather.weathercode}</p>
            <p>Time: ${weather.time}</p>
            <p>Latitude: ${location.latitude}</p>
            <p>Longitude: ${location.longitude}</p>
            <p>Timezone: ${location.timezone}</p>
        `;

    } catch (error) {
        resultDiv.innerHTML = "Error: " + error.message;
    }
}
document.getElementById("getWeatherBtn").addEventListener("click", getWeather);



