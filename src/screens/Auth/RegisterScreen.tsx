import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import CenteredLogo from './components/CenteredLogo';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import GuidelineText from './components/GuidelineText';

const validatePasswordLength = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  return regex.test(password);
};

const RegisterScreen = ({route}: any) => {
  const navigation: any = useNavigation();

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!validatePasswordLength(password)) {
      setPasswordError('Please enter a valid password');
      return false;
    }
    return true;
  };

  const handleOnSubmit = async () => {
    setLoading(true);

    if (validate()) {
      setTimeout(() => {
        navigation.navigate('PhoneScreen');
      }, 2000);
    }
    setLoading(false);
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
          label="SET PASSWORD"
          returnKeyType="done"
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
      </ScrollView>
      <View style={styles.bottomBtn}>
        <GuidelineText
          text={[
            'Password must have at least one uppercase and lowercase letter.',
            'Must contain atleast one number and one special character',
            "Must not contain user's first/last name & email id",
          ]}
        />
        <CustomButton
          text="NEXT"
          loading={loading}
          disabled={loading}
          onPress={() => {
            handleOnSubmit();
          }}
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

export default RegisterScreen;
