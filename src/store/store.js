import { configureStore } from '@reduxjs/toolkit';
import filterTransfer from './sliceFilterTransfer';
import tiketsList from './sliceTikets';

export default configureStore({
  reducer: {
    transfer: filterTransfer,
    tikets: tiketsList,
  },
});
