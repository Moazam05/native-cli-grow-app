import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {FONTS} from '../../constants/Fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Logo from '../../assets/images/logo.png';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import CustomText from '../../components/CustomText';
import TouchableText from '../../components/TouchableText';
import RoundOTPInput from './components/RoundOTPInput';
import CustomNumberPad from './components/CustomNumberPad';
import {useNavigation} from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser} from '../../redux/auth/authSlice';
import axios from 'axios';
import {
  useUploadBiometricMutation,
  useVerifyBiometricMutation,
} from '../../redux/api/authApiSlice';
import Toast from 'react-native-toast-message';

const initialState = ['', '', '', ''];

interface BiometricProp {
  onForgotPin: () => void;
}

const BiometricVerification: FC<BiometricProp> = ({onForgotPin}) => {
  const navigation: any = useNavigation();
  const loginUser = useTypedSelector(selectedUser);

  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  const handlePressNumber = (number: number | string) => {
    if (focusedIndex < otpValues.length) {
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex] = number.toString();
      setOtpError(null);
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex + 1);
    }
  };

  const handlePressBackspace = () => {
    if (focusedIndex > 0) {
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex - 1] = '';
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex - 1);
    }
  };

  const rnBiometrics = new ReactNativeBiometrics();

  const checkBiometrics = async () => {
    try {
      const {biometryType} = await rnBiometrics.isSensorAvailable();
      return biometryType;
    } catch (error) {
      return null;
    }
  };

  // todo: Upload Biometric
  const [uploadBiometric, {isLoading}] = useUploadBiometricMutation();

  // todo: Verify Biometric
  const [verifyBiometric, {isLoading}] = useVerifyBiometricMutation();

  const loginWithBiometrics = async () => {
    try {
      const isBiometricAvailable = await checkBiometrics();
      if (!isBiometricAvailable) {
        throw new Error('Biometric not available');
      }
      const {keysExist} = await rnBiometrics.biometricKeysExist();

      if (!keysExist) {
        const {publicKey} = await rnBiometrics.createKeys();
        console.log('publicKey', publicKey);
        const payload = {
          public_key: publicKey,
        };

        try {
          const user = await uploadBiometric(payload);

          console.log('user PPPPPPPP', user);

          if (user?.error) {
            Toast.show({
              type: 'warningToast',
              props: {
                msg: user?.error?.data?.message,
              },
            });
          }
        } catch (error) {
          console.log('Biometric Error', error);
          Toast.show({
            type: 'warningToast',
            props: {
              msg: 'Something went wrong',
            },
          });
        }
      }

      const {success, signature} = await rnBiometrics.createSignature({
        promptMessage: 'Sign in',
        payload: loginUser?.data?.user?._id,
      });

      console.log('signature', signature);

      if (!success) {
        throw new Error('Biometrics authentication failed!');
      }

      const payload = {
        signature,
      };

      try {
        const userTwo = await verifyBiometric(payload);

        console.log('user PPPPPPPP', userTwo);

        if (userTwo?.error) {
          Toast.show({
            type: 'warningToast',
            props: {
              msg: userTwo?.error?.data?.message,
            },
          });
        }
      } catch (error) {
        console.log('Verify Biometric Error', error);
        Toast.show({
          type: 'warningToast',
          props: {
            msg: 'Something went wrong',
          },
        });
      }
      // const res = await appAxios.post('/auth/verify-biometric', {
      //   signature: signature,
      // });
      // token_storage.set(
      //   'socket_access_token',
      //   res.data.socket_tokens.socket_access_token,
      // );
      // token_storage.set(
      //   'socket_refresh_token',
      //   res.data.socket_tokens.socket_refresh_token,
      // );
      return {msg: 'Success', result: true};
    } catch (error: any) {
      return {msg: error?.response?.data?.msg, result: false};
    }
  };

  const handleBiometricVerification = async () => {
    const {msg, resut} = await loginWithBiometrics();
    // console.log('isVerified', isVerified);

    // if (isVerified) {
    //   setOtpValues(['B', 'I', 'O', 'P']);
    // }
  };

  const handlePressCheckmark = async () => {
    let valid = false;
    if (otpValues.join('') === 'BIOP') {
      return;
    }
    otpValues.forEach(i => {
      if (i === '') {
        valid = true;
        setOtpError('Enter PIN');
        setOtpValues(initialState);
        setFocusedIndex(0);
      }
    });
    if (!valid) {
      setLoading(true);
      // navigation.navigate('HomeScreen');
      setOtpValues(initialState);
      setFocusedIndex(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    const allFilled = otpValues.every(value => value !== '');
    if (allFilled) {
      handlePressCheckmark();
    }
  }, [otpValues]);

  useEffect(() => {
    handleBiometricVerification();
  }, []);
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <CustomText variant="h6" fontFamily={FONTS.Bold}>
          Enter Groww PIN
        </CustomText>
        <View style={styles.emailContainer}>
          <CustomText style={styles.subText}>
            {loginUser?.data?.user?.email}
          </CustomText>
          <TouchableText
            firstText="Logout"
            style={styles.logoutText}
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}
          />
        </View>
      </View>

      <RoundOTPInput
        onForgotPin={onForgotPin}
        loading={loading}
        otpValues={otpValues}
        error={otpError}
      />

      <CustomNumberPad
        customFont
        onPressBiometric={handleBiometricVerification}
        isBiometric={true}
        onPressNumber={handlePressNumber}
        onPressBackspace={handlePressBackspace}
        onPressCheckmark={handlePressCheckmark}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(25),
    marginBottom: RFValue(10),
  },
  logo: {
    height: RFValue(25),
    width: RFValue(25),
    alignSelf: 'center',
    marginBottom: 8,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 15,
  },
  subText: {
    fontSize: RFValue(10),
  },
  logoutText: {
    fontFamily: FONTS.Regular,
    fontSize: RFValue(10),
  },
});

export default BiometricVerification;
