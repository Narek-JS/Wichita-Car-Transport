import { ITransportServicesData, TransportServicesAdapter } from '@/model/transportServices';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/constants/api';

export const transportServicesApi = createApi({
  reducerPath: 'transportServicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + 'getDynamicData' }),
  endpoints: (builder) => ({
    getTransportServicesApi: builder.query<ITransportServicesData, string>({
      query: routeName => routeName,
      transformResponse: (response: any) =>  {
        const transportServicesData = TransportServicesAdapter.transportServicesData(response.data);
        return new Promise<ITransportServicesData>(resolve => resolve(transportServicesData));
      },
    }),
  }),
});

export const selecttransportServices = transportServicesApi.endpoints.getTransportServicesApi.select('getDynamicData/transportServicesApi');

export const { useGetTransportServicesApiQuery } = transportServicesApi;
