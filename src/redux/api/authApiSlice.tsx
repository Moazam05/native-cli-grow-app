import {apiSlice} from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
        };
      },
    }),

    checkEmail: builder.mutation({
      query: data => {
        return {
          url: 'auth/check-email',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {useLoginMutation, useCheckEmailMutation} = authApiSlice;
