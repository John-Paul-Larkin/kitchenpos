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
    addNewItemToOrder: (state, action: PayloadAction<MenuItem>) => {
      if (Object.keys(state).length === 0 || state.orderItemDetails === undefined) {
        // If this is the first item to be added to the order, just add to the array
        state.orderItemDetails = [action.payload];
      } else {
        //otherwise spread the old items before adding
        state.orderItemDetails = [...state.orderItemDetails, action.payload];
      }
    },
    addAlreadyOrderedItems: (state, action: PayloadAction<MenuItem[]>) => {
      // adds any items which are already open on a table
      // when user opens that table again
      state.orderItemDetails = action.payload;
    },
    addTransferedItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.orderItemDetails = [...state.orderItemDetails, ...action.payload];
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.orderItemDetails = state.orderItemDetails.filter((item) => item.itemId !== action.payload);
    },
    changeTableNumberReducer: (state, action: PayloadAction<string>) => {
      state.tableNumber = action.payload;
    },
    addOrderAndTimeStripOutSentToKitchen: (state) => {
      // adding id,server and time when order is sent through to firebase/kitchen
      state.timeOrderPlaced = new Date();
      state.orderStatus = "pending";
      state.orderId = uuid();
      if (auth.currentUser && auth.currentUser.displayName !== null) {
        state.server = auth.currentUser.displayName;
      }

      // Strip out the items which have already been sent on previous orders.
      state.orderItemDetails = state.orderItemDetails.filter((item) => item.isSentToKitchen !== true);
    },
    clearOrder: (state) => {
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

    addExtraIngredientOnOrderDetails: (state, action: PayloadAction<Ingredient>) => {
      //   const ingredientoAdd: Ingredients = {
      //     ingredient: action.payload,
      //     selected: true,
      //     added: true,
      //     ingredientId: uuid(),
      //   };
      //   const itemID = selectedOrderItem?.itemId;
      //   if (selectedOrderItem?.isSentToKitchen === true) {
      //     // if the item is already sent
      //     setOpenOrders((draft) => {
      //       draft.forEach((order) =>
      //         order.orderItemDetails.forEach((item) => {
      //           if (item.itemId === itemID) {
      //             item.ingredients?.push(ingredientoAdd);
      //           }
      //         })
      //       );
      //       return draft;
      //     });
      //   }
      //   // Add item to the current order details
      //   state.orderItemDetails.forEach((item) => {
      //     if (item.itemId === itemID) {
      //       item.ingredients?.push(ingredientoAdd);
      //     }
      //   });
      //   if (selectedOrderItem !== null) {
      //     setSelectedOrderItem({ ...selectedOrderItem, ingredients: [...selectedOrderItem.ingredients!, ingredientoAdd] });
      //   }
    },
  },
});

export default orderDetailsSlice.reducer;

export const {
  addNewItemToOrder,
  addAlreadyOrderedItems,
  addTransferedItems,
  removeItem,
  changeTableNumberReducer,
  addOrderAndTimeStripOutSentToKitchen,
  clearOrder,
  toggleIngredientOnOrderDetails,
  addExtraIngredientOnOrderDetails,
} = orderDetailsSlice.actions;
