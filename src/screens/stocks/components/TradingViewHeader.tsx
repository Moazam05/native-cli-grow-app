import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useTheme} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import Orientation from 'react-native-orientation-locker';
import CustomText from '../../../components/CustomText';

const TradingViewHeader = () => {
  const {colors} = useTheme();
  const [orientation, setOrientation] = useState('PORTRAIT');
  const navigation = useNavigation();

  return (
    <View style={[styles.flexRow, {borderColor: colors.border}]}>
      <Icon
        name="arrow-back"
        onPress={() => {
          navigation.goBack();
          Orientation.unlockAllOrientations();
          Orientation.lockToPortrait();
        }}
        color={colors.text}
        size={RFValue(18)}
      />
      <CustomText variant="h8">5m</CustomText>

      <CustomText variant="h5" style={{opacity: 0.5}}>
        |
      </CustomText>
      <Icon2
        name="screen-rotation"
        onPress={() => {
          Orientation.unlockAllOrientations();
          if (orientation === 'PORTRAIT') {
            Orientation.lockToLandscape();
            setOrientation('LANDSCAPE');
          } else {
            Orientation.lockToPortrait();
            setOrientation('PORTRAIT');
          }
        }}
        color={colors.text}
        size={RFValue(16)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 10,
    borderBottomWidth: 2,
  },
});

export default TradingViewHeader;
