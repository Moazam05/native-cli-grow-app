import {Image, StyleSheet, useColorScheme, View} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import CustomText from '../../components/CustomText';
import {FONTS} from '../../constants/Fonts';
import {Images} from '../../assets/images';
import {
  normalizeModerately,
  screenHeight,
  screenWidth,
} from '../../utils/Scaling';
import SocialLoginButton from '../../components/SocialLoginButton';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableText from '../../components/TouchableText';
import {useNavigation} from '@react-navigation/native';
import BottomText from '../../components/BottomText';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  const theme = useColorScheme();
  const navigation: any = useNavigation();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      GoogleSignin.signOut();
      const {idToken} = await GoogleSignin.signIn();
      console.log(idToken);
      // navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <CustomText variant="h3" fontFamily={FONTS.Medium}>
          Together we Grow
        </CustomText>
        <CustomText variant="h7" style={styles.subText} fontFamily={FONTS.Bold}>
          Invest • Pay • Loans
        </CustomText>

        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={
              theme === 'dark' ? Images.LoginImageDark : Images.LoginImageLight
            }
          />
        </View>

        <SocialLoginButton
          icon={<Image source={Images.GoogleIcon} style={styles.gimg} />}
          text="Continue with Google"
          onPress={async () => {
            signInWithGoogle();
          }}
        />
        {/* <SocialLoginButton
          icon={<Icon name="logo-apple" size={18} color="black" />}
          text="Continue with Apple"
          onPress={async () => {}}
        /> */}

        <TouchableText
          firstText="Use other email ID"
          onPress={() => {
            navigation.navigate('EmailScreen');
          }}
          style={styles.touchText}
        />

        <BottomText />
      </View>
    </CustomSafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subText: {
    marginTop: 16,
    opacity: 0.6,
  },
  imgContainer: {
    width: screenWidth,
    height: screenHeight * 0.45,
    marginVertical: normalizeModerately(25),
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  gimg: {
    height: 20,
    width: 20,
  },
  touchText: {
    marginVertical: 30,
    marginTop: 15,
  },
});
