// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import storeAbout from './storeAbout';
import storeTaskList from './storeTaskList';



const store = configureStore({
  reducer: {
    storeAbout,
    storeTaskList
  },
  // Можно добавить middleware, если это необходимо
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
