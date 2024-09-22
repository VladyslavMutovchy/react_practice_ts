import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store'; // Импортируйте типы для dispatch и state, если они у вас уже есть

// Определение типов для задач и состояния
interface SubTask {
  task: string;
}

interface Task {
  task: string;
  subTasks: SubTask[];
}

interface TaskState {
  taskList: Task[];
}

// Начальное состояние
const initialState: TaskState = {
  taskList: [],
};

// Создаем слайс с помощью createSlice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload;
      console.log('===state.taskList', state.taskList);
    },
    
    deleteTask: (state, action: PayloadAction<number>) => {
      console.log('===DELETE state.taskList', state.taskList);
      state.taskList.splice(action.payload, 1); // Удаление задачи по индексу
      localStorage.setItem('taskList', JSON.stringify(state.taskList)); // Обновление localStorage
    },
    
    updateTaskList: (state, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload;
      localStorage.setItem('taskList', JSON.stringify(state.taskList));
    },
    addTask: (state, action: PayloadAction<Task>) => {
      console.log('===state.taskList', state.taskList);
      state.taskList.push(action.payload);
      localStorage.setItem('taskList', JSON.stringify(state.taskList));
    },
    // Экшн для обновления конкретной задачи по индексу
    updateTask: (state, action: PayloadAction<{ index: number; taskData: Task }>) => {
      console.log('====state.taskList', state.taskList);
      const { index, taskData } = action.payload;
      // const { taskList } = state;
      // taskList[index] = taskData;
      // state.taskList = taskList;
    
      localStorage.setItem('taskList', JSON.stringify(state.taskList)); // Обновление в localStorage
    },
    
  },
});

// Экспортируем экшены
export const { setTasks, deleteTask, updateTaskList, addTask, updateTask } = taskSlice.actions;

// Асинхронные экшены (thunks)
export const getTask = () => (dispatch: AppDispatch) => {
  const taskDataJSON = localStorage.getItem('taskList');
  const newTaskList = taskDataJSON ? JSON.parse(taskDataJSON) : [];
  dispatch(setTasks(newTaskList));
};

export const removeTask = (index: number) => (dispatch: AppDispatch, getState: () => RootState) => {
  const newTaskList = [...getState().storeTaskList.taskList];
  newTaskList.splice(index, 1);
  dispatch(updateTaskList(newTaskList));
};

export const addNewTask = (taskData: Task) => (dispatch: AppDispatch, getState: () => RootState) => {
  const newTaskList = [...getState().storeTaskList.taskList];
  newTaskList.push(taskData);
  dispatch(updateTaskList(newTaskList));
};

export const updateExistingTask = (index: number, taskData: Task) => (dispatch: AppDispatch, getState: () => RootState) => {
  const newTaskList = [...getState().storeTaskList.taskList];
  newTaskList[index] = taskData;
  dispatch(updateTaskList(newTaskList));
};

// Экспорт редьюсера для добавления в store
export default taskSlice.reducer;
