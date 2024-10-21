import React from 'react';
import CustomToastMessage from './components/CustomToastMessage';

interface ToastConfigProps {
  msg: string;
}

export const toastConfig = {
  successToast: ({props}: {props: ToastConfigProps}) => (
    <CustomToastMessage type="successToast" msg={props.msg} />
  ),

  warningToast: ({props}: {props: ToastConfigProps}) => (
    <CustomToastMessage msg={props.msg} type="warningToast" />
  ),

  normalToast: ({props}: {props: ToastConfigProps}) => (
    <CustomToastMessage msg={props.msg} type="normalToast" />
  ),
};

export default {toastConfig};
