import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchKey = createAsyncThunk('tiketList/fetchKey', async function a(_, { getState }) {
  const key = getState().tikets.tiketKey;
  if (!key) {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    const resJson = await res.json();
    return resJson.searchId;
  }
  return key;
});

const slice = createSlice({
  name: 'tiketList',
  initialState: {
    tiketList: [],
    progressLoad: 0,
    tiketKey: null,
    isStop: false,
    filteredList: [],
    fullTiketList: null,
    isLoad: false,
  },
  reducers: {
    filter(state, action) {
      if (action.payload === 'noTransfers') {
        const arr = state.fullTiketList.filter((elem) => {
          if (elem.segments[0].stops.length === 0 || elem.segments[1].stops.length === 0) {
            return true;
          }
          return false;
        });
        state.filteredList.push(...arr);
      }
      if (action.payload === 'oneTransfer') {
        const arr = state.fullTiketList.filter((elem) => {
          if (elem.segments[0].stops.length === 1 || elem.segments[1].stops.length === 1) {
            return true;
          }
          return false;
        });
        state.filteredList.push(...arr);
      }
      if (action.payload === 'twoTransfer') {
        const arr = state.fullTiketList.filter((elem) => {
          if (elem.segments[0].stops.length === 2 || elem.segments[1].stops.length === 2) {
            return true;
          }
          return false;
        });
        state.filteredList.push(...arr);
      }
      if (action.payload === 'threeTransfer') {
        const arr = state.fullTiketList.filter((elem) => {
          if (elem.segments[0].stops.length === 3 || elem.segments[1].stops.length === 3) {
            return true;
          }
          return false;
        });
        state.filteredList.push(...arr);
      }

      if (action.payload === '!noTransfers') {
        const arr1 = state.fullTiketList.filter((elem) => {
          if (elem.segments[0].stops.length === 0 || elem.segments[1].stops.length === 0) {
            return false;
          }
          return true;
        });
        const arr2 = state.filteredList.filter((elem) => {
          if (elem.segments[0].stops.length === 0 || elem.segments[1].stops.length === 0) {
            return false;
          }
          return true;
        });
        state.filteredList = [...arr1, ...arr2];
      }
      if (action.payload === '!oneTransfer') {
        const arr1 = state.fullTiketList.filter((elem) => {
          if (elem.segments[0].stops.length === 1 || elem.segments[1].stops.length === 1) {
            return false;
          }
          return true;
        });
        const arr2 = state.filteredList.filter((elem) => {
          if (elem.segments[0].stops.length === 1 || elem.segments[1].stops.length === 1) {
            return false;
          }
          return true;
        });
        state.filteredList = [...arr1, ...arr2];
      }
      if (action.payload === '!twoTransfer') {
        const arr1 = state.fullTiketList.filter((elem) => {
          if (elem.segments[0].stops.length === 2 || elem.segments[1].stops.length === 2) {
            return false;
          }
          return true;
        });
        const arr2 = state.filteredList.filter((elem) => {
          if (elem.segments[0].stops.length === 2 || elem.segments[1].stops.length === 2) {
            return false;
          }
          return true;
        });
        state.filteredList = [...arr1, ...arr2];
      }
      if (action.payload === '!threeTransfer') {
        const arr1 = state.fullTiketList.filter((elem) => {
          if (elem.segments[0].stops.length === 3 || elem.segments[1].stops.length === 3) {
            return false;
          }
          return true;
        });
        const arr2 = state.filteredList.filter((elem) => {
          if (elem.segments[0].stops.length === 3 || elem.segments[1].stops.length === 3) {
            return false;
          }
          return true;
        });
        state.filteredList = [...arr1, ...arr2];
      }
    },
    incrementCount(state) {
      state.counterFetch += 1;
    },
    addTik(state, action) {
      state.tiketList.push(...action.payload);
      state.progressLoad += 1;
    },
    toggleStop(state) {
      state.fullTiketList.push(...state.tiketList);
      state.isStop = true;
    },
    addOnelist(state, action) {
      state.isLoad = true;
      state.fullTiketList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchKey.fulfilled, (state, action) => {
      if (!state.tiketKey) {
        state.tiketKey = action.payload;
      }
    });
  },
});

export const { incrementCount, addTik, toggleStop, addOnelist, filter } = slice.actions;

export default slice.reducer;

export const fetchList = createAsyncThunk(
  'tiketList/fetchList',
  async function b(_, { getState, dispatch }) {
    try {
      const key = getState().tikets.tiketKey;
      const oneList = getState().tikets.fullTiketList;
      const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${key}`);
      const resJson = await res.json();
      if (!resJson.stop) {
        if (!oneList) {
          dispatch(addOnelist(resJson.tickets));
          b(_, { getState, dispatch });
        } else {
          dispatch(addTik(resJson.tickets));
          b(_, { getState, dispatch });
        }
      } else {
        dispatch(toggleStop());
      }
      return resJson;
    } catch (e) {
      const stop = getState().tikets.isStop;
      if (!stop) {
        b(_, { getState, dispatch });
      }
      return '';
    }
  },
);
