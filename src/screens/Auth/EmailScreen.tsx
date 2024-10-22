import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import BackButton from '../../components/BackButton';
import CenteredLogo from './components/CenteredLogo';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useCheckEmailMutation} from '../../redux/api/authApiSlice';
import Toast from 'react-native-toast-message';

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const EmailScreen = () => {
  const navigation: any = useNavigation();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validate = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  // todo: Check Email
  const [checkEmail, {isLoading}] = useCheckEmailMutation();

  const handleOnSubmit = async () => {
    if (validate()) {
      try {
        const userExist = await checkEmail({email});

        const {email_verified: EmailVerified} = userExist?.data?.data;

        if (EmailVerified) {
          navigation.navigate('EmailPasswordScreen', {email});
        } else {
          navigation.navigate('EmailOtpScreen', {email});
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
    }
  };
  return (
    <CustomSafeAreaView>
      <BackButton path="LoginScreen" />
      <ScrollView>
        <CenteredLogo />

        <CustomInput
          label="EMAIL ADDRESS"
          returnKeyType="done"
          value={email}
          inputMode="email"
          focusable={true}
          autoFocus={true}
          error={emailError}
          onEndEditing={() => validate()}
          onChangeText={text => {
            setEmail(text);
            setEmailError('');
          }}
          placeholder="Eg: me@gmail.com"
          onSubmitEditing={handleOnSubmit}
        />
      </ScrollView>

      <View style={styles.bottomBtn}>
        <CustomButton
          text="NEXT"
          loading={isLoading}
          disabled={!validateEmail(email) || isLoading}
          onPress={() => {
            handleOnSubmit();
          }}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  bottomBtn: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    right: 10,
    left: 10,
  },
});
