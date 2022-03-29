import { configureStore } from "@reduxjs/toolkit"
import locationReducer from './slice/location'
import weatherReducer from './slice/weather'
import themeReducer from './slice/theme'

const store = configureStore({
  reducer: {
    location: locationReducer,
    weather: weatherReducer,
    theme: themeReducer
  }
})

export default store
