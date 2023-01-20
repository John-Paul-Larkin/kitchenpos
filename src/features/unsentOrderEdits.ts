import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import OrderDetails from "../components/OrderDetails";


const initialState: any[] = [];

const unsentOrderEditsSlice = createSlice({
  name: "unsentOrderEdits",

  initialState,
  reducers: {},
});

export default unsentOrderEditsSlice.reducer;
export const {} = unsentOrderEditsSlice.actions;





