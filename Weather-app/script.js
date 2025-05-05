const fetchWeather = async () => {
    const searchInput = document.getElementById('search').value.trim();
    const weatherDataSection = document.getElementById('weather-data');
    weatherDataSection.style.display = 'block';

    const apiKey = 'cb548dddc51a7f49bc15c745e66c72d5'; // Remember to replace this before pushing!

    if (searchInput === '') {
        alert('Please write down a city name first!');
        return;
    }

    const getLonAndLat = async () => {
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchInput)}&limit=1&appid=${apiKey}`;
        try {
            const response = await fetch(geocodeURL);
            if (!response.ok) throw new Error(`Bad response: ${response.status}`);
            const data = await response.json();
            if (data.length === 0) {
                alert('Please try again with a valid input.');
                return null;
            }
            return data[0];
        } catch (error) {
            console.error('Error fetching geocode data:', error);
            return null;
        }
    };

    const getWeatherData = async (lon, lat) => {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        try {
            const response = await fetch(weatherURL);
            if (!response.ok) throw new Error(`Bad response: ${response.status}`);
            const data = await response.json();
            weatherDataSection.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" 
                     alt="${data.weather[0].description}" width="100" />
                <div>
                    <h2>${data.name}</h2>
                    <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
                    <p><strong>Description:</strong> ${data.weather[0].description}</p>
                </div>
            `;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const geocodeData = await getLonAndLat();
    if (geocodeData) {
        await getWeatherData(geocodeData.lon, geocodeData.lat);
    }
    document.getElementById('search').value = '';
    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
    <div>
    <h2>${data.name}</h2>
    <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
    </div>
    `;
    
};
