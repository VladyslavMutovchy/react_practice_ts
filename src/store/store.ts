// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import storeAbout from './storeAbout';
import storeTaskList from './storeTaskList';
import storeAdminList from './storeAdminList';
import storeAuth from './storeAuth'



const store = configureStore({
  reducer: {
    storeAuth,
    storeAbout,
    storeTaskList,
    storeAdminList,
  },
  // Можно добавить middleware, если это необходимо
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
