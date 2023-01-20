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
    toggleIngredientOnSelectedItem: (state, action: PayloadAction<string>) => {
      state.ingredients?.forEach((ingredient) => {
        if (ingredient.ingredientId === action.payload) {
          ingredient.selected = !ingredient.selected;
        }
      });
    },
    addExtraIngredientOnSelectedItem: (state, action: PayloadAction<Ingredients>) => {
      state.ingredients?.push(action.payload);
    },
  },
});

export default selectedOrderItemSlice.reducer;

export const { addExtraIngredientOnSelectedItem, setSelectedItemToEmpty, setSelectedOrderItem, toggleIngredientOnSelectedItem } =
  selectedOrderItemSlice.actions;
