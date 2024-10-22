import HomeScreen from '../screens/Home/HomeScreen';
import EmailPasswordScreen from '../screens/Auth/EmailPasswordScreen';
import EmailOtpScreen from '../screens/Auth/EmailOtpScreen';
import PinScreen from '../screens/Auth/PinScreen';
import AccountProtectedScreen from '../screens/Auth/AccountProtectedScreen';
import PersonalDetailScreen from '../screens/Auth/PersonalDetailScreen';
import ConfirmPinScreen from '../screens/Auth/ConfirmPinScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
// import PhoneScreen from '../screens/Auth/PhoneScreen';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import SplashScreen from '../screens/SplashScreen';
import AuthVerificationScreen from '../screens/Auth/AuthVerificationScreen';
import ProfileScreen from '../screens/Auth/ProfileScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import EmailScreen from '../screens/Auth/EmailScreen';

export const authStacks = [
  {
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    name: 'EmailScreen',
    component: EmailScreen,
  },
  {
    name: 'EmailPasswordScreen',
    component: EmailPasswordScreen,
  },
  {
    name: 'EmailOtpScreen',
    component: EmailOtpScreen,
  },
  {
    name: 'PinScreen',
    component: PinScreen,
  },
  {
    name: 'ConfirmPinScreen',
    component: ConfirmPinScreen,
  },
  {
    name: 'AccountProtectedScreen',
    component: AccountProtectedScreen,
  },
  {
    name: 'PersonalDetailScreen',
    component: PersonalDetailScreen,
  },
  {
    name: 'RegisterScreen',
    component: RegisterScreen,
  },
  {
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    name: 'AuthVerificationScreen',
    component: AuthVerificationScreen,
  },
  {
    name: 'SplashScreen',
    component: SplashScreen,
  },
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
  },
];

export const dashboardStack = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
  },
];

export const mergedStacks = [...dashboardStack, ...authStacks];
