import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { manuApi } from './manu'
import { faqApi } from './faq'
import { siteBarSlice } from './siteBar';
import { quoteFormSlice } from './quoteForm';
import { customerReviewsApi } from './customerReviews';
import { transportServicesApi } from './transportServices';
import { homeApi } from './home';
import { latestPostsApi } from './posts/latestPosts';
import { helpApi } from './help';
import { dynamicPageApi } from './dynamicPage';
import { postsApi } from './posts/posts';

export const store = configureStore({
  reducer: {
    [manuApi.reducerPath]: manuApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [helpApi.reducerPath]: helpApi.reducer,
    [latestPostsApi.reducerPath]: latestPostsApi.reducer,
    [dynamicPageApi.reducerPath]: dynamicPageApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
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
    dynamicPageApi.middleware,
    latestPostsApi.middleware,
    postsApi.middleware,
    customerReviewsApi.middleware,
    transportServicesApi.middleware
  ]),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
