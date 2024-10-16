import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';

interface BackButtonProps {
  path?: string;
}
const BackButton: FC<BackButtonProps> = ({path}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        path ? navigation.navigate(path) : navigation.goBack();
      }}>
      <Icon name="arrow-back" color={colors.text} size={RFValue(20)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 2,
    marginBottom: 5,
  },
});
export default BackButton;
