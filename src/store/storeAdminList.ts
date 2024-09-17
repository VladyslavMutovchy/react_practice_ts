// store/storeAbout.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminListState {
  dataList: [] | null;
}

const initialState: AdminListState = {
  dataList: [],
};

const storeAdminList = createSlice({
  name: 'storeAbout',
  initialState,
  reducers: {
    saveValue() {
      
    },
    getData() {
      
    },
    cleanAll() {
      
    },
    deleteValue() {
      
    },
    editValue() {
      
    },
    saveSkillValue() {
      
    },
    deleteSkillValue() {
      
    },
    editSkillValue() {
      
    },
  },
});

export const { 
  saveValue,
  getData,
  cleanAll,
  deleteValue,
  editValue,
  saveSkillValue,
  deleteSkillValue,
  editSkillValue, 
} = storeAdminList.actions;

export default storeAdminList.reducer;
