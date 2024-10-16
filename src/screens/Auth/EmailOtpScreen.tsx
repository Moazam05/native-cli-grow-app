import React, {useState} from 'react';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import CenteredLogo from './components/CenteredLogo';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import OtpTimer from './components/OtpTimer';

const EmailOtpScreen = ({route}: any) => {
  const navigation: any = useNavigation();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleSubmit = async () => {
    if (!otp) {
      setOtpError('Enter OTP');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      navigation.navigate('RegisterScreen', {
        email: route.params.email,
      });
    }, 2000);
    setLoading(false);
  };

  const resendOTPHandler = async () => {
    // await
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
          onSubmitEditing={() => {
            console.log('HIT OTP API');
          }}
          error={otpError}
          returnKeyType="done"
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
          loading={loading}
          disabled={loading}
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
