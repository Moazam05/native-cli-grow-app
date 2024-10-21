import {apiSlice} from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => {
        console.log('data', data);
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {useLoginMutation} = authApiSlice;
