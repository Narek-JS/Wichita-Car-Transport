import { BASE_URL } from '@/constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
                debugger
                return new Promise<any>(resolve => resolve(response));
            },
        }),
    }),
});

export const { useContactUsMutation } = contactUsApi;