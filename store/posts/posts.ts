import { BASE_URL } from '@/constants/api';
import { IPosts, Posts } from '@/model/posts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
    reducerPath: 'PostsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getPostsApi: builder.query<IPosts, string>({
            query: routeName => routeName,
            transformResponse: (response: any) => {
                const transformPostData = Posts.createPostsData(response);
                return new Promise<any>(resolve => resolve(transformPostData));
            }
        })
    }),
});

export const selectPostApi = postsApi.endpoints.getPostsApi.select('PostsApi');

export const { useGetPostsApiQuery } = postsApi;