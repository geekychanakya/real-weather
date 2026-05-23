import { locationActions } from './slice/location'
import { weatherActions } from './slice/weather'
import { themeActions } from './slice/theme'
import { formatDateTime } from '../helper/date-formatter'

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
      let location = []
      // fetch the lat-long based on the input location
      if (!place.lat) {
        location = await fetchData(`${REACT_APP_OPEN_WEATHER_BASE}/geo/1.0/direct?q=${place}&limit=1&appid=${REACT_APP_OPEN_WEATHER_KEY}`)
      } else {
        location = await fetchData(`${REACT_APP_OPEN_WEATHER_BASE}/geo/1.0/reverse?lat=${place.lat}&lon=${place.lon}&limit=1&appid=${REACT_APP_OPEN_WEATHER_KEY}`)
      }
      dispatch(locationActions.fetchLatLongByName(location[0]))
      const { lat, lon } = location[0]
      // trigger both weather and 7-day forecast independently in parallel
      dispatch(fetchSevenDaysData(lat, lon))
      try {
        // fetch weather based on lat-long
        const weather = await fetchData(`${REACT_APP_OPEN_WEATHER_BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${REACT_APP_OPEN_WEATHER_KEY}`)
        let formattedDateTime = formatDateTime(weather.timezone)
        let hourlyData = []
        let weatherData = {
          ...weather,
          current: {
            ...weather.main,
            weather: weather.weather,
            wind_speed: weather.wind ? weather.wind.speed : 0,
            wind_deg: weather.wind ? weather.wind.deg : 0,
            visibility: weather.visibility ?? 0
          },
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

export const fetchSevenDaysData = (lat, lon) => {
  return async (dispatch) => {
    try {
      const forecast = await fetchData(
        `${REACT_APP_OPEN_WEATHER_BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${REACT_APP_OPEN_WEATHER_KEY}`
      )
      dispatch(weatherActions.fetchSevenDaysData(forecast.list))
    } catch (error) {
      console.error('Could not fetch 5-day forecast data.', error)
    }
  }
}
