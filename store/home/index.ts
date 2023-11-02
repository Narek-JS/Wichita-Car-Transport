import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HomeAdapter, IHomeData } from '@/model/home';
import { BASE_URL } from '@/constants/api';

export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + 'getDynamicData' }),
  endpoints: (builder) => ({
    getHome: builder.query<IHomeData, string>({
      query: routeName => routeName,
      transformResponse: (response: any) =>  {
        const homeData = HomeAdapter.createHomeData(response.data);
        return new Promise<IHomeData>(resolve => resolve(homeData));
      },
    }),
  }),
});

export const selectHome = homeApi.endpoints.getHome.select('home');

export const { useGetHomeQuery } = homeApi;
