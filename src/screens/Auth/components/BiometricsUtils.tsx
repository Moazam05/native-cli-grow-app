import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export const checkBiometrics = async () => {
  try {
    const {biometryType} = await rnBiometrics.isSensorAvailable();
    return biometryType;
  } catch (error) {
    return null;
  }
};

export const generateBiometricPublicKey = async () => {
  try {
    const {keysExist} = await rnBiometrics.biometricKeysExist();
    if (keysExist) {
      throw new Error('Biometric Key exists.');
    }
    const {publicKey} = await rnBiometrics.createKeys();
    console.log('publicKey', publicKey);
    return publicKey;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteBiometricPublicKey = async () => {
  try {
    const {keysDeleted} = await rnBiometrics.deleteKeys();
    if (!keysDeleted) {
      throw new Error('Can not remove biometrics');
    }
    console.log(keysDeleted);
    // remove from backend
  } catch (error) {
    console.log(error);
  }
};

export const loginWithBiometrics =
  (userID: string) => async (dispatch: any) => {
    try {
      const isBiometricAvailable = await checkBiometrics();
      if (!isBiometricAvailable) {
        throw new Error('Biometric not available');
      }
      const {keysExist} = await rnBiometrics.biometricKeysExist();

      if (!keysExist) {
        const {publicKey} = await rnBiometrics.createKeys();
        console.log('publicKey', publicKey);
        //
      }

      const {success, signature} = await rnBiometrics.createSignature({
        promptMessage: 'Sign in',
        payload: userID,
      });

      if (!success) {
        throw new Error('Biometrics authentication failed!');
      }
      //
      return {msg: 'Success', result: true};
    } catch (error: any) {
      return {msg: error?.response?.data?.msg, result: false};
    }
  };

export default {
  checkBiometrics,
  generateBiometricPublicKey,
  deleteBiometricPublicKey,
  loginWithBiometrics,
};
