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
    tiketKey: null,
    isStop: false,
    fullTiketList: null,
    isLoad: false,
  },
  reducers: {
    incrementCount(state) {
      state.counterFetch += 1;
    },
    addTik(state, action) {
      state.tiketList.push(...action.payload);
    },
    toggleStop(state, action) {
      state.fullTiketList.push(...state.tiketList);
      state.isStop = true;
    },
    addOnelist(state, action) {
      state.isLoad = true;
      state.fullTiketList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchKey.pending, (state) => {})
      .addCase(fetchKey.fulfilled, (state, action) => {
        if (!state.tiketKey) {
          state.tiketKey = action.payload;
        }
      });
  },
});

export const { incrementCount, addTik, toggleStop, addOnelist } = slice.actions;

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
