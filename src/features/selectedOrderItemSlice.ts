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
    toggleIngredientOnSelectedItem: (state, action: PayloadAction<String>) => {
      state.ingredients?.forEach((ingredient) => {
        if (ingredient.ingredientId === action.payload) {
          ingredient.selected = !ingredient.selected;
        }
      });
      //  if (selectedOrderItem && selectedOrderItem.ingredients) {
      //    const updatedIngredients = selectedOrderItem.ingredients.map((ingredient) => {
      //      if (ingredient.ingredientId === action.payload) {
      //        return { ...ingredient, selected: !ingredient.selected };
      //      }
      //      return ingredient;
      //    });
      //    setSelectedOrderItem({ ...selectedOrderItem, ingredients: updatedIngredients });
      //  }
    },
  },
});

export default selectedOrderItemSlice.reducer;

export const { setSelectedItemToEmpty, setSelectedOrderItem, toggleIngredientOnSelectedItem } = selectedOrderItemSlice.actions;
