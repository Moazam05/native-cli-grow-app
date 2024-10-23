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

    updateProfile: builder.mutation({
      query: data => {
        return {
          url: 'auth/profile',
          method: 'PUT',
          body: data,
        };
      },
    }),

    setLoginPin: builder.mutation({
      query: data => {
        return {
          url: 'auth/set-pin',
          method: 'POST',
          body: data,
        };
      },
    }),

    confirmLoginPin: builder.mutation({
      query: data => {
        return {
          url: 'auth/verify-pin',
          method: 'POST',
          body: data,
        };
      },
    }),

    uploadBiometric: builder.mutation({
      query: data => {
        return {
          url: 'auth/upload-biometric',
          method: 'POST',
          body: data,
        };
      },
    }),

    verifyBiometric: builder.mutation({
      query: data => {
        return {
          url: 'auth/verify-biometric',
          method: 'POST',
          body: data,
        };
      },
    }),

    logout: builder.mutation({
      query: () => {
        return {
          url: 'auth/logout',
          method: 'POST',
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
  useUpdateProfileMutation,
  useSetLoginPinMutation,
  useConfirmLoginPinMutation,
  useUploadBiometricMutation,
  useVerifyBiometricMutation,
  useLogoutMutation,
} = authApiSlice;
