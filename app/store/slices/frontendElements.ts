import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface frontendElementState {
  sidebarCollapse: boolean;
}

const initialState: frontendElementState = {
  sidebarCollapse: false,
};

const frontendElementSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFrontendElement: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapse = action.payload;
    },
  },
});

export const { setFrontendElement } = frontendElementSlice.actions;

export default frontendElementSlice.reducer;
