import React, { useState } from 'react';
import api from '../api';

export default function WeatherWidget() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const fetchWeather = () => {
        api.get(`/weather/fetch?city=${city}`)
            .then(res => setWeather(res.data))
            .catch(err => {
                console.error(err);
                alert("Could not fetch weather");
            });
    };

    return (
        <div>
            <h2>Weather</h2>
            <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
            <button onClick={fetchWeather}>Get Weather</button>
            {weather && (
                <div>
                    <p>{weather.city}: {weather.temperature}°C - {weather.weather}</p>
                </div>
            )}
        </div>
    );
}
