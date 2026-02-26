async function getWeather(){
    const city = document.getElementById("city").value;
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        document.getElementById("weather").innerHTML = `
        
   
}