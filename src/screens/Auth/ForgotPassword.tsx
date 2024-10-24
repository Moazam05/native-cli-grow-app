import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import BackButton from '../../components/BackButton';
import CustomInput from '../../components/CustomInput';
import OtpTimer from './components/OtpTimer';
import CustomText from '../../components/CustomText';
import GuidelineText from './components/GuidelineText';
import CustomButton from '../../components/CustomButton';
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from '../../redux/api/authApiSlice';
import Toast from 'react-native-toast-message';

const validatePasswordLength = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  return regex.test(password);
};

const validatePasswordEntry = (
  password: string,
  name: string,
  email: string,
) => {
  if (!validatePasswordLength(password)) {
    return {msg: 'Password length must be 8 to 20 characters', result: false};
  }
  if (name && password.toLowerCase().includes(name.toLowerCase())) {
    return {msg: "Must not contain user's name", result: false};
  }

  if (email && password.toLowerCase().includes(email.toLowerCase())) {
    return {msg: "Must not contain user's email id", result: false};
  }

  return {msg: 'Passed Local Test!', result: true};
};

interface PasswordInputs {
  password: string;
  confirmpassword: string;
  otp: string;
}

const ForgotPassword = ({route}: any) => {
  const navigation: any = useNavigation();
  const {colors} = useTheme();

  const [otpSent, setOtpSent] = useState(false);
  const [inputs, setInputs] = useState<PasswordInputs>({
    password: '',
    confirmpassword: '',
    otp: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string | undefined}>();
  const [loading, setLoading] = useState(false);

  const handleOnChange = (text: string, fieldName: string) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [fieldName]: text,
    }));
    // Clear the error when the user starts typing again
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string | undefined} = {};
    if (!inputs.password.trim()) {
      newErrors.password = 'Enter new password';
    }
    if (!inputs.confirmpassword.trim()) {
      newErrors.confirmpassword = 'Enter confirm password';
    }
    if (
      !validatePasswordEntry(inputs.password, 'test', route?.params?.email)
        .result
    ) {
      newErrors.password =
        'Set a stronger password, kindly refer to guidelines below.';
    }

    if (inputs?.confirmpassword !== inputs?.password) {
      newErrors.confirmpassword = 'Confirm Password not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // todo: Resend OTP for Reset Password
  const [resendOTP, {isLoading}] = useResendOTPMutation();

  const handleUpdatePassword = async () => {
    if (validateForm()) {
      const payload = {
        email: route.params.email,
        otp_type: 'reset_password',
      };
      try {
        const res = await resendOTP(payload);
        if (!res?.error) {
          setOtpSent(true);

          Toast.show({
            type: 'successToast',
            props: {
              msg: 'OTP sent successfully',
            },
          });
        }

        if (res?.error) {
          Toast.show({
            type: 'warningToast',
            props: {
              msg: res?.error?.data?.message,
            },
          });
        }
      } catch (error) {
        console.log('OTP Error', error);
        Toast.show({
          type: 'warningToast',
          props: {
            msg: 'Something went wrong',
          },
        });
      }
    }
  };

  // todo: Verify OTP for Reset Password
  const [passwordVerifyOTP, {isLoading: passwordLoading}] =
    useVerifyOTPMutation();

  const verifyOtp = async () => {
    const payload = {
      email: route.params.email,
      otp: inputs.otp,
      otp_type: 'reset_password',
      data: inputs.password,
    };

    try {
      const user = await passwordVerifyOTP(payload);

      if (!user?.error) {
        navigation.navigate('LoginScreen');
      }

      if (user?.error) {
        Toast.show({
          type: 'warningToast',
          props: {
            msg: user?.error?.data?.message,
          },
        });
      }
    } catch (error) {
      console.log('Check Email Error', error);
      Toast.show({
        type: 'warningToast',
        props: {
          msg: 'Something went wrong',
        },
      });
    }
  };

  return (
    <CustomSafeAreaView>
      <BackButton />
      <CustomInput
        label="NEW PASSWORD"
        placeholder="8-20 Characters"
        value={inputs?.password}
        error={errors?.password}
        onChangeText={text => handleOnChange(text, 'password')}
        password
      />
      <CustomInput
        label="CONFIRM NEW PASSWORD"
        placeholder="8-20 Characters"
        error={errors?.confirmpassword}
        value={inputs.confirmpassword}
        onChangeText={text => handleOnChange(text, 'confirmpassword')}
        password
      />

      {otpSent && (
        <CustomInput
          error={errors?.otp}
          value={inputs.otp}
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={verifyOtp}
          rightIcon={
            <OtpTimer
              style={{
                color: colors.text,
                opacity: 0.8,
                fontSize: RFValue(10),
                right: 20,
              }}
              type="email"
              onPress={() => handleUpdatePassword()}
            />
          }
          maxLength={6}
          onChangeText={text => handleOnChange(text, 'otp')}
        />
      )}

      <View style={styles.bottomBtn}>
        {errors?.otp && (
          <View style={styles.errorContainer}>
            <CustomText variant="h7">
              Wrong OTP, 2 attempts remaining
            </CustomText>
          </View>
        )}
        <GuidelineText
          text={[
            'Password must have at least one uppercase and lowercase letter.',
            'Must contain at least one number and one special character',
            "Must not contain user's first/last name & email id",
            'Must be different from previous password',
          ]}
        />
        <CustomButton
          disabled={isLoading || passwordLoading}
          loading={isLoading || passwordLoading}
          text={otpSent ? 'UPDATE PASSWORD' : 'SEND OTP'}
          onPress={otpSent ? verifyOtp : handleUpdatePassword}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 4,
    alignItems: 'center',
  },
  bottomBtn: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    right: 10,
    left: 10,
  },
});

export default ForgotPassword;
