import { configureStore } from '@reduxjs/toolkit'
import actionSlice from './slices/actionSlice';
import documentSlice from './slices/documentSlice';

const reducer = {
   document: documentSlice,
   action: actionSlice
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;