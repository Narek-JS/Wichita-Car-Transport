import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMenuData, MenuAdapter } from '@/model/menu';
import { BASE_URL } from '@/constants/api';

export const manuApi = createApi({
  reducerPath: 'manuApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMenus: builder.query<IMenuData, string>({
      query: routeName => routeName,
      transformResponse: (response: any) =>  {
        const menuData = MenuAdapter.createMenuData(response.data);
        return new Promise<IMenuData>(resolve => resolve(menuData));
      },
    }),
  }),
});

export const selectMenus = manuApi.endpoints.getMenus.select('menus');

export const { useGetMenusQuery } = manuApi;
