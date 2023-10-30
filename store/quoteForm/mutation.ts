import { BASE_URL } from '@/constants/api';
import { ISubmitFormData } from '@/model/form';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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