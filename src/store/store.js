import { configureStore } from '@reduxjs/toolkit';
import filterTransfer from './sliceFilterTransfer';
import tiketsList from './sliceTikets';
import sliceTiketFilterPrice from './sliceTiketFilterPrice';

export default configureStore({
  reducer: {
    transfer: filterTransfer,
    tikets: tiketsList,
    price: sliceTiketFilterPrice,
  },
});
