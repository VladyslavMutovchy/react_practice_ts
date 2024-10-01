import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminListAPI } from '../api/adminlist';


interface Skill {
  id: number;        
  datum_id: number;  
  value: string;     
}


interface Datum {
  id: number;          
  name: string;       
  age: number;        
  skills: Skill[];    
}

export const saveValue = createAsyncThunk(
  
  'storeAdminList/saveValue',
  async (dataItem: Datum) => {
    console.log('saveValue======>',dataItem);
    const newDataItem = await adminListAPI.add(dataItem);
    return { ...newDataItem, skills: [] }; 
  }
);

export const getData = createAsyncThunk(
  'storeAdminList/getData',
  async () => {
    const dataList = await adminListAPI.getAll();
    return dataList;
  }
);

export const cleanAll = createAsyncThunk(
  'storeAdminList/cleanAll',
  async () => {
    await adminListAPI.deleteAll();
  }
);

export const deleteValue = createAsyncThunk(
  'storeAdminList/deleteValue',
  async (id: number) => {
    await adminListAPI.deleteById(id);
    return id;
  }
);

export const editValue = createAsyncThunk(
  'storeAdminList/editValue',
  async (dataItem: Datum) => {
    const newDataItem = await adminListAPI.update(dataItem);
    return newDataItem;
  }
);

export const saveSkillValue = createAsyncThunk(
  'storeAdminList/saveSkillValue',
  async (dataItem: Skill) => {
    const newDataItem = await adminListAPI.addSkill(dataItem);
    return newDataItem;
  }
);

export const deleteSkillValue = createAsyncThunk(
  'storeAdminList/deleteSkillValue',
  async (skill_id: number) => {
    await adminListAPI.deleteSkillById(skill_id);
    return skill_id;
  }
);

export const editSkillValue = createAsyncThunk(
  'storeAdminList/editSkillValue',
  async (dataItem: Skill) => {
    const newDataItem = await adminListAPI.updateSkill(dataItem);
    return newDataItem;
  }
);

interface AdminListState {
  dataList: Datum[]; // Изменено на Datum[]
  status: string;
}

const initialState: AdminListState = {
  dataList: [],
  status: 'idle',
};

const storeAdminList = createSlice({
  name: 'storeAdminList',
  initialState,
  reducers: {
    setModal(state, action) {
      // Здесь можно добавить обработку состояния модального окна, если необходимо
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveValue.fulfilled, (state, action) => {
        state.dataList.push(action.payload);
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.dataList = action.payload;
      })
      .addCase(cleanAll.fulfilled, (state) => {
        state.dataList = [];
      })
      .addCase(deleteValue.fulfilled, (state, action) => {
        state.dataList = state.dataList.filter(item => item.id !== action.payload);
      })
      .addCase(editValue.fulfilled, (state, action) => {
        const index = state.dataList.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.dataList[index] = action.payload;
        }
      })
      .addCase(saveSkillValue.fulfilled, (state, action) => {
        const index = state.dataList.findIndex(item => item.id === action.payload.datum_id);
        if (index !== -1) {
          state.dataList[index].skills.push(action.payload);
        }
      })
      .addCase(deleteSkillValue.fulfilled, (state, action) => {
        const index = state.dataList.findIndex(item => item.skills.some(skill => skill.id === action.payload));
        if (index !== -1) {
          state.dataList[index].skills = state.dataList[index].skills.filter(skill => skill.id !== action.payload);
        }
      })
      .addCase(editSkillValue.fulfilled, (state, action) => {
        const index = state.dataList.findIndex(item => item.skills.some(skill => skill.id === action.payload.id));
        if (index !== -1) {
          const skillIndex = state.dataList[index].skills.findIndex((skill: Skill) => skill.id === action.payload.id);
          if (skillIndex !== -1) {
            state.dataList[index].skills[skillIndex] = action.payload;
          }
        }
      });
  },
});

export const { setModal } = storeAdminList.actions;

export default storeAdminList.reducer;
