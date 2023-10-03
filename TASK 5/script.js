document.addEventListener("DOMContentLoaded", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const apiKey = "33209d56e18945068db172753230310";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                const weatherInfo = document.getElementById("weather-info");
                weatherInfo.innerHTML = `
                    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;
            } catch (error) {
                console.error("Error fetching weather data:", error);
                const weatherInfo = document.getElementById("weather-info");
                weatherInfo.innerHTML = `<p>Failed to fetch weather data</p>`;
            }
        }, (error) => {
            console.error("Error getting location:", error);
            const weatherInfo = document.getElementById("weather-info");
            weatherInfo.innerHTML = `<p>Failed to get user location</p>`;
        });
    } else {
        const weatherInfo = document.getElementById("weather-info");
        weatherInfo.innerHTML = `<p>Geolocation is not supported by your browser</p>`;
    }
});
