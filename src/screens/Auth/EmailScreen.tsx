import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import BackButton from '../../components/BackButton';
import CenteredLogo from './components/CenteredLogo';

const EmailScreen = () => {
  return (
    <CustomSafeAreaView>
      <BackButton path="LoginScreen" />
      <ScrollView>
        <CenteredLogo />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default EmailScreen;
