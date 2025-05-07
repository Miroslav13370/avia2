import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'checkFilterTransfer',
  initialState: {
    all: true,
    noTransfers: true,
    oneTransfer: true,
    twoTransfer: true,
    threeTransfer: true,
  },

  reducers: {
    toggleFilterTransfer(state, action) {
      switch (action.payload) {
        case 'noTransfers':
          if (state.noTransfers) {
            if (state.all) {
              state.all = false;
            }
          }
          if (!state.noTransfers && state.oneTransfer && state.twoTransfer && state.threeTransfer) {
            state.all = true;
          }
          state.noTransfers = !state.noTransfers;
          break;
        case 'oneTransfer':
          if (state.oneTransfer) {
            if (state.all) {
              state.all = false;
            }
          }
          if (state.noTransfers && !state.oneTransfer && state.twoTransfer && state.threeTransfer) {
            state.all = true;
          }
          state.oneTransfer = !state.oneTransfer;
          break;
        case 'twoTransfer':
          if (state.twoTransfer) {
            if (state.all) {
              state.all = false;
            }
          }
          if (state.noTransfers && state.oneTransfer && !state.twoTransfer && state.threeTransfer) {
            state.all = true;
          }
          state.twoTransfer = !state.twoTransfer;
          break;
        case 'threeTransfer':
          if (state.threeTransfer) {
            if (state.all) {
              state.all = false;
            }
          }
          if (state.noTransfers && state.oneTransfer && state.twoTransfer && !state.threeTransfer) {
            state.all = true;
          }
          state.threeTransfer = !state.threeTransfer;
          break;
        case 'all': {
          if (state.all) {
            state.all = false;
            state.noTransfers = false;
            state.oneTransfer = false;
            state.twoTransfer = false;
            state.threeTransfer = false;
          } else {
            state.all = true;
            state.noTransfers = true;
            state.oneTransfer = true;
            state.twoTransfer = true;
            state.threeTransfer = true;
          }

          break;
        }
        default:
          break;
      }
    },
  },
});

export default slice.reducer;

export const { toggleFilterTransfer } = slice.actions;
