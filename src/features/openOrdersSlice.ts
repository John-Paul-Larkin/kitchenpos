import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [] as OrderDetails[];

const openOrdersSlice = createSlice({
  name: "openOrders",
  initialState,
  reducers: {
    addOrderToOpenOrders: (state, action: PayloadAction<OrderDetails>) => {
      // return (state = [...state, action.payload]);

      state.push(action.payload);
    },
    toggleIngredientOpenOrders: (state, action: PayloadAction<Toggle>) => {
      const order = state.find((order) => order.orderId === action.payload.orderID);
      const item = order?.orderItemDetails.find((item) => item.itemId === action.payload.itemID);
      const ingredient = item?.ingredients?.find((ingredient) => ingredient.ingredientId === action.payload.ingredientID);
      if (ingredient?.selected) {
        ingredient.selected = !ingredient.selected;
      }
    },
    removeItemFromOpenOrders: (state, action: PayloadAction<Remove>) => {
      const order = state.find((order) => order.orderId === action.payload.orderID);
      // if there is only one item in the order, then we should completely remove the order
      if (order?.orderItemDetails.length === 1) {
        state = state.filter((order) => order.orderId !== action.payload.orderID);
      } else {
        // else just remove the item from the order
        if (order?.orderItemDetails)
          order.orderItemDetails = order.orderItemDetails.filter((item) => {
            return item.itemId !== action.payload.itemID;
          });
      }
    },
    addExtraIngredientToOpenOrders: (state, action: PayloadAction<AddExtra>) => {
      const order = state.find((order) => order.orderId === action.payload.orderID);
      const itemToAddIngredientTo = order?.orderItemDetails.find((item) => item.itemId === action.payload.itemID);
      if (itemToAddIngredientTo?.ingredients) {
        itemToAddIngredientTo.ingredients = [...itemToAddIngredientTo.ingredients, action.payload.ingredientToAdd];
      }
    },
    changeOrderStatus: (state, action: PayloadAction<string>) => {
      state.map((order) => {
        if (order.orderId === action.payload) {
          return { ...order, orderStatus: "time up" };
        } else {
          return order;
        }
      });
    },
  },
});

export default openOrdersSlice.reducer;

export const { addOrderToOpenOrders, toggleIngredientOpenOrders, removeItemFromOpenOrders, changeOrderStatus, addExtraIngredientToOpenOrders } =
  openOrdersSlice.actions;
