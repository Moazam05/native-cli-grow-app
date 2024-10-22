import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import LottieView from 'lottie-react-native';
import Anim from '../../assets/animations/loader.json';
import {useNavigation} from '@react-navigation/native';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser} from '../../redux/auth/authSlice';

const SplashScreen = () => {
  const navigate: any = useNavigation();
  const loginUser = useTypedSelector(selectedUser);

  useEffect(() => {
    setTimeout(() => {
      if (loginUser?.data?.user?.email) {
        navigate.navigate('BottomTab');
      } else {
        navigate.navigate('LoginScreen');
      }
    }, 2500);
  }, []);

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop
          speed={0.9}
          source={Anim}
          style={{width: 250, height: 250}}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
