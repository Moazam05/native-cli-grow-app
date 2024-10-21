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

    verifyOTP: builder.mutation({
      query: data => {
        return {
          url: 'auth/verify-otp',
          method: 'POST',
          body: data,
        };
      },
    }),

    resendOTP: builder.mutation({
      query: data => {
        return {
          url: 'auth/send-otp',
          method: 'POST',
          body: data,
        };
      },
    }),

    setPassword: builder.mutation({
      query: data => {
        return {
          url: 'auth/set-password',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckEmailMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useSetPasswordMutation,
} = authApiSlice;
