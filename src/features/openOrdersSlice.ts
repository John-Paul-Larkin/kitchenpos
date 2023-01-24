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
      let orderID: string | undefined;

      state.forEach((order) => {
        order.orderItemDetails.forEach((item) => {
          if (item.itemId === action.payload.itemID) {
            orderID = order.orderId;
          }
        });
      });

      const order = state.find((order) => order.orderId === orderID);
      const item = order?.orderItemDetails.find((item) => item.itemId === action.payload.itemID);
      const ingredient = item?.ingredients?.find((ingredient) => ingredient.ingredientId === action.payload.ingredientID);
      if (ingredient?.selected) {
        ingredient.selected = !ingredient.selected;
      }
    },
    removeItemFromOpenOrders: (state, action: PayloadAction<Remove>) => {
      let orderID: string | undefined;

      state.forEach((order) => {
        order.orderItemDetails.forEach((item) => {
          if (item.itemId === action.payload.itemID) {
            orderID = order.orderId;
          }
        });
      });

      const order = state.find((order) => order.orderId === orderID);



      if (state.length === 1 && order?.orderItemDetails.length === 1) {
        // if there is only one item on the order, and it is the ONLY order
        // then we should clear the openOrder array
        return (state = []);
      } else if (order?.orderItemDetails.length === 1) {
        // else if there is only one item on the order, but there are other orders
        // just remove this particuar order
        state = state.filter((order) => order.orderId !== orderID);
        return state;
      } else {
        // else just remove the item from the order

        if (order?.orderItemDetails)
          order.orderItemDetails = order.orderItemDetails.filter((item) => {
            return item.itemId !== action.payload.itemID;
          });
      }
    },
    addExtraIngredientToOpenOrders: (state, action: PayloadAction<AddIngredient>) => {
      let orderID: string | undefined;

      state.forEach((order) => {
        order.orderItemDetails.forEach((item) => {
          if (item.itemId === action.payload.itemID) {
            orderID = order.orderId;
          }
        });
      });
      const order = state.find((order) => order.orderId === orderID);
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
