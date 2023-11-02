import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISubmitFormData } from '@/model/form';
import { BASE_URL } from '@/constants/api';

export const quoteFormApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    quoteForm: builder.mutation<any, ISubmitFormData>({
      query: (formData) => ({
        url: '/quoteForm',
        method: 'POST',
        body: formData,
      })
    }),
  }),
});

export const { useQuoteFormMutation } = quoteFormApi;