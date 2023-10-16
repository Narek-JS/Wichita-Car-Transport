import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { manuApi } from './manu'
import { faqApi } from './faq'
import { siteBarSlice } from './siteBar';
import { quoteFormSlice } from './quoteForm';
import { customerReviewsApi } from './customerReviews';
import { transportServicesApi } from './transportServices';
import { homeApi } from './home';
import { latestPostsApi } from './posts';
import { helpApi } from './help';

export const store = configureStore({
  reducer: {
    [manuApi.reducerPath]: manuApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [helpApi.reducerPath]: helpApi.reducer,
    [latestPostsApi.reducerPath]: latestPostsApi.reducer,
    [customerReviewsApi.reducerPath]: customerReviewsApi.reducer,
    [transportServicesApi.reducerPath]: transportServicesApi.reducer,
    siteBar: siteBarSlice.reducer,
    quoteForm: quoteFormSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
    manuApi.middleware,
    faqApi.middleware,
    helpApi.middleware,
    homeApi.middleware,
    latestPostsApi.middleware,
    customerReviewsApi.middleware,
    transportServicesApi.middleware
  ]),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
