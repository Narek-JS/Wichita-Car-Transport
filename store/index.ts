import { customerReviewsApi, customerReviewsUI } from './customerReviews';
import { transportServicesApi } from './transportServices';
import { setupListeners } from '@reduxjs/toolkit/query';
import { latestPostsApi } from './posts/latestPosts';
import { configureStore } from '@reduxjs/toolkit';
import { optionsByZipApi } from './optionsByZip';
import { dynamicPageApi } from './dynamicPage';
import { quoteFormSlice } from './quoteForm';
import { siteBarSlice } from './siteBar';
import { postsApi } from './posts/posts';
import { searchApi } from './search';
import { bannerApi, bannerUI } from './banner';
import { manuApi } from './manu';
import { homeApi } from './home';
import { helpApi } from './help';
import { faqApi } from './faq';

export const store = configureStore({
  reducer: {
    [manuApi.reducerPath]: manuApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [helpApi.reducerPath]: helpApi.reducer,
    [latestPostsApi.reducerPath]: latestPostsApi.reducer,
    [dynamicPageApi.reducerPath]: dynamicPageApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [optionsByZipApi.reducerPath]: optionsByZipApi.reducer,
    [customerReviewsApi.reducerPath]: customerReviewsApi.reducer,
    [transportServicesApi.reducerPath]: transportServicesApi.reducer,
    siteBar: siteBarSlice.reducer,
    customerReviewsUI: customerReviewsUI.reducer,
    bannerUI: bannerUI.reducer,
    quoteForm: quoteFormSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
    manuApi.middleware,
    faqApi.middleware,
    helpApi.middleware,
    bannerApi.middleware,
    homeApi.middleware,
    dynamicPageApi.middleware,
    latestPostsApi.middleware,
    postsApi.middleware,
    searchApi.middleware,
    optionsByZipApi.middleware,
    customerReviewsApi.middleware,
    transportServicesApi.middleware
  ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
