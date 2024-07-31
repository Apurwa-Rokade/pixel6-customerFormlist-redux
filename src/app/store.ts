
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import customersReducer, { CustomersState } from './customersSlice';

export const store = configureStore({
  reducer: {
    customers: customersReducer,
  },
});

export type RootState = {
  customers: CustomersState;
};

export type AppDispatch = typeof store.dispatch;

// Define a Thunk type for better typing in async actions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
