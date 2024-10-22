import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import CenteredLogo from './components/CenteredLogo';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import TouchableText from '../../components/TouchableText';
import CustomButton from '../../components/CustomButton';
import {useLoginMutation} from '../../redux/api/authApiSlice';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../../redux/auth/authSlice';

const validatePasswordLength = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  return regex.test(password);
};

const EmailPasswordScreen = ({route}: any) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    if (!validatePasswordLength(password)) {
      setPasswordError('Please enter a valid password');
      return false;
    }
    return true;
  };

  // todo: Login API
  const [loginApi, {isLoading}] = useLoginMutation();

  const handleOnSubmit = async () => {
    if (validate()) {
      const payload = {
        email: route.params.email,
        password,
      };

      try {
        const user = await loginApi(payload);

        if (!user?.error) {
          navigation.navigate('AuthVerificationScreen');
          dispatch(setUser(user?.data));
          AsyncStorage.setItem('user', JSON.stringify(user?.data));
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
          label="ENTER PASSWORD"
          returnKeyType="done"
          placeholder="8-20 Characters"
          value={password}
          autoFocus={true}
          error={passwordError}
          onChangeText={text => {
            setPassword(text);
            setPasswordError('');
          }}
          onSubmitEditing={handleOnSubmit}
          password
        />
        <TouchableText
          onPress={() =>
            navigation.navigate('ForgotPassword', {
              email: route.params.email,
            })
          }
          firstText="Forgot Password?"
          style={styles.forgotText}
        />
      </ScrollView>
      <View style={styles.bottomBtn}>
        <CustomButton
          text="ENTER"
          loading={isLoading}
          disabled={isLoading}
          onPress={() => {
            handleOnSubmit();
          }}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotText: {
    fontSize: RFValue(10),
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  bottomBtn: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    right: 10,
    left: 10,
  },
});

export default EmailPasswordScreen;
