import React, {useState} from 'react';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import CenteredLogo from './components/CenteredLogo';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import OtpTimer from './components/OtpTimer';
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from '../../redux/api/authApiSlice';
import Toast from 'react-native-toast-message';

const EmailOtpScreen = ({route}: any) => {
  const navigation: any = useNavigation();

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  // todo: Verify OTP for Email
  const [emailVerify, {isLoading}] = useVerifyOTPMutation();

  const handleSubmit = async () => {
    if (!otp) {
      setOtpError('Enter OTP');
      return;
    }

    const payload = {
      email: route.params.email,
      otp,
      otp_type: 'email',
      data: null,
    };

    try {
      const user = await emailVerify(payload);

      if (!user?.error) {
        navigation.navigate('RegisterScreen', {
          email: route.params.email,
        });
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

  // todo: Resend OTP for Email
  const [resendOTP] = useResendOTPMutation();

  const resendOTPHandler = async () => {
    const payload = {
      email: route.params.email,
      otp_type: 'email',
    };

    try {
      const res = await resendOTP(payload);
      if (!res?.error) {
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
  };
  return (
    <CustomSafeAreaView>
      <ScrollView>
        <CenteredLogo />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View pointerEvents="none">
            <CustomInput label="EMAIL ADDRESS" value={route.params.email} />
          </View>
        </TouchableOpacity>

        <CustomInput
          label="ENTER OTP SEND TO THIS EMAIL ID"
          value={otp}
          onChangeText={t => {
            setOtp(t);
            setOtpError('');
          }}
          onSubmitEditing={() => {}}
          error={otpError}
          // returnKeyType="done"
          maxLength={6}
          keyboardType="number-pad"
          rightText={
            <OtpTimer type="email" onPress={() => resendOTPHandler()} />
          }
        />
      </ScrollView>
      <View style={styles.bottomBtn}>
        <CustomButton
          text="VERIFY EMAIL ID"
          loading={isLoading}
          disabled={isLoading}
          onPress={() => handleSubmit()}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomBtn: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    right: 10,
    left: 10,
  },
});

export default EmailOtpScreen;
