import { configureStore } from "@reduxjs/toolkit";
import openOrdersReducer from "../features/openOrdersSlice";
import orderDetailsReducer from "../features/orderDetailsSlice";
import selectedOrderReducer from "../features/selectedOrderItemSlice";

const store = configureStore({
  reducer: {
    orderDetails: orderDetailsReducer,
    selectedOrderItem: selectedOrderReducer,
    openOrders: openOrdersReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
