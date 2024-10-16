import React from 'react';
import Navigation from './src/routes/Navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID} from '@env';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId: GOOGLE_IOS_CLIENT_ID,
});

const App = () => {
  return <Navigation />;
};

export default App;
