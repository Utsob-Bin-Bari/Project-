import { configureStore } from '@reduxjs/toolkit'; 
import employeeReducer from './slice';

export const Store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});
