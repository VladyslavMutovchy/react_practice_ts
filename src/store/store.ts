// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import storeAbout from './storeAbout';

const name:String = 'Vasya';
const store = configureStore({
  reducer: {
    storeAbout,
  },
  // Можно добавить middleware, если это необходимо
});

type person = {
  age: number;
  name: string;
};

// const testFunction = ():person => {
const testFunction = ():person => {
  return {
    name: 'Vasya',
    age: 20,
  };
}

type testFunctionType = ReturnType<typeof testFunction>;

const secondPerson:testFunctionType = {
  name: 'Vasya',
  age: 20,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
