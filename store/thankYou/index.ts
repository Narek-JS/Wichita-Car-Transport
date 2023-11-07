import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export const thankYouSlice = createSlice({
    name: 'thankYou',
    initialState: { isOpen: false },
    reducers: {
        closeThankYou: (state) => {
            state.isOpen = false;
        },
        openThankYou: (state) => {
            state.isOpen = true;
        }
    },
})

export const { actions: { closeThankYou, openThankYou } } = thankYouSlice;

export const selectThankYouStatus = (state: RootState) => state.thankYou.isOpen;