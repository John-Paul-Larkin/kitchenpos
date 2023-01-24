import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Combine {
//   edits:Edits[];
//   removeEdits:RemoveEdit;
// }


const initialState:Edits[] = [];

const unsentOrderEditsSlice = createSlice({
  name: "unsentOrderEdits",
  initialState,
  reducers: {
    addNewEdit: (state, action: PayloadAction<Edits>) => {
      state.push(action.payload);
    },
    clearEdits: (state) => {
      return (state = initialState);
    },
  },
});

export default unsentOrderEditsSlice.reducer;
export const { addNewEdit,  clearEdits } = unsentOrderEditsSlice.actions;
