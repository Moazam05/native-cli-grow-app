import React, {FC, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useTheme} from '@react-navigation/native';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView';
import {Colors} from '../../../constants/Colors';
import CustomText from '../../../components/CustomText';
import {FONTS} from '../../../constants/Fonts';
import OtpTimer from './OtpTimer';
import CustomButton from '../../../components/CustomButton';
import useTypedSelector from '../../../hooks/useTypedSelector';
import {selectedUser} from '../../../redux/auth/authSlice';
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from '../../../redux/api/authApiSlice';
import Toast from 'react-native-toast-message';

interface pin {
  pin: string;
}

const ResetOTPVerification: FC<pin> = ({pin}) => {
  const {colors} = useTheme();
  const navigation: any = useNavigation();
  const loginUser = useTypedSelector(selectedUser);

  const [otpError, setOtpError] = useState<string | null>(null);
  const [otp, setOtp] = useState<string>('');

  // todo: Verify OTP for Reset Password
  const [resetPinVerifyOTP, {isLoading}] = useVerifyOTPMutation();

  const handleVerification = async () => {
    if (!otp) {
      setOtpError('Enter OTP');
      return;
    }

    const payload = {
      email: loginUser?.data?.user?.email,
      otp,
      otp_type: 'reset_pin',
      data: pin,
    };

    try {
      const user = await resetPinVerifyOTP(payload);

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

  const handleChange = (text: string) => {
    setOtp(text);
    setOtpError(null);
  };

  // todo: Resend OTP for Reset Pin
  const [resendOTP] = useResendOTPMutation();

  const resendOtp = async () => {
    const payload = {
      email: loginUser?.data?.user?.email,
      otp_type: 'reset_pin',
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
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior="padding"
      style={styles.keyboardContainer}>
      <CustomSafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Icon color={Colors.profit} name="lock" size={RFValue(22)} />
          <CustomText variant="h6" fontFamily={FONTS.Bold} style={styles.title}>
            Verify Identity
          </CustomText>

          <CustomText style={styles.subText}>Enter OTP sent to</CustomText>
          <CustomText style={styles.subText}>
            {loginUser?.data?.user?.email}
          </CustomText>

          <TextInput
            value={otp}
            maxLength={6}
            onChangeText={handleChange}
            autoFocus
            keyboardType="number-pad"
            style={[styles.input, {color: colors.text}]}
            caretHidden
          />

          {otpError && <Text style={styles.errorText}>{otpError}</Text>}

          <OtpTimer
            onPress={() => resendOtp()}
            type="otp"
            style={styles.timer}
          />
        </ScrollView>

        <View style={styles.btnContainer}>
          <CustomButton
            text={'VERIFY'}
            onPress={handleVerification}
            loading={isLoading}
            disabled={false}
          />
        </View>
      </CustomSafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: RFValue(10),
  },
  errorText: {
    color: Colors.errorColor,
    fontSize: RFValue(11),
    fontFamily: FONTS.Regular,
    marginTop: 20,
  },
  btnContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 15,
  },
  subText: {
    fontSize: RFValue(10),
    marginTop: 15,
    opacity: 0.8,
  },
  logoutText: {
    fontFamily: FONTS.Regular,
    fontSize: RFValue(10),
  },
  keyboardContainer: {
    flex: 1,
  },
  title: {
    marginTop: 20,
  },
  input: {
    marginTop: 80,
    fontSize: RFValue(18),
    borderBottomWidth: 2,
    borderBottomColor: Colors.light_border,
    width: '30%',
    textAlign: 'center',
  },
  timer: {
    fontSize: RFValue(10),
    marginTop: 60,
  },
});

export default ResetOTPVerification;
