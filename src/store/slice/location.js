import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  place: 'Bengaluru',
  country: 'IN'
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    fetchLatLongByName(state, action) {
      state.place = action.payload.name
      state.country = action.payload.country
    }
  }
})

export const locationActions = locationSlice.actions
export default locationSlice.reducer
