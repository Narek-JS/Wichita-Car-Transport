import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const optionsByZipApi = createApi({
  reducerPath: 'optionsByZipApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://devback.ifta.online/api/v1/zipCodeOrCity" }),
  endpoints: (builder) => ({
    getOptionsApi: builder.query<any, string>({
      query: routeName => routeName
    }),
  }),
});

export const { useGetOptionsApiQuery } = optionsByZipApi;
