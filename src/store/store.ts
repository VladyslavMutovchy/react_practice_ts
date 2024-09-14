import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Пример простого слайса для редукса
const store = configureStore({
  reducer: {
    // Добавь свои редьюсеры здесь
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
