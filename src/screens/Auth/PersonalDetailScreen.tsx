import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import BackButton from '../../components/BackButton';
import CustomText from '../../components/CustomText';
import {FONTS} from '../../constants/Fonts';
import CustomInput from '../../components/CustomInput';
import CustomDateInput from '../../components/CustomDateInput';
import CustomRadioInput from '../../components/CustomRadioInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useUpdateProfileMutation} from '../../redux/api/authApiSlice';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {selectedUser, setUser} from '../../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTypedSelector from '../../hooks/useTypedSelector';
import {formatToISO} from '../../utils';

interface Inputs {
  name: string;
  date_of_birth: string;
  gender: string;
}

const PersonalDetailScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const loginUser = useTypedSelector(selectedUser);

  const [inputs, setInputs] = useState<Inputs>({
    name: '',
    date_of_birth: '',
    gender: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string | undefined}>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleOnChange = (text: string, fieldName: string) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [fieldName]: text,
    }));
    // Clear the error when the user starts typing again
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string | undefined} = {};

    if (!inputs.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!inputs.date_of_birth.trim()) {
      newErrors.date_of_birth = 'Date is required';
    }
    if (!inputs.gender.trim()) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);

    setIsFormValid(Object.keys(newErrors).length === 0);

    return Object.keys(newErrors).length === 0;
  };

  // todo: Update Profile
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();

  const handleOnSubmit = async () => {
    if (validateForm()) {
      const payload = {
        name: inputs.name,
        date_of_birth: formatToISO(inputs.date_of_birth), // Convert to ISO format
        gender: inputs.gender,
      };

      try {
        const res = await updateProfile(payload);

        if (!res?.error) {
          const oldUser = loginUser;
          // Merge oldUser with the new user data from res
          const updatedUser = {
            ...oldUser, // Keep other properties like token, etc.
            data: {
              user: res?.data?.data?.user, // Update the user object with new data
            },
          };

          dispatch(setUser(updatedUser));
          AsyncStorage.setItem('user', JSON.stringify(updatedUser));

          // Navigate to the PinScreen
          navigation.navigate('PinScreen');
        }

        if (res?.error) {
          Toast.show({
            type: 'warningToast',
            props: {
              msg: res?.error?.data?.message,
            },
          });
        }
      } catch (error) {
        console.log('Update Profile Error', error);
        Toast.show({
          type: 'warningToast',
          props: {
            msg: 'Something went wrong',
          },
        });
      }
    }
  };

  return (
    <CustomSafeAreaView>
      <BackButton />
      <CustomText variant="h4" fontFamily={FONTS.Bold} style={styles.headText}>
        Personal Details
      </CustomText>

      <ScrollView
        contentContainerStyle={{
          marginTop: 20,
          flex: 1,
          flexDirection: 'column',
          gap: 20,
        }}>
        <CustomInput
          label="NAME (AS PER YOUR PAN CARD)"
          returnKeyType="done"
          value={inputs.name}
          error={errors?.name}
          onChangeText={text => {
            handleOnChange(text, 'name');
          }}
        />

        <CustomDateInput
          label="DATE OF BIRTH"
          error={errors?.date_of_birth}
          onDateChange={text => {
            handleOnChange(text, 'date_of_birth');
          }}
        />

        <CustomRadioInput
          label="GENDER"
          error={errors?.gender}
          options={['Male', 'Female', 'Other']}
          onSelect={(text: string) => {
            return handleOnChange(text, 'gender');
          }}
          selected={inputs?.gender}
        />
      </ScrollView>

      <View style={styles.bottomBtn}>
        <CustomButton
          text="NEXT"
          loading={isLoading}
          disabled={isLoading}
          onPress={handleOnSubmit}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  headText: {
    marginVertical: 10,
  },
  bottomBtn: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    right: 10,
    left: 10,
  },
});
export default PersonalDetailScreen;
