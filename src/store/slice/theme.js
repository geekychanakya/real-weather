import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentTheme: 'theme-sunny'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme(state, action) {
      state.currentTheme = action.payload
    }
  }
})

export const themeActions = themeSlice.actions
export default themeSlice.reducer
