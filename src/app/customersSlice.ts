import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
  addressLine1: string;
  addressLine2?: string;
  postcode: string;
  state: string;
  city: string;
}

interface Customer {
  id: string;
  pan: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  addresses: Address[];
}

export type CustomersState = Customer[];

const initialState: CustomersState = [];

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.push(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.findIndex(customer => customer.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      return state.filter(customer => customer.id !== action.payload);
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } = customersSlice.actions;
export default customersSlice.reducer;
