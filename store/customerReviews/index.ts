import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IcustomerReviewsData, CustomerReviewsDataAdapter } from '@/model/customerReviews';

export const customerReviewsApi = createApi({
  reducerPath: 'customerReviewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://secure.globalautotransportation.com/reviews/backend/datatable.php' }),
  endpoints: (builder) => ({
    getCustomerReviews: builder.query<IcustomerReviewsData, string>({
      query: routeName => routeName,
      transformResponse: (response: any) =>  {
        const customerReviewsData = CustomerReviewsDataAdapter.createCustomerReviewsData(response);
        return new Promise<IcustomerReviewsData>(resolve => resolve(customerReviewsData));
      },
    }),
  }),
});

export const selectCustomerReviewsData = customerReviewsApi.endpoints.getCustomerReviews.select('reviews');

export const { useGetCustomerReviewsQuery } = customerReviewsApi;
