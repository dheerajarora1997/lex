import { createSlice } from "@reduxjs/toolkit";

interface onboardedState {
  message: string;
  data: {
    onboarded: boolean;
    onboarding_time: null | string;
  };
}

const initialState: onboardedState = {
  message: "",
  data: {
    onboarded: false,
    onboarding_time: null,
  },
};

const onboardedSlice = createSlice({
  name: "onboarded",
  initialState,
  reducers: {
    getOnboardingStatus: (state, action) => {
      state.message = action.payload.message;
      state.data = action.payload.data;
    },
    completeOnboarding: (state) => {
      state.data.onboarded = true;
    },
  },
});

export const { getOnboardingStatus, completeOnboarding } =
  onboardedSlice.actions;
export default onboardedSlice.reducer;
