import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "../store";

export interface UserState {
  email: String;
  email_verified: boolean;
  picture: String;
  name: String;
  locale: String;
  access_token: String;
  expires_at: String;
  refresh_token: String;
}

const initialState: UserState = {
  email: "",
  email_verified: false,
  picture: "",
  name: "",
  locale: "",
  access_token: "",
  expires_at: "",
  refresh_token: "",
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.email = action.payload.email;
      state.email_verified = action.payload.email_verified;
      state.picture = action.payload.picture;
      state.name = action.payload.name;
      state.locale = action.payload.locale;
      state.access_token = action.payload.access_token;
      state.expires_at = action.payload.expires_at;
      if (action.payload.refresh_token != null) {
        state.refresh_token = action.payload.refresh_token;
      }
    },
    reset: () => initialState,
  },
});

export const { setUser, reset } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: AppState) => state.userData;

export default userSlice.reducer;
