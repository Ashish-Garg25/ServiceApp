import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import commonSlice from './slices/common';

// const baseUrl = 'http://localhost:5001/api/v1'; // SERVER BASE URL
const baseUrl = 'https://serviceapp-t13l.onrender.com/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl,
  // FOR AUTH HEADERS
  prepareHeaders(headers, {getState}) {
    const token = (getState() as any).user.token;
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
  tagTypes: ['Users', 'Category', 'Service', 'Task', 'Chat', 'Offer'],
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
    resetPassword: builder.mutation({
      query: payload => ({
        url: '/resetPassword/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: payload => ({
        url: '/update',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Users'],
    }),
    getAddress: builder.mutation({
      query: () => ({
        url: '/address/',
        method: 'GET',
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
    getCategoryByName: builder.mutation({
      query: ({name}) => ({
        url: `/category/search/${name}`,
        method: 'GET',
      }),
      invalidatesTags: ['Category'],
    }),
    createService: builder.mutation({
      query: payload => ({
        url: '/service/create',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Service'],
    }),
    getMyService: builder.mutation({
      query: () => ({
        url: '/service/seller/id',
        method: 'GET',
      }),
      invalidatesTags: ['Service'],
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
    filterService: builder.mutation({
      query: payload => ({
        url: `/service/filter/?Category=${payload.category}&Rating=${payload.rating}&Earning=${payload.earning}&Radius=${payload.radius}`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['Service'],
    }),
    createTask: builder.mutation({
      query: payload => ({
        url: '/task/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Task'],
    }),
    getTask: builder.mutation({
      query: () => ({
        url: '/task/',
        method: 'GET',
      }),
      invalidatesTags: ['Task'],
    }),
    getTaskDetails: builder.mutation({
      query: ({id}) => ({
        url: `/task/details/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['Task'],
    }),

    getTaskByType: builder.mutation({
      query: ({type = 'all'}) => ({
        url: `/task/${type}`,
        method: 'GET',
      }),
      invalidatesTags: ['Task'],
    }),

    getInvitedTasks: builder.mutation({
      query: () => ({
        url: '/task/invited',
        method: 'GET',
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: payload => ({
        url: `/task/${payload.id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Offer'],
    }),
    getChatList: builder.mutation({
      query: () => ({
        url: '/chat/',
        method: 'GET',
      }),
      invalidatesTags: ['Chat'],
    }),
    getChat: builder.mutation({
      query: payload => ({
        url: `/chat/${payload.id}`,
        method: 'GET',
      }),
      invalidatesTags: ['Chat'],
    }),
    sendMessage: builder.mutation({
      query: payload => ({
        url: '/chat/message',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Chat'],
    }),
    createOffer: builder.mutation({
      query: payload => ({
        url: '/offer',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Offer'],
    }),
    getOffer: builder.mutation({
      query: payload => ({
        url: `/offer/offerByUser/${payload.sellerId}`,
        method: 'GET',
      }),
      invalidatesTags: ['Offer'],
    }),
    updateOffer: builder.mutation({
      query: payload => ({
        url: '/offer/',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Offer'],
    }),
    rateService: builder.mutation({
      query: payload => ({
        url: '/rate',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Service'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useGetAddressMutation,
  useGetCategoryMutation,
  useGetCategoryByNameMutation,
  useCreateServiceMutation,
  useGetMyServiceMutation,
  useGetServiceByCategoryMutation,
  useGetServiceDetailsMutation,
  useFilterServiceMutation,
  useCreateTaskMutation,
  useGetTaskMutation,
  useGetTaskDetailsMutation,
  useGetTaskByTypeMutation,
  useGetInvitedTasksMutation,
  useUpdateTaskMutation,
  useGetChatListMutation,
  useGetChatMutation,
  useSendMessageMutation,
  useCreateOfferMutation,
  useGetOfferMutation,
  useUpdateOfferMutation,
  useRateServiceMutation,
} = api;
