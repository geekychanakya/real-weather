import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import Weather from './components/weather';
import Loading from './components/loading';

function App() {
  const theme = useSelector(state => state.theme)
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(fetchCurrentLocation, locationError);
  }, [])

  const fetchCurrentLocation = (position) => {
    setLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    })
    setTimeout(() => {
      setLoading(false)
    }, 10)
  }

  const locationError = () => {
    console.log('User denied Geolocation request.')
    setLocation({
      lat: 12.9767936,
      lon: 77.590082
    })
    setTimeout(() => {
      setLoading(false)
    }, 10)
  }

  return (
    <div className={`app-container ${theme.currentTheme}`}>
      { loading ? <Loading /> : <Weather userLocation={location} /> }
    </div>
  );
}

export default App;
