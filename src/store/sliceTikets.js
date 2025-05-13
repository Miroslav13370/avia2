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
    isLoad: false,
  },
  reducers: {
    addTik(state, action) {
      if (state.progressLoad === 0) state.isLoad = true;
      state.tiketList.push(...action.payload);
      state.progressLoad += 1;
    },
    toggleStop(state, action) {
      state.tiketList.push(...action.payload);
      state.isStop = true;
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

export const { addTik, toggleStop, addOnelist } = slice.actions;
export const selectIsLoad = (state) => state.tikets.isLoad;
export const selectTiketList = (state) => state.tikets.tiketList;

export default slice.reducer;

export const fetchList = createAsyncThunk(
  'tiketList/fetchList',
  async function b(_, { getState, dispatch }) {
    try {
      const key = getState().tikets.tiketKey;
      const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${key}`);
      const resJson = await res.json();
      if (!resJson.stop) {
        dispatch(addTik(resJson.tickets));
        b(_, { getState, dispatch });
      } else {
        dispatch(toggleStop(resJson.tickets));
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
