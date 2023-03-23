import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Server } from '../interfaces';
import { RootState } from '@/store';

interface InitialState {
  data: Server[];
}

const initialState = { data: [] } as InitialState;

const serverDataSlice = createSlice({
  name: 'serverData',
  initialState,
  reducers: {
    setServersData: (state, action: PayloadAction<Server[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setServersData } = serverDataSlice.actions;

export const selectServersData = (state: RootState) => state.servers;

export default serverDataSlice.reducer;
