import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";


export const quoteFormSlice = createSlice({
    name: "quoteForm",
    initialState: { isOpenMobile: false, isOpenDesktop: false },
    reducers: {
        closeQuoteFormMobile: (state) => {
            state.isOpenMobile = false;
        },
        openQuoteFormMobile: (state) => {
            state.isOpenMobile = true;
        },
        closeQuoteFormDesktop: (state) => {
            state.isOpenDesktop = false;
        },
        openQuoteFormDesktop: (state) => {
            state.isOpenDesktop = true;
        },
    }
});

export const { actions: {
    closeQuoteFormMobile,
    openQuoteFormMobile,
    closeQuoteFormDesktop,
    openQuoteFormDesktop
} } = quoteFormSlice;

export const selectQuoteFormMobileStatus = (state: RootState) => state.quoteForm.isOpenMobile;
export const selectQuoteFormStatusDesktop = (state: RootState) => state.quoteForm.isOpenDesktop;