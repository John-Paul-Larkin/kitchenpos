import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {} as MenuItem;

const selectedOrderItemSlice = createSlice({
  name: "selectedOrderItem",
  initialState,
  reducers: {
    setSelectedOrderItem: (state, action: PayloadAction<MenuItem>) => {
      state = action.payload;
      return state;
    },

    setSelectedItemToEmpty: (state) => {
      state = {} as MenuItem;
      return state;
    },
  },
});

export default selectedOrderItemSlice.reducer;

export const { setSelectedItemToEmpty, setSelectedOrderItem } = selectedOrderItemSlice.actions;
