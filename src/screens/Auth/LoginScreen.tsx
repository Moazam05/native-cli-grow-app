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

const LoginScreen = () => {
  const theme = useColorScheme();

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
      </View>
    </CustomSafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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
});
