import { IFeedbackPayload, IReviewsData, ReviewsAdapter } from '@/model/customerReviews';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '@/constants/api';
import { RootState } from '..';

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
    addFeedback: builder.mutation<any, IFeedbackPayload>({
      query: (formData) => ({
        url: '/review',
        method: 'POST',
        body: formData,
      })
    }),
  }),
});

export const customerReviewsUI = createSlice({
  name: 'customerReviewsUI',
  initialState: {
    form: {
      isOpen: false
    }
  },
  reducers: {
    handleCloseForm: (state) => {
      state.form.isOpen = false;
    },
    handleOpenForm: (state) => {
      state.form.isOpen = true;
    }
  }
})

export const { useGetCustomerReviewsQuery, useAddFeedbackMutation } = customerReviewsApi;
export const { actions: { handleCloseForm, handleOpenForm } } = customerReviewsUI;

export const selectCustomerReviewsFormStatus = (state: RootState) => state.customerReviewsUI.form;
export const selectCustomerReviewsData = customerReviewsApi.endpoints.getCustomerReviews.select('reviews');