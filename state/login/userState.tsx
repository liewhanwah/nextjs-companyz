import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState, AppThunk } from "../store";

export interface UserState {
  email: String;
  image: String;
  name: String;
}

const initialState: UserState = {
  email: "",
  image: "",
  name: "",
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.name = action.payload.name;
    },
  },
});

export const { setUser } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: AppState) => state.userData;

export default userSlice.reducer;
