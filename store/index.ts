import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'
import { manuApi } from './manu'
import { faqApi } from './faq'
import { siteBarSlice } from './siteBar';
import { quoteFormSlice } from './quoteForm';
import { customerReviewsApi } from './customerReviews';

export const store = configureStore({
  reducer: {
    [manuApi.reducerPath]: manuApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [customerReviewsApi.reducerPath]: customerReviewsApi.reducer,
    siteBar: siteBarSlice.reducer,
    quoteForm: quoteFormSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([manuApi.middleware, faqApi.middleware, customerReviewsApi.middleware]),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
