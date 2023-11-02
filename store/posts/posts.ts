import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPostComment, IPosts, Posts } from '@/model/posts';
import { BASE_URL } from '@/constants/api';

interface IAddPostComment extends IPostComment {
    id: number
};

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
        }),
        addPostComment: builder.mutation<any, IAddPostComment>({
            query: (data) => ({
                url: '/comments',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: any) =>  {
                return new Promise<any>(resolve => resolve(response));
            },
        }),
    }),
});

export const selectPostApi = postsApi.endpoints.getPostsApi.select('PostsApi');

export const { useGetPostsApiQuery, useAddPostCommentMutation } = postsApi;