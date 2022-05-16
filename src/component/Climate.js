import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Climate = () => {
    const [apiData, setApiData] = useState({})
    
    const [temp, setTemp] = useState(0)
    const [isCel, setIsCel] = useState(true)

    useEffect(() => {
        const success = async (pos) => {

            const latitude = pos.coords.latitude;

            const longitude = pos.coords.longitude;

            try {
                
                const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4a56ff9734c9b8d960818ce6f8fa3662`)
                console.log(data)

                const weatherData = {
                    name: data.name,
                    temp: data.main.temp,
                    country: data.sys.country,
                    icon: data.weather[0].icon,
                    pressure: data.main.pressure,
                    speed: data.wind.speed,
                    clouds:  data.clouds.all
                    
                }
                setTemp(() => (weatherData.temp - 273.15).toFixed(2))
                setApiData(weatherData)
            } catch (err) {
                console.log(err)
            }
        }
        navigator.geolocation.getCurrentPosition(success);
    }, [])

    const convert = (isConvert) => {
        const gradosC= (apiData.temp - 273.15).toFixed(2);
        if (isConvert) {
            //celsiu
            setTemp(gradosC)
            return  setIsCel(!isConvert)
        }
        //fare
        setTemp(((gradosC*1.8)+32).toFixed(2))
        return setIsCel(!isConvert)


    }

    return (
        <div className='card'>
            <div className='container-climate'>

                <h1>Weather App</h1>
                <h3>{apiData.name} {apiData.country}</h3>

                <div className='image'>

                    <img src={`http://openweathermap.org/img/wn/${apiData.icon}@2x.png`}></img>

                    <h3>{temp}</h3>
                    <ul>
                        <li><b>clouds </b> {apiData.clouds}</li>
                        <li><b>wind speed </b> {apiData.speed}</li>
                        <li><b>pressure </b> {apiData?.pressure}</li>
                    </ul>
                </div>

                <button onClick={() => convert(isCel)}>degress ºF/ºC</button>



            </div>

        </div>
    );
};

export default Climate;