import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sliceTiketFilterPrice',
  initialState: {
    cheap: true,
    fast: false,
    optimum: false,
  },
  reducers: {
    changeFilter(state, action) {
      if (action.payload === 'cheap') {
        state.fast = false;
        state.optimum = false;
        state.cheap = true;
      }
      if (action.payload === 'fast') {
        state.fast = true;
        state.optimum = false;
        state.cheap = false;
      }
      if (action.payload === 'optimum') {
        state.fast = false;
        state.optimum = true;
        state.cheap = false;
      }
    },
  },
});
export const { changeFilter } = slice.actions;
export default slice.reducer;
