import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '@/constants/api'
import { HelpAdapter, IHelpData } from '@/model/help';

export const helpApi = createApi({
  reducerPath: 'helpApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + 'getDynamicData' }),
  endpoints: (builder) => ({
    getHelps: builder.query<IHelpData, string>({
      query: routeName => routeName,
      transformResponse: (response: any) =>  {
        const helpData = HelpAdapter.createHelpData(response.data);
        return new Promise<IHelpData>(resolve => resolve(helpData));
      },
    }),
  }),
});

export const selectHelps = helpApi.endpoints.getHelps.select('getDynamicData/helpApi');

export const { useGetHelpsQuery } = helpApi;
