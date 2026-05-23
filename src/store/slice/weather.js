import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  temperature: 0,
  weather: '',
  date: '',
  time: '',
  today: '',
  hourlyData: [],
  dailyData: [],
  humidity: 0,
  feelsLike: 0,
  windDeg: 0,
  windSpeed: 0,
  pressure: 0,
  visibility: 0
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherDetails(state, action) {
      state.temperature = action.payload.current.temp - 273.15
      state.humidity = action.payload.current.humidity
      state.weather = action.payload.current.weather[0].main
      state.date = action.payload.currentDate
      state.time = action.payload.currentTime
      state.hourlyData = action.payload.hourlyData
      state.today = action.payload.today
      state.humidity = action.payload.current.humidity
      state.feelsLike = action.payload.current.feels_like - 273.15
      state.windDeg = action.payload.current.wind_deg
      state.windSpeed = action.payload.current.wind_speed
      state.pressure = action.payload.current.pressure
      state.visibility = action.payload.current.visibility
    },
    fetchSevenDaysData(state, action) {
      // raw forecast.list from /data/2.5/forecast
      const dailyMap = {}
      action.payload.forEach(item => {
        const dateString = item.dt_txt.split(' ')[0]
        if (!dailyMap[dateString]) {
          dailyMap[dateString] = {
            dt: item.dt,
            tempMin: item.main.temp_min,
            tempMax: item.main.temp_max,
            weather: item.weather[0].main
          }
        } else {
          if (item.main.temp_min < dailyMap[dateString].tempMin) dailyMap[dateString].tempMin = item.main.temp_min
          if (item.main.temp_max > dailyMap[dateString].tempMax) dailyMap[dateString].tempMax = item.main.temp_max
        }
      })
      state.dailyData = Object.values(dailyMap).map(day => ({
        dt: day.dt,
        tempMin: day.tempMin - 273.15,
        tempMax: day.tempMax - 273.15,
        weather: day.weather
      }))
    }
  }
})

export const weatherActions = weatherSlice.actions
export default weatherSlice.reducer
