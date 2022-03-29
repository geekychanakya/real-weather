import { locationActions } from './slice/location'
import { weatherActions } from './slice/weather'
import { themeActions } from './slice/theme'
import { formatDateTime, formatTime } from '../helper/date-formatter'

const { REACT_APP_OPEN_WEATHER_KEY, REACT_APP_OPEN_WEATHER_BASE } = process.env

const fetchData = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error fetching data..')
  }
  const data = await response.json()
  return data
}

export const fetchLocationData = (place) => {
  return async (dispatch) => {
    try {
      // fetch the lat-long based on the input location
      const location = await fetchData(`${REACT_APP_OPEN_WEATHER_BASE}/geo/1.0/direct?q=${place}&limit=1&appid=${REACT_APP_OPEN_WEATHER_KEY}`)

      dispatch(locationActions.fetchLatLongByName(location[0]))
      const { lat, lon } = location[0]

      try {
        // fetch weather based on lat-long
        const weather = await fetchData(`${REACT_APP_OPEN_WEATHER_BASE}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&appid=${REACT_APP_OPEN_WEATHER_KEY}`)

        let formattedDateTime = formatDateTime(weather.timezone)

        let hourlyData = weather.hourly.map((item, index) => {
          return ({
            time: formatTime(weather.timezone, index),
            temperature: item.temp - 273.15,
            weather: item.weather[0].main
          })
        })
        
        // customize  the weather data
        let weatherData = {
          ...weather,
          today: formattedDateTime.formattedDay,
          currentDate: formattedDateTime.formattedDate,
          currentTime: formattedDateTime.formattedTime,
          hourlyData
        }

        const checkHours = parseInt(weatherData.currentTime.split(':', 1)[0])
        if (checkHours > 5 && checkHours < 17) {
          if (weatherData.current.weather[0].main.includes('Clear')) {
            dispatch(themeActions.updateTheme('theme-sunny'))
          } else if (weatherData.current.weather[0].main.includes('Cloud') || weatherData.current.weather[0].main.includes('Haze') || weatherData.current.weather[0].main.includes('Smoke')) {
            dispatch(themeActions.updateTheme('theme-cloudy'))
          } else {
            dispatch(themeActions.updateTheme('theme-storm'))
          }
        } else {
          dispatch(themeActions.updateTheme('theme-night'))
        }

        dispatch(weatherActions.fetchWeatherDetails(weatherData))

      } catch (error) {
        // TODO: Show error modification
        dispatch(locationActions.fetchLatLongByName({
          name: 'Not Found',
          lat: 19.0759899,
          lon: 72.8773928,
          country: '404'
        }))
        
      }
    } catch (error) {
      dispatch(locationActions.fetchLatLongByName({
        name: 'Not Found',
        lat: 19.0759899,
        lon: 72.8773928,
        country: '404'
      }))
    }
  }
}
