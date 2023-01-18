import { configureStore } from "@reduxjs/toolkit";
import orderDetailsReducer from "../features/orderDetailsSlice";
import selectedOrderReducer from '../features/selectedOrderItemSlice'

const store = configureStore({
  reducer: {
    orderDetails: orderDetailsReducer,
    selectedOrderItem: selectedOrderReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch