import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Combine {
  edits:Edits[];
  removeEdits:RemoveEdit;
}

const initialState:Combine  = {} as Combine;

const unsentOrderEditsSlice = createSlice({
  name: "unsentOrderEdits",
  initialState,
  reducers: {
    addNewEdit: (state, action: PayloadAction<Edits>) => {
      state.push(action.payload);
    },
    addRemoveEdit:(state, action: PayloadAction<Edits>) => {
        action.payload.itemID
        action.payload.editType

    },
    clearEdits: (state) => {
      return (state = []);
    },
  },
});

export default unsentOrderEditsSlice.reducer;
export const { addNewEdit, addRemoveEdit, clearEdits } = unsentOrderEditsSlice.actions;
