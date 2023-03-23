import { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

interface ThemeInitialState {
  theme: 'light' | 'dark';
}

const initialState = { theme: 'light' } as ThemeInitialState;

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
