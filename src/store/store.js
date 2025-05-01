import { configureStore } from '@reduxjs/toolkit';
import filterTransfer from './sliceFilterTransfer';

export default configureStore({
  reducer: {
    transfer: filterTransfer,
  },
});
