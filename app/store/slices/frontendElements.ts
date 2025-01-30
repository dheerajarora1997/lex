import { IcaseDetails } from "@/app/conversation/ConversationChat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface frontendElementState {
  sidebarCollapse: boolean;
  modalData?: {
    caseContent?: IcaseDetails;
    caseTitle?: string;
    caseFile?: string;
  } | null;
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
    setModalData: (
      state,
      action: PayloadAction<{
        caseContent?: IcaseDetails;
        caseTitle?: string;
        caseFile?: string;
      } | null>
    ) => {
      state.modalData = action.payload;
    },
  },
});

export const { setFrontendElement, setModalData } =
  frontendElementSlice.actions;

export default frontendElementSlice.reducer;
