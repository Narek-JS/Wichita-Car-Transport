import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IReviewsData, ReviewsAdapter } from '@/model/customerReviews';
import { BASE_URL } from '@/constants/api';

export const customerReviewsApi = createApi({
  reducerPath: 'customerReviewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCustomerReviews: builder.query<IReviewsData, string>({
      query: routeName => routeName,
      transformResponse: (response: any) =>  {
        const customerReviewsData = ReviewsAdapter.createReviewsData(response);
        return new Promise<IReviewsData>(resolve => resolve(customerReviewsData));
      },
    }),
  }),
});

export const selectCustomerReviewsData = customerReviewsApi.endpoints.getCustomerReviews.select('reviews');

export const { useGetCustomerReviewsQuery } = customerReviewsApi;
