import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../api/auth';

// Определение типов для данных пользователя
export interface UserData {
  id: string;
  email: string;
  // Другие поля пользователя, если есть
}

// Определение типа состояния
interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Асинхронные действия для регистрации
export const registration = createAsyncThunk<
  UserData,
  { email: string; password: string },
  { rejectValue: string }
>('auth/registration', async (registrationData, { rejectWithValue }) => {
  try {
    const authData = await authAPI.registration(registrationData);
    localStorage.setItem('user', JSON.stringify(authData));
    window.location.href = '/'; 
    return authData;
  } catch (error) {
    return rejectWithValue('Registration failed');
  }
});

// Асинхронные действия для логина
export const login = createAsyncThunk<UserData, { email: string; password: string }>(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const authData = await authAPI.login(loginData);
      localStorage.setItem('user', JSON.stringify(authData));
      window.location.href = '/'; 
      return authData;
    } catch (error) {
      return rejectWithValue('Login failed');
    }
    
  }
);

// Функция логаута
export const logout = createAsyncThunk<void>(
  'auth/logout',
  
  async (_, { dispatch }) => {
    console.log('======>login',);
    localStorage.removeItem('user');
    dispatch(authSlice.actions.logout());
    window.location.href = '/'; 
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null; // очищаем состояние пользователя
    },
    setPartUserData: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        // Здесь можно добавить дополнительные действия, если это необходимо
      });
  },
});

// Экспортируем действия и редюсер
export const { setPartUserData } = authSlice.actions;
export default authSlice.reducer;
