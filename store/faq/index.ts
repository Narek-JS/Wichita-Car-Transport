import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '@/constants/api'
import { FaqAdapter, IFaqData } from '@/model/faqs';

export const faqApi = createApi({
  reducerPath: 'faqApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getFaqs: builder.query<IFaqData, string>({
      query: routeName => routeName,
      transformResponse: (response: any) =>  {
        const faqData = FaqAdapter.createFaqData(response.data);
        return new Promise<IFaqData>(resolve => resolve(faqData));
      },
    }),
  }),
});

export const selectFaqs = faqApi.endpoints.getFaqs.select('getDynamicData/faq');

export const { useGetFaqsQuery } = faqApi;
