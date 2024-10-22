import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {FONTS} from '../../constants/Fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import BackButton from '../../components/BackButton';
import CustomText from '../../components/CustomText';
import OTPInput from './components/OTPInput';
import CustomNumberPad from './components/CustomNumberPad';
import {useNavigation} from '@react-navigation/native';
import {useConfirmLoginPinMutation} from '../../redux/api/authApiSlice';
import Toast from 'react-native-toast-message';

const ConfirmPinScreen = ({route}: any) => {
  const navigation: any = useNavigation();

  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
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

  // todo: Confirm Login Pin
  const [confirmLoginPin, {isLoading}] = useConfirmLoginPinMutation();

  const handlePressCheckmark = async () => {
    let valid = false;
    const isNotEmpty = otpValues.map(i => {
      if (i === '') {
        valid = true;
        setOtpError('Enter all PIN');
      }
    });

    if (otpValues.toString() !== route.params.pin) {
      valid = true;
      setOtpValues(['', '', '', '']);
      setFocusedIndex(0);
      setOtpError('PIN not matching');
    }

    if (!valid) {
      const payload = {
        login_pin: otpValues.join(''),
      };

      console.log('Payload', payload);

      try {
        const setPin = await confirmLoginPin(payload);

        if (!setPin?.error) {
          navigation.navigate('AccountProtectedScreen');
        }

        if (setPin?.error) {
          Toast.show({
            type: 'warningToast',
            props: {
              msg: setPin?.error?.data?.message,
            },
          });
        }
      } catch (error) {
        console.log('Verify Login Pin Error', error);
        Toast.show({
          type: 'warningToast',
          props: {
            msg: 'Something went wrong',
          },
        });
      }
    }
  };

  return (
    <CustomSafeAreaView>
      <BackButton />
      <CustomText
        variant="h5"
        fontFamily={FONTS.Medium}
        style={styles.mainContainer}>
        Confirm your Groww PIN
      </CustomText>
      <CustomText style={styles.subText}>
        Re-enter your Groww PIN for confimation.
      </CustomText>
      <OTPInput
        otpValues={otpValues}
        error={otpError}
        focusedIndex={focusedIndex}
      />

      <CustomNumberPad
        onPressNumber={handlePressNumber}
        onPressBackspace={handlePressBackspace}
        onPressCheckmark={handlePressCheckmark}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  subText: {
    opacity: 0.8,
    fontSize: RFValue(9.5),
  },
});

export default ConfirmPinScreen;
