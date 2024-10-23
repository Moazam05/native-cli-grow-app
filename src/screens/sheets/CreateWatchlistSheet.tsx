import {View} from 'react-native';
import React from 'react';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {useTheme} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../../components/CustomText';
import {FONTS} from '../../constants/Fonts';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const CreateWatchlistSheet = (props: SheetProps<'create-watchlist'>) => {
  const {colors} = useTheme();

  return (
    <ActionSheet
      id={props.sheetId}
      headerAlwaysVisible={false}
      isModal={true}
      onClose={() => {
        SheetManager.hide(props.sheetId);
      }}
      springOffset={0}
      containerStyle={{
        backgroundColor: colors.card,
      }}>
      <View
        style={{
          backgroundColor: colors.card,
          padding: 20,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <CustomText variant="h7" fontFamily={FONTS.Medium}>
          Create new watchlist
        </CustomText>
        <CustomInput
          rightIcon={
            <Icon
              name="close"
              size={RFValue(10)}
              color={colors.text}
              style={{marginRight: 2}}
            />
          }
          focusable
          placeholder="Enter watchlist name"
          placeholderTextColor={colors.text}
          containerStyle={{
            padding: 10,
            borderWidth: 1.5,
            borderBottomWidth: 1.5,
            borderColor: colors.text,
            borderRadius: 10,
            height: 50,
            marginVertical: 10,
          }}
          onBlur={() => {}}
          autoFocus
        />
        <CustomButton
          onPress={() => {}}
          loading={false}
          disabled={false}
          text="CREATE"
        />
      </View>
    </ActionSheet>
  );
};

export default CreateWatchlistSheet;
