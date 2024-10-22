import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store'; // Import your RootState type
import {APP_API_URL} from '@env';

export const apiSlice = createApi({
  reducerPath: 'api', // Unique and descriptive reducerPath
  baseQuery: fetchBaseQuery({
    baseUrl: APP_API_URL,
    prepareHeaders: (headers, {getState}) => {
      const auth = (getState() as RootState).auth;
      let token = auth?.user?.token;

      // Since token is nested inside user object
      if (auth && auth.user) {
        const userData = auth.user;
        token = userData.token;
      }

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
      }
      return headers;
    },
  }),
  tagTypes: [], // Define tag types as needed for cache invalidation
  endpoints: builder => ({}),
});
