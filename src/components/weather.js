import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import Search from './search'
import sunny from '../theme/icons/sunny.png'
import cloudy from '../theme/icons/cloudy.png'
import moon from '../theme/icons/moon.png'
import nightCloudy from '../theme/icons/night-cloudy.png'
import rainy from '../theme/icons/rainy.png'
import storm from '../theme/icons/storm.png'
import heart from '../theme/icons/heart.png'
import haze from '../theme/icons/haze.png'

const Weather = () => {
  const location = useSelector(state => state.location)
  const weather = useSelector(state => state.weather)

  const [windowDimensions, setWindowDimensions] = useState(1024);

  useEffect(() => {
    setWindowDimensions(window.screen.width)
  }, []);
  
  const getIcon = (item) => {
    let icon = sunny
    const checkHours = parseInt(item.time.split(':', 1)[0])

    if (item.weather.includes('Clear')) {
      icon = (checkHours > 5 && checkHours < 17) ? sunny : moon
    } else if (item.weather.includes('Cloud')) {
      icon = (checkHours > 5 && checkHours < 17) ? cloudy : nightCloudy
    } else if (item.weather.includes('Rain')) {
      icon = rainy
    } else if (item.weather.includes('Haze') || item.weather.includes('Smoke')) {
      icon = haze
    } else {
      icon = storm
    }

    return icon
  }

  return (
    <>
      <div className="h-screen px-8 md:px-20 lg:px-64">
        <div className="grid md:hidden relative w-full items-stretch pt-6">
          <Search />
        </div>
        <div className="grid md:grid-cols-2 gap-10 justify-items-center md:justify-items-start">
          <div className="grid grid-rows-2 grid-flow-rows gap-0 py-4 md:py-8">
            <div className="text-3xl lg:text-4xl">
              <span>{location.place},</span>
              <span className="px-2">{location.country}</span>
            </div>
            <div className="text-base md:text-lg">
              <span>{weather.today}</span>
              <span className="pl-4 pr-2">{weather.date}</span>
              <span className="pl-2">{weather.time}</span>
              <span> (hours)</span>
            </div>
          </div>
          <div className="hidden md:grid relative w-full items-stretch mt-10">
            <Search />
          </div>
        </div>
        <div className="grid grid-rows-4 grid-flow-col gap-4 hidden md:grid">
          <div className="row-span-4">
            <div className="grid grid-rows-4 grid-flow-col gap-4">
              <div className="row-span-3">
                <img src={getIcon(weather)} alt='Icon' className="h-20 w-20 lg:h-40 lg:w-40" />
              </div>
              <div className="row-span-2 col-span-2">
                <span className="text-4xl lg:text-6xl">{weather.temperature.toFixed(1)} °</span>
              </div>
              <div className="row-span-1 col-span-2">
                <span className="text-2xl">{weather.weather}</span>
              </div>
            </div>
          </div>

          <div className="row-span-2 col-span-2">
            <div className="grid grid-cols-3 gap-10 pl-4">
              <div>
                <div className="row-span-1">
                  <span className="text-xl lg:text-2xl">{weather.humidity}</span> %
                </div>
                <div className="row-span-1">
                  Humidity
                </div>
              </div>
              <div>
                <div className="row-span-1 text-xl lg:text-2xl">
                  {weather.windDeg} °
                </div>
                <div className="row-span-1">
                  Wind Degree
                </div>
              </div>
              <div>
                <div className="row-span-1">
                  <span className="text-xl lg:text-2xl">{weather.pressure}</span> mb
                </div>
                <div className="row-span-1">
                  Pressure
                </div>
              </div>
            </div>
          </div>
          <div className="row-span-2 col-span-2">
            <div className="grid grid-cols-3 gap-10 pl-4">
              <div>
                <div className="row-span-1 text-xl lg:text-2xl">
                  {weather.feelsLike.toFixed(1)} °
                </div>
                <div className="row-span-1">
                  Feels Like
                </div>
              </div>
              <div>
                <div className="row-span-1">
                  <span className="text-xl lg:text-2xl">{weather.windSpeed}</span> km/h
                </div>
                <div className="row-span-1">
                  Wind Speed
                </div>
              </div>
              <div>
                <div className="row-span-1 text-xl lg:text-2xl">
                  {weather.uvi}
                </div>
                <div className="row-span-1">
                  UVI
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-4 justify-items-center pb-8 md:hidden">
          <div className="row-span-3 col-span-2">
            <img src={getIcon(weather)} alt='Icon' className="h-40 w-40" />
          </div>
          <div className="row-span-1 col-span-2 pt-2">
            <span className="text-4xl">{weather.temperature.toFixed(1)} °</span>
          </div>
          <div className="row-span-1 col-span-2">
            <span className="text-2xl">{weather.weather}</span>
          </div>
        </div>

        <p className="hidden md:grid py-6 text-lg">Today's Weather</p>
        <div className="grid grid-cols-5 md:grid-cols-6 gap-4 lg:gap-8 text-xs md:text-base lg:text-lg">
          {
            weather.hourlyData.map((hour, index) => {
              return index <= (windowDimensions > 450 ? 5 : 4) ? (
                <div key={hour.time} className="grid border-solid border-2 border-transparent md:shadow-sm lg:shadow-md gap-1 md:gap-2 rounded-md justify-items-center">
                  <p className="py-2">{hour.time}</p>
                  <img src={getIcon(hour)} alt='Sunny' className="h-8 w-8 md:h-12 md:w-12" />
                  <p className="pt-2">{hour.temperature.toFixed(1)} °</p>
                  <p className="pb-2">{hour.weather}</p>
                </div>
              ): null
            })
          }
        </div>
      </div>
      <div className="text-center p-4 text-base bg-slate-50">
        <span>© 2022 - Made with <span className='px-1'><img src={heart} alt='Heart' className="h-4 w-4 inline" /></span> in India | </span>
        <a className='text-cyan-700' href="https://arnabsaha.in/">Arnab Saha</a>
      </div>
    </>
  )
}

export default Weather
