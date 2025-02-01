import { IcaseDetails } from "@/app/conversation/ConversationChat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface frontendElementState {
  sidebarCollapse: boolean;
  modalData?: {
    caseContent?: IcaseDetails;
    caseTitle?: string;
    caseFile?: string;
  } | null;
  threadId?: string;
  conversationId?: string;
}

const initialState: frontendElementState = {
  sidebarCollapse: false,
};

const frontendElementSlice = createSlice({
  name: "frontendElement",
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
    setPageThreadId(state, action: PayloadAction<string | undefined>) {
      state.threadId = action.payload;
    },
    setConversationId(state, action: PayloadAction<string | undefined>) {
      state.conversationId = action.payload;
    },
  },
});

export const {
  setFrontendElement,
  setModalData,
  setPageThreadId,
  setConversationId,
} = frontendElementSlice.actions;

export default frontendElementSlice.reducer;
