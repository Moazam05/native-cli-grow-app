import React from 'react';
import Navigation from './src/routes/Navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID} from '@env';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/components/ToastConfig/ToastConfig';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import './src/screens/sheets/sheet';
import {LogBox} from 'react-native';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId: GOOGLE_IOS_CLIENT_ID,
});

LogBox.ignoreLogs([
  'Warning: Unknown: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
]);

const App = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
    <Toast
      visibilityTime={2500}
      config={toastConfig}
      bottomOffset={0}
      swipeable={false}
      position="bottom"
    />
  </GestureHandlerRootView>
);

export default App;
