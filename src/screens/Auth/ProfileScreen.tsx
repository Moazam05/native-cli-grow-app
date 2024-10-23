import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC, useEffect} from 'react';
import {FONTS} from '../../constants/Fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import CustomText from '../../components/CustomText';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser} from '../../redux/auth/authSlice';
import {useCustomTheme} from '../../themes/Theme';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import UserAvatar from '../../components/UserAvatar';
import ProfileHeader from './components/ProfileHeader';
import {setTheme} from '../../redux/theme/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress?: () => void;
}

const ProfileItem: FC<ProfileItemProps> = ({
  icon,
  title,
  description,
  onPress,
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.flexRow, {borderBottomWidth: 0, gap: 5}]}>
      {icon}
      <View
        style={[
          styles.flexRowBetween,
          {width: '100%', borderColor: colors.border},
        ]}>
        <View>
          <CustomText fontFamily={FONTS.Medium} variant="h7">
            {title}
          </CustomText>
          <CustomText variant="h9" style={{opacity: 0.7, marginTop: 3}}>
            {description}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const user = useTypedSelector(selectedUser);
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const theme = useCustomTheme();
  const {dark} = theme;

  const changeTheme = () => {
    const themeType = dark ? 'light' : 'dark';

    dispatch(setTheme(themeType));
    AsyncStorage.setItem('theme', themeType);
  };

  return (
    <CustomSafeAreaView style={{paddingHorizontal: 0}}>
      <ProfileHeader />

      <ScrollView contentContainerStyle={{paddingVertical: 20}}>
        <View style={[styles.flexRowBetween, {borderColor: colors.border}]}>
          <View style={styles.flexRow}>
            <UserAvatar style={styles.img} />
            <View>
              <CustomText fontFamily={FONTS.Medium} variant="h5">
                {user?.data?.user?.name}
              </CustomText>
              <CustomText variant="h9" style={{opacity: 0.7, marginTop: 6}}>
                Account Details
              </CustomText>
            </View>
          </View>
          <Icon
            name="chevron-right"
            size={RFValue(18)}
            style={{opacity: 0.7}}
            color={colors.text}
          />
        </View>

        <ProfileItem
          icon={
            <Icon2
              name="gift"
              size={RFValue(18)}
              style={{opacity: 0.7, marginHorizontal: 20}}
              color={colors.text}
            />
          }
          title="Refer"
          description="Invite friends on Groww"
        />

        <ProfileItem
          icon={
            <Icon
              name="account-balance-wallet"
              size={RFValue(18)}
              style={{opacity: 0.7, marginHorizontal: 20}}
              color={colors.text}
            />
          }
          title={`PKR ${user?.data?.user?.bank_amount}`}
          description="Stocks, F&O Balance"
        />

        <ProfileItem
          icon={
            <Icon
              name="receipt"
              size={RFValue(18)}
              style={{opacity: 0.7, marginHorizontal: 20}}
              color={colors.text}
            />
          }
          title="All Orders"
          description="Track orders, order details"
        />

        <ProfileItem
          icon={
            <Icon2
              name="bank"
              size={RFValue(18)}
              style={{opacity: 0.7, marginHorizontal: 20}}
              color={colors.text}
            />
          }
          title="Bank detail"
          description="Banks & AutoPay mandates"
        />

        <ProfileItem
          // onPress={async () => {
          //   await dispatch(
          //     toggleColorScheme(theme == 'dark' ? 'light' : 'dark'),
          //   );
          // }}
          onPress={() => {
            changeTheme();
          }}
          icon={
            <Icon
              name={dark ? 'light-mode' : 'dark-mode'}
              size={RFValue(18)}
              style={{opacity: 0.7, marginHorizontal: 20}}
              color={colors.text}
            />
          }
          title={dark ? 'Change Light' : 'Change Dark'}
          description="Update your theme "
        />

        <ProfileItem
          onPress={async () => {
            // await dispatch(Logout());
          }}
          icon={
            <Icon
              name="exit-to-app"
              size={RFValue(18)}
              style={{opacity: 0.7, marginHorizontal: 20}}
              color={colors.text}
            />
          }
          title="Logout"
          description="Logout from the app"
        />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  img: {
    width: RFValue(35),
    height: RFValue(35),
    marginRight: 10,
  },
});

export default ProfileScreen;
