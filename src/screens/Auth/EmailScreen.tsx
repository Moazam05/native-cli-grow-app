import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import BackButton from '../../components/BackButton';
import CenteredLogo from './components/CenteredLogo';
import CustomInput from '../../components/CustomInput';
import CustomText from '../../components/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import TouchableText from '../../components/TouchableText';
import CustomButton from '../../components/CustomButton';

const EmailScreen = () => {
  const [loading, setLoading] = useState(false);

  return (
    <CustomSafeAreaView>
      <BackButton path="LoginScreen" />
      <ScrollView>
        <CenteredLogo />

        <CustomInput
          label="EMAIL ADDRESS"
          returnKeyType="done"
          placeholder="Eg: me@gmail.com"
          onSubmitEditing={() => {}}
        />

        <CustomInput
          label="ENTER PASSWORD"
          returnKeyType="done"
          placeholder="8-20 Characters"
          onSubmitEditing={() => {}}
          password
        />

        <CustomInput
          label=""
          placeholder="Enter OTP"
          onSubmitEditing={() => {}}
          keyboardType="number-pad"
          rightIcon={
            <CustomText
              style={{
                fontSize: RFValue(9),
              }}>
              Resend in 25s
            </CustomText>
          }
        />

        <CustomInput
          label="ENTER OTP SEND TO THIS EMAIL ID"
          placeholder="Enter OTP"
          onSubmitEditing={() => {}}
          keyboardType="number-pad"
          rightIcon={
            <TouchableText
              onPress={() => {}}
              firstText="Resend in 25s"
              style={{
                fontSize: RFValue(9),
                marginTop: 0,
              }}
            />
          }
        />

        <CustomButton
          text="NEXT"
          loading={loading}
          disabled={loading}
          onPress={() => {
            setLoading(true);
          }}
        />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default EmailScreen;
