import { BASE_URL } from '@/constants/api';
import { IPosts, LatestPosts } from '@/model/posts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const latestPostsApi = createApi({
    reducerPath: 'latestPostsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getLatestPostsApi: builder.query<IPosts, string>({
            query: routeName => routeName,
            transformResponse: (response: any) => {
                const transformLatestPostData = LatestPosts.createLatestPostsData(response);
                return new Promise<any>(resolve => resolve(transformLatestPostData));
            }
        })
    }),
});

export const selectLatestPostApi = latestPostsApi.endpoints.getLatestPostsApi.select('latestPostsApi');

export const { useGetLatestPostsApiQuery } = latestPostsApi;