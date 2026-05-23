import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { fetchLocationData } from '../store/actions'
import search from '../theme/icons/search.png'

const debounce = require('lodash.debounce')

const Search = ({ userLocation }) => {
  const dispatch = useDispatch()

  // initially the app will render showing the user's location weather
  useEffect(() => {
    dispatch(fetchLocationData(userLocation))
  }, [dispatch, userLocation])

  const handleSearchLocation = useMemo(
    () => debounce((e) => {
      const place = e.target.value
      if (place.length >= 3) {
        dispatch(fetchLocationData(place))
      }
    }, 1000),
    [dispatch]
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
