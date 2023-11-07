import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBannerData, BannerAdapter } from '@/model/banner';
import { BASE_URL } from '@/constants/api';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + 'getDynamicData' }),
  endpoints: (builder) => ({
    getBanner: builder.query<IBannerData, string>({
      query: routeName => routeName,
      transformResponse: (response: any) =>  {
        const bannerData = BannerAdapter.createBannerData(response.data);
        return new Promise<IBannerData>(resolve => resolve(bannerData));
      },
    }),
  }),
});

export const bannerUI = createSlice({
  name: 'bannerUI',
  initialState: {
    carusel: {
      activeIndex: 1
    }
  },
  reducers: {
    setCarouselActiveIndex: (state, { payload }) => {
      state.carusel.activeIndex = payload;
    }
  }
})

export const selectBanner = bannerApi.endpoints.getBanner.select('banner');
export const slelectCarouselActiveIndex = (state: RootState) => state.bannerUI.carusel.activeIndex;

export const { actions: { setCarouselActiveIndex } } = bannerUI;
export const { useGetBannerQuery } = bannerApi;
