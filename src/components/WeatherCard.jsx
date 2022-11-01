import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherCard = () => {
    const [location, setLocation] = useState({});
    const [isCelsius, setIsCelsius] = useState(true);

    useEffect(() => {
        const success = pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const key = '416f27cdd110df849d865b0d0b52e766';
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
                .then(res => setLocation(res.data));
        }
        navigator.geolocation.getCurrentPosition(success);
    }, [])

    const changeTemperatureUnit = () => {
        if(isCelsius) {
            setIsCelsius(!isCelsius);
        } else {
            setIsCelsius(!isCelsius);
        }
    }

    // datos
    const country = location.sys?.country;
    const city = location.name;

    const icon = location.weather?.[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const temperature = location.main?.temp;
    const celsius = Math.round(temperature - 273.15);
    const farenheit = Math.round((celsius * (9/5)) + 32);
    
    const main = location.weather?.[0].main;
    const description = location.weather?.[0].description;
    const humidity = location.main?.humidity;
    const wind = location.wind?.speed;

    return (
        <div className='weather-card'>
            <div className="header">
                <span className='city'><i className="fa-solid fa-location-dot"></i> {city}, {country}</span>
            </div>
            <div className="info-temperature">
                <div className="container-img">
                    <img className='icon-weather' src={iconURL} alt="ícon-weather" />
                </div>
                <div className="container-degrees">
                    <span className='temperature'>{isCelsius ? `${celsius}°C` : `${farenheit}°F`}</span>
                    <button onClick={changeTemperatureUnit} className='btn-change'>{isCelsius ? `to farenheit` : `to celsius`}</button>
                </div>
            </div>
            <div className="aditional-info">
                <div className="container-main">
                    <span><b>{main}</b></span>
                    <span>{description}</span>
                </div>
                <div className="container-humidity">
                    <span><b>Humidity</b></span>
                    <span>{humidity}%</span>
                </div>
                <div className="container-wind">
                    <span><b>Wind</b></span>
                    <span>{wind} km/h</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;