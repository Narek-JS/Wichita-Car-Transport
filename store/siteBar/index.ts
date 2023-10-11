import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "..";


export const siteBarSlice = createSlice({
    name: 'siteBar',
    initialState: { isOpen: false },
    reducers: {
        closeSidebar: (state) => {
            state.isOpen = false;
        },
        openSidebar: (state) => {
            state.isOpen = true;
        }
    },
})

export const { actions: { closeSidebar, openSidebar } } = siteBarSlice;

export const selectSiteBarStatus = (state: RootState) => state.siteBar.isOpen;