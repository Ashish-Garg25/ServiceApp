import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import commonSlice from './slices/common';

const baseUrl = 'http://192.168.0.102:5001/api/v1'; // SERVER BASE URL

const baseQuery = fetchBaseQuery({
  baseUrl,
  // FOR AUTH HEADERS
  prepareHeaders(headers, {getState}) {
    const token = (getState() as any).user.token;
    console.log('TOKEN', token);
    if (token) {
      headers.set('Authorization', `Token ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryLoaderAndMessage = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  api.dispatch(commonSlice.actions.setLoading(true));
  let result = await baseQuery(args, api, extraOptions);
  api.dispatch(commonSlice.actions.setLoading(false));

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryLoaderAndMessage,
  tagTypes: ['Users', 'Category', 'Service'],
  endpoints: builder => ({
    createUser: builder.mutation({
      query: payload => ({
        url: '/register/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Users'],
    }),
    login: builder.mutation({
      query: payload => ({
        url: '/login/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Users'],
    }),
    getCategory: builder.mutation({
      query: () => ({
        url: '/category/',
        method: 'GET',
      }),
      invalidatesTags: ['Category'],
    }),
    getServiceByCategory: builder.mutation({
      query: payload => ({
        url: `/service/category/${payload.category}`,
        method: 'GET',
      }),
      invalidatesTags: ['Service'],
    }),
    getServiceDetails: builder.mutation({
      query: payload => ({
        url: `/service/${payload.id}`,
        method: 'GET',
      }),
      invalidatesTags: ['Service'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetCategoryMutation,
  useGetServiceByCategoryMutation,
  useGetServiceDetailsMutation,
} = api;
