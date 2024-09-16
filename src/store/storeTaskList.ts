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
    // Экшн для установки новых задач
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload;
    },
    // Экшн для удаления задачи
    deleteTask: (state, action: PayloadAction<number>) => {
      state.taskList.splice(action.payload, 1);
    },
    // Экшн для обновления всего списка задач
    updateTaskList: (state, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload;
      localStorage.setItem('taskList', JSON.stringify(state.taskList));
    },
    // Экшн для добавления новой задачи
    addTask: (state, action: PayloadAction<Task>) => {
      state.taskList.push(action.payload);
      localStorage.setItem('taskList', JSON.stringify(state.taskList));
    },
    // Экшн для обновления конкретной задачи по индексу
    updateTask: (state, action: PayloadAction<{ index: number; taskData: Task }>) => {
      const { index, taskData } = action.payload;
      state.taskList[index] = taskData;
      localStorage.setItem('taskList', JSON.stringify(state.taskList));
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
