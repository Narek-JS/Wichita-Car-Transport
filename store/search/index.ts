import { PostData } from '@/components/Search';
import { BASE_URL } from '@/constants/api';
import { ISearchData, getSearchAdaptedData } from '@/helper/search';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    search: builder.mutation<any, PostData>({
      query: (postData) => ({
        url: '/search',
        method: 'POST',
        body: postData,
      }),
      transformResponse: (response: any) =>  {
        const transportServicesData = getSearchAdaptedData(response.data, response.data?.searchText?.trim());
        return new Promise<ISearchData>(resolve => resolve(transportServicesData));
      },
    }),
  }),
});

export const { useSearchMutation } = searchApi;