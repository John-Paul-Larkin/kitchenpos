import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [] as OrderDetails[];


const openOrdersSlice = createSlice({
  name: "openOrders",
  initialState,
  reducers: {
    addOrderToOpenOrders: (state, action: PayloadAction<OrderDetails>) => {
      return (state = [...state, action.payload]);
    },
    toggeIngredientOpenOrders: (state, action: PayloadAction<ToggleEdit>) => {
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
    removeItemFromOpenOrders: (state, action: PayloadAction<string>) => {
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
    addExtraIngredientToOpenOrders: (state, action: PayloadAction<AddExtraEdit>) => {
      let orderID: string;

      //first iterate through the open orders to find the order containing the item to add ingredient to

      state.forEach((order) => {
        order.orderItemDetails.forEach((item) => {
          if (item.itemId === action.payload.itemID) {
            orderID = order.orderId;
          }
        });
      });

      const itemToAddTo = state.find((order) => order.orderId === orderID)?.orderItemDetails.find((item) => item.itemId === action.payload.itemID);
      if (itemToAddTo?.ingredients) {
        itemToAddTo.ingredients = [...itemToAddTo.ingredients, action.payload.ingredientToAdd];
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

export const { addOrderToOpenOrders, toggeIngredientOpenOrders, removeItemFromOpenOrders, changeOrderStatus, addExtraIngredientToOpenOrders } =
  openOrdersSlice.actions;
