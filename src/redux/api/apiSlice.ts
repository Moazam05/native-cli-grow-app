import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store'; // Import your RootState type

export const apiSlice = createApi({
  reducerPath: 'api', // Unique and descriptive reducerPath
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://your-api-url.com', // Replace with your actual API base URL
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).user?.user?.token || '';
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
      }
      return headers;
    },
  }),
  tagTypes: [], // Define tag types as needed for cache invalidation
  endpoints: builder => ({
    // Define your endpoints here
  }),
});
