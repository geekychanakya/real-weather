import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  temperature: 0,
  weather: '',
  date: '',
  time: '',
  today: '',
  hourlyData: [],
  humidity: 0,
  feelsLike: 0,
  windDeg: 0,
  windSpeed: 0,
  pressure: 0,
  uvi: 0
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
      state.uvi = action.payload.current.uvi
    }
  }
})

export const weatherActions = weatherSlice.actions
export default weatherSlice.reducer
