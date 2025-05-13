import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: true,
  noTransfers: true,
  oneTransfer: true,
  twoTransfer: true,
  threeTransfer: true,
};

const transferKeys = ['noTransfers', 'oneTransfer', 'twoTransfer', 'threeTransfer'];

const slice = createSlice({
  name: 'checkFilterTransfer',
  initialState,
  reducers: {
    toggleFilterTransfer(state, action) {
      const key = action.payload;

      if (key === 'all') {
        const newValue = !state.all;
        state.all = newValue;
        transferKeys.forEach((k) => {
          state[k] = newValue;
        });
      } else if (transferKeys.includes(key)) {
        state[key] = !state[key];

        const allActive = transferKeys.every((k) => state[k]);
        state.all = allActive;
      }
    },
  },
});

export const { toggleFilterTransfer } = slice.actions;
export default slice.reducer;
export const selectTransfer = (state) => state.transfer;
