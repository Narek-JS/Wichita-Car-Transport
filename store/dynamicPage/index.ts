import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '@/constants/api'
import { IDynamicPageData, DynamicPageAdapter, IDynamicContentFromAdmin, IPostData } from '@/model/dynamicPage';

export type ResponseType = IDynamicPageData | IDynamicContentFromAdmin | IPostData;

export const dynamicPageApi = createApi({
  reducerPath: 'dynamicPageApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + 'getDynamicData' }),
  endpoints: (builder) => ({
    getDynamicPageData: builder.query<ResponseType, string>({
      query: routeName => routeName,
      transformResponse: (response: any) => {
        let dynamicPageData: any = null;

        const isPost = (
          response?.data?.posts?.category?.name === 'News' ||
          response?.data?.posts?.category?.name === 'Blogs'
        );
 
        if(isPost) {
          dynamicPageData = DynamicPageAdapter.createPostData(response?.data?.posts, response?.relatedPosts);
          return new Promise<IPostData>(resolve => resolve(dynamicPageData));
        };
        
        const dataDynamicKeys: any = Object.keys(response.data).reduce((acc, key) => {
          if(key.split('.')[1]) {
            acc[key.split('.')[1]] = response.data?.[key];    
          };
          
          return acc;
        }, {});


        if(dataDynamicKeys?.category?.value === 'dynamic-route') {
          dynamicPageData = DynamicPageAdapter.createDynamicPageData(dataDynamicKeys);
          return new Promise<IDynamicPageData>(resolve => resolve(dynamicPageData));

        } else if (dataDynamicKeys?.category?.value === 'dynamic-content-from-admin') {
          dynamicPageData = DynamicPageAdapter.createDynamicContentFromAdmin(dataDynamicKeys);
          return new Promise<IDynamicContentFromAdmin>(resolve => resolve(dynamicPageData));
        };

        return new Promise<ResponseType>(resolve => resolve(dynamicPageData));
      },
    }),
  }),
});

export const { useGetDynamicPageDataQuery } = dynamicPageApi;
