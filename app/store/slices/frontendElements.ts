import { IcaseDetails } from "@/app/conversation/ConversationChat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface JudgmentAnalysis {
  caseTitle: string;
  dateOfJudgment: string;
  courtName: string;
  outcome: string;
  mainPrinciple: string;
  keyFacts: string[];
  factsBackground: string;
  courtReasoning: string[];
  petitionerPoints: string[];
  petitionerBasis: string[];
  respondentPoints: string[];
  respondentBasis: string[];
  precedentsCaseName: string[];
  precedentsRelevance: string[];
  lawsInvolved: string[];
  sectionsInvolved: string[];
}

export interface CaseData {
  case_id: number;
  case_number: string;
  judgment_analysis: JudgmentAnalysis;
}

interface frontendElementState {
  sidebarCollapse: boolean;
  modalDetailId: string | null;
  modalData?: IcaseDetails[] | null;
  threadId?: string;
  conversationId?: string;
}

const initialState: frontendElementState = {
  sidebarCollapse: false,
  modalDetailId: null,
};

const frontendElementSlice = createSlice({
  name: "frontendElement",
  initialState,
  reducers: {
    setFrontendElement: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapse = action.payload;
    },
    setModalData: (state, action: PayloadAction<IcaseDetails[] | null>) => {
      state.modalData = action.payload;
    },
    setPageThreadId(state, action: PayloadAction<string | undefined>) {
      state.threadId = action.payload;
    },
    setConversationId(state, action: PayloadAction<string | undefined>) {
      state.conversationId = action.payload;
    },
    setModalDetailId(state, action: PayloadAction<string | null>) {
      state.modalDetailId = action.payload;
    },
  },
});

export const {
  setFrontendElement,
  setModalData,
  setPageThreadId,
  setConversationId,
  setModalDetailId,
} = frontendElementSlice.actions;

export default frontendElementSlice.reducer;
