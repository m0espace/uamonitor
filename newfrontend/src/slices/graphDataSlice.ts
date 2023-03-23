import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphServer } from '../interfaces';

interface InitialState {
  data: GraphServer[];
}

const initialState = { data: [] } as InitialState;

export const graphDataSlice = createSlice({
  name: 'graphData',
  initialState,
  reducers: {
    fetchData: (state, action: PayloadAction<GraphServer[]>) => {
      state.data = action.payload;
    },
  },
});

export const { fetchData } = graphDataSlice.actions;

export const selectGraphData = (state: RootState) => state.graphData;

export default graphDataSlice.reducer;
