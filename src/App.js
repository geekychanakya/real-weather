import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchLocationData } from './store/actions'
import Weather from './components/weather';
import Loading from './components/loading';

function App() {
  const theme = useSelector(state => state.theme)
  const weather = useSelector(state => state.weather)
  const dispatch = useDispatch()
  const [location, setLocation] = useState(null)
  const [locationReady, setLocationReady] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(fetchCurrentLocation, locationError);
  }, [])

  const fetchCurrentLocation = (position) => {
    const loc = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setLocation(loc)
    dispatch(fetchLocationData(loc))
    setLocationReady(true)
  }

  const locationError = () => {
    console.log('User denied Geolocation request.')
    const loc = { lat: 12.9767936, lon: 77.590082 }
    setLocation(loc)
    dispatch(fetchLocationData(loc))
    setLocationReady(true)
  }

  const isLoading = !locationReady || !weather.temperature

  return (
    <div className={`app-container ${theme.currentTheme}`}>
      { isLoading ? <Loading /> : <Weather userLocation={location} /> }
    </div>
  );
}

export default App;
