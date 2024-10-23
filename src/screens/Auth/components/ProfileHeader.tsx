import {View, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useTheme} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';

const ProfileHeader: FC = () => {
  const {colors} = useTheme();
  const navigation: any = useNavigation();

  return (
    <View style={styles.flexRowBetween}>
      <Icon
        name="arrow-back"
        onPress={() => {
          navigation.goBack();
        }}
        color={colors.text}
        size={RFValue(18)}
      />

      <View style={styles.flexRow}>
        <Icon
          name="settings"
          onPress={() => {}}
          color={colors.text}
          size={RFValue(18)}
        />
        <Icon2
          name="bell"
          onPress={() => {}}
          color={colors.text}
          size={RFValue(18)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
});

export default ProfileHeader;
