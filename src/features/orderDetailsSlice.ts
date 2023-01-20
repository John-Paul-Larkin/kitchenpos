import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { auth } from "../Firebase/firebaseconfig";

// The reducer orderDetails contains the information about the currently selected table.
// An order is allocated an id when an it is sent to the kitchen
// A single table can have multiple orders open at the same time



const initialState = {} as OrderDetails;

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    addNewItemToOrderDetails: (state, action: PayloadAction<MenuItem>) => {
      if (Object.keys(state).length === 0 || state.orderItemDetails === undefined) {
        // If this is the first item to be added to the order, just add to the array
        state.orderItemDetails = [action.payload];
      } else {
        //otherwise spread the old items before adding
        state.orderItemDetails = [...state.orderItemDetails, action.payload];
      }
    },
    addPreviouslySentItemsToOrderDetails: (state, action: PayloadAction<MenuItem[]>) => {
      // adds any items which are already open on a table
      // when user opens that table again
      state.orderItemDetails = action.payload;
    },
    addTransferedItemsToOrderDetails: (state, action: PayloadAction<MenuItem[]>) => {
      state.orderItemDetails = [...state.orderItemDetails, ...action.payload];
    },
    removeItemFromOrderDetails: (state, action: PayloadAction<string>) => {
      state.orderItemDetails = state.orderItemDetails.filter((item) => item.itemId !== action.payload);
    },
    changeTableNumberOrderDetails: (state, action: PayloadAction<string>) => {
      state.tableNumber = action.payload;
    },
    addOrderTimeStripOutSentItemsOrderDetails: (state) => {
      // adding id,server and time when order is sent through to firebase/kitchen
      const timeNow = Date.now();

      state.timeOrderPlaced = timeNow;
      state.orderStatus = "pending";
      state.orderId = uuid();
      if (auth.currentUser && auth.currentUser.displayName !== null) {
        state.server = auth.currentUser.displayName;
      }

      // Strip out the items which have already been sent on previous orders.
      state.orderItemDetails = state.orderItemDetails.filter((item) => item.isSentToKitchen !== true);
    },
    clearOrderDetails: (state) => {
      state.tableNumber = "";
      state.orderItemDetails = [];
      state.server = "";
      state.timeOrderPlaced = null;
    },

    toggleIngredientOnOrderDetails: (state, action: PayloadAction<string>) => {
      //iterate through the items in the order, on finding the specified option, negate it.
      state.orderItemDetails.forEach((item) =>
        item.ingredients?.forEach((ingredient) => {
          if (ingredient.ingredientId === action.payload) {
            ingredient.selected = !ingredient.selected;
          }
        })
      );
    },

    addExtraIngredientOnOrderDetails: (state, action: PayloadAction<AddExtraEdit>) => {
      state.orderItemDetails.forEach((item) => {
        if (item.itemId === action.payload.itemID) {
          item.ingredients?.push(action.payload.ingredientToAdd);
        }
      });
    },
  },
});

export default orderDetailsSlice.reducer;

export const {
  addNewItemToOrderDetails,
  addPreviouslySentItemsToOrderDetails,
  addTransferedItemsToOrderDetails,
  removeItemFromOrderDetails,
  changeTableNumberOrderDetails,
  addOrderTimeStripOutSentItemsOrderDetails,
  clearOrderDetails,
  toggleIngredientOnOrderDetails,
  addExtraIngredientOnOrderDetails,
} = orderDetailsSlice.actions;
