import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageStyle,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser} from '../../redux/auth/authSlice';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../CustomText';
import {userPic} from '../../constants/staticData';

interface UserAvatarProps {
  style?: ImageStyle;
}

const UserAvatar: React.FC<UserAvatarProps> = ({style}) => {
  const navigation: any = useNavigation();
  const user = useTypedSelector(selectedUser);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProfileScreen');
      }}>
      {userPic.pic ? (
        <Image
          source={{
            uri: userPic.pic,
          }}
          style={[styles.img, style]}
        />
      ) : (
        <View style={[styles.img, style]}>
          <CustomText variant="h8" fontFamily={FONTS.Bold}>
            {user?.name?.split(' ')[0].charAt(0)}
            {user?.name?.split(' ')[1].charAt(0)}
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    borderRadius: 80,
    justifyContent: 'center',
    width: RFValue(25),
    height: RFValue(25),
    alignItems: 'center',
    resizeMode: 'cover',
    marginLeft: 6,
    backgroundColor: Colors.themeColor,
  },
});

export default UserAvatar;
