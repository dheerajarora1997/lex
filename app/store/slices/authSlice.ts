import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  phone_number: string | null;
  first_name: string;
  last_name: string;
}

const initialState: AuthState = {
  email: "",
  phone_number: null,
  first_name: "",
  last_name: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state[action.payload.name as keyof AuthState] = action.payload.value;
    },
  },
});

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer;
