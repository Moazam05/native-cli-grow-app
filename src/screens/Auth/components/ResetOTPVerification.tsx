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

interface pin {
  pin: string;
}

const ResetOTPVerification: FC<pin> = ({pin}) => {
  const {colors} = useTheme();
  const navigation: any = useNavigation();

  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otp, setOtp] = useState<string>('');

  const handleVerification = async () => {
    setLoading(true);
    if (!otp) {
      setLoading(false);
      setOtpError('Enter OTP');
      return;
    }

    setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000);

    setLoading(false);
  };

  const handleChange = (text: string) => {
    setOtp(text);
    setOtpError(null);
  };

  const resendOtp = async () => {
    //
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

          <CustomText style={styles.subText}>
            Enter OTP sent to +92 *****02312
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
            loading={loading}
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
