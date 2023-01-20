import { configureStore } from "@reduxjs/toolkit";

import openOrdersReducer from "../features/openOrdersSlice";
import orderDetailsReducer from "../features/orderDetailsSlice";
import selectedOrderReducer from "../features/selectedOrderItemSlice";
import unsentOrderEditsReducer  from "../features/unsentOrderEditsSlice";

const store = configureStore({
  reducer: {
    orderDetails: orderDetailsReducer,
    selectedOrderItem: selectedOrderReducer,
    openOrders: openOrdersReducer,
    unsentOrderEdits: unsentOrderEditsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


