// store/storeAbout.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  data: string | null;
  name: string | null;
}

const initialState: DataState = {
  data: null,
  name: 'Dima',
};

const storeAboutSlice = createSlice({
  name: 'storeAbout',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<string>) {
      state.data = action.payload;
    },
    clearData(state) {
      state.data = null;
    },
  },
});

export const { setData, clearData } = storeAboutSlice.actions;
export default storeAboutSlice.reducer;
