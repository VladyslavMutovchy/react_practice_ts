// store/storeAbout.ts

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { adminListAPI  } from '../api/adminlist';

export const saveValue = createAsyncThunk(
  'storeAbout/saveValue',
  async (dataItem) => {
    const newDataItem = await adminListAPI.add(dataItem);
    return newDataItem;
  }
)

interface AdminListState {
  dataList: [];
  status: string;
}

const initialState: AdminListState = {
  dataList: [],
  status: 'idle',
};

const storeAdminList = createSlice({
  name: 'storeAbout',
  initialState,
  reducers: {
    // async saveValue(dataItem: any) {
    //   const newDataItem = await adminListAPI.add(dataItem);
    // },
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
  extraReducers: (builder) => {
    builder
      .addCase(saveValue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveValue.fulfilled, (state: any, action: any) => {
        state.status = 'succeeded';
        console.log('===action.payload', action.payload);
        state.dataList = [action.payload];
        // state.dataList.push(action.payload);
      })
      .addCase(saveValue.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { 
  getData,
  cleanAll,
  deleteValue,
  editValue,
  saveSkillValue,
  deleteSkillValue,
  editSkillValue, 
} = storeAdminList.actions;

export default storeAdminList.reducer;
