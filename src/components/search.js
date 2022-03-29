import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchLocationData } from '../store/actions'
import search from '../theme/icons/search.png'

// debounce to hold the typed input for sometime
let debounce = require('lodash.debounce')

const Search = () => {
  const dispatch = useDispatch()

  // initially the app will render showing Bangalore's weather
  useEffect(() => {
    dispatch(fetchLocationData('Bengaluru'))
  }, [dispatch])

  const searchLocation = (e) => {
    let place = e.target.value
    if (place.length >= 3) dispatch(fetchLocationData(e.target.value))
  }

  // useCallback to cache the repetative input
  const handleSearchLocation = useCallback(
    debounce(searchLocation, 1000),
    []
  );

  return (
    <div>
      <input type="text" placeholder="Enter min 3 characters..." onChange={handleSearchLocation} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
      <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
        <img src={search} alt='Sunny' className="h-5" />
      </span>
    </div>
  )
}

export default Search
