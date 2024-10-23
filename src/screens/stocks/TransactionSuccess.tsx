import React, {FC} from 'react';
import Lottie from 'lottie-react-native';
import {View, StyleSheet} from 'react-native';
import Anim from '../../assets/animations/confirm.json';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import CustomText from '../../components/CustomText';
import {FONTS} from '../../constants/Fonts';
import CustomButton from '../../components/CustomButton';
interface ParamsType {
  msg?: string;
}
const TransactionSuccess: FC = () => {
  const route = useRoute<RouteProp<ParamListBase>>();

  const msg = (route.params as ParamsType)?.msg || null;
  const navigation: any = useNavigation();

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          <Lottie
            source={Anim}
            speed={0.9}
            loop={false}
            style={styles.animation}
            autoPlay
          />
          <CustomText variant="h4" fontFamily={FONTS.Bold}>
            Order Successful
          </CustomText>
          <CustomText
            variant="h8"
            fontFamily={FONTS.Regular}
            style={{marginTop: 20, textAlign: 'center'}}>
            {msg}
          </CustomText>
        </View>
      </View>
      <View style={[styles.btnContainer]}>
        <CustomButton
          text={'Done'}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomTab'}],
            });
          }}
          loading={false}
          disabled={false}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  animationContainer: {
    height: 280,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: 120,
  },
  btnContainer: {
    justifyContent: 'flex-end',
    flex: 0.2,
    padding: 10,
  },
});

export default TransactionSuccess;
