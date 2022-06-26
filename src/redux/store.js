import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import actionSlice from './slices/actionSlice';
import authSlice from './slices/authSlice';
import classSlice from './slices/classSlice';
import documentSlice from './slices/documentSlice';
import lectureSlice from './slices/lectureSlice';
import projectSlice from './slices/projectSlice';
import semesterSlice from './slices/semesterSlice';
import studentSlice from './slices/studentSlice';
import subjectSlice from './slices/subjectSlice';

const reducer = {
   document: documentSlice,
   action: actionSlice,
   subject: subjectSlice,
   auth: authSlice,
   lecture: lectureSlice,
   student: studentSlice,
   semester: semesterSlice,
   project: projectSlice,
   class: classSlice,
}

// const store = configureStore({
//   reducer: reducer,
//   devTools: true,
// })

// export default store;
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers(reducer);

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
})
export let persistor = persistStore(store)