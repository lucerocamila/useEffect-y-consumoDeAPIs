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

    // data
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
    const mainy = String(main)

    return (
        <div className='weather-card'>
            <div className="header"> 
            <div className="container-sky">
                    {main}
                </div>
                <span className='city'><i className="fa-solid fa-location-dot"></i> {city}, {country}</span>
            </div>
            <div className="info-temperature">
                <div className="container-img">
                    <img className='icon-weather' src={iconURL} alt="ícon-weather" />
                </div>
                <div className="container-degrees">
                    <span className='temperature'>{isCelsius ? `${celsius}°C` : `${farenheit}°F`}</span>
                    <button onClick={changeTemperatureUnit} className='btn-change'>{isCelsius ? `Change to °F` : `Change to °C`}</button>
                </div>
            </div>
            <h2>  Today's</h2>
            <div className="aditional-info">
                <div className="container-main">
                    <span><b>Condition</b></span>
                    <i class="fa-brands fa-skyatlas"></i>
                    <br />
                    <span>{description}</span>
                </div>
                <div className="container-humidity">
                    <span><b>Humidity</b></span>
                    <i class="fa-solid fa-droplet"></i>
                    <br />
                    <span>{humidity}%</span>
                </div>
                <div className="container-wind">
                    <span><b>Wind</b></span>
                    <i class="fa-solid fa-wind"></i>
                    <br />
                    <span>{wind}km/h</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;