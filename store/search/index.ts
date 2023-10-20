import { PostData } from '@/components/Search';
import { ISearchData, getSearchAdaptedData } from '@/helper/search';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    search: builder.mutation<any, PostData>({
      query: (postData) => ({
        url: '/search',
        method: 'POST',
        body: postData,
      }),
      transformResponse: (response: any) =>  {
        debugger
        const transportServicesData = getSearchAdaptedData(response.data, 'text');
        return new Promise<ISearchData>(resolve => resolve(transportServicesData));
      },
    }),
  }),
});

export const { useSearchMutation } = searchApi;