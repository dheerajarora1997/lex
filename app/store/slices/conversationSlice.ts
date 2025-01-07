import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConversationState {
  isOnboardingComplete: boolean;
  isSidebarOpen: boolean;
  threads: Array<{ id: string; messages: string[] }>;
  activeThreadId: string | null;
  activeQuery: string;
}

const initialState: ConversationState = {
  isOnboardingComplete: false,
  isSidebarOpen: false,
  threads: [],
  activeThreadId: null,
  activeQuery: "",
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    completeOnboarding: (state) => {
      state.isOnboardingComplete = true;
    },
    addThread: (state, action: PayloadAction<{ id: string }>) => {
      state.threads.push({ id: action.payload.id, messages: [] });
      state.activeThreadId = action.payload.id;
    },
    addMessageToThread: (
      state,
      action: PayloadAction<{ threadId: string; message: string }>
    ) => {
      const thread = state.threads.find(
        (t) => t.id === action.payload.threadId
      );
      if (thread) {
        thread.messages.push(action.payload.message);
      }
    },
    setActiveThread: (state, action: PayloadAction<string>) => {
      state.activeThreadId = action.payload;
    },

    setActiveQuery: (state, action: PayloadAction<string>) => {
      state.activeQuery = action.payload;
    },

    clearActiveQuery: (state) => {
      state.activeQuery = "";
    },
  },
});

export const {
  completeOnboarding,
  addThread,
  addMessageToThread,
  setActiveThread,
  setActiveQuery,
  clearActiveQuery,
} = conversationSlice.actions;

export default conversationSlice.reducer;
