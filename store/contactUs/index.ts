import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/constants/api';

interface IContactData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string
};

export const contactUsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        contactUs: builder.mutation<any, IContactData>({
            query: (data) => ({
                url: '/contact',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: any) =>  {
                return new Promise<any>(resolve => resolve(response));
            },
        }),
    }),
});

export const { useContactUsMutation } = contactUsApi;