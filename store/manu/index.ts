import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '@/constants/api'
import { IMenuData, MenuAdapter } from '@/model/menu';

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
