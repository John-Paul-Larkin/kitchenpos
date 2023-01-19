import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [] as OrderDetails[];

interface Toggle {
  itemID: string;
  ingredientID: string;
}

const openOrdersSlice = createSlice({
  name: "openOrders",
  initialState,
  reducers: {
    addOrderToOpenOrders: (state, action: PayloadAction<OrderDetails>) => {
      return (state = [...state, action.payload]);
    },
    toggeIngredientOpenOrders: (state, action: PayloadAction<Toggle>) => {
      state.forEach((order) =>
        order.orderItemDetails.forEach((item) => {
          if (item.itemId === action.payload.itemID) {
            item.ingredients?.forEach((ingredient) => {
              if (ingredient.ingredientId === action.payload.ingredientID) {
                ingredient.selected = !ingredient.selected;
              }
            });
          }
        })
      );
    },
    removeItemOpenOrders: (state, action: PayloadAction<string>) => {
      let orderID: string;
      // find the item in open orders and extract the order id
      state.forEach((order) => {
        order.orderItemDetails.forEach((item) => {
          if (item.itemId === action.payload) {
            orderID = order.orderId;
          }
        });
      });

      state.forEach((order) => {
        if (order.orderId === orderID) {
          // if there is only one item in the order, then we should completely remove the order
          if (order.orderItemDetails.length === 1) {
            state = state.filter((order) => order.orderId !== orderID);
          } else {
            // else just remove the item from the order
            order.orderItemDetails = order.orderItemDetails.filter((item) => {
              return item.itemId !== action.payload;
            });
          }
        }
      });

      return state;
    },

    changeOrderStatus: (state, action: PayloadAction<String>) => {
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

export const { addOrderToOpenOrders, toggeIngredientOpenOrders, removeItemOpenOrders, changeOrderStatus } = openOrdersSlice.actions;
