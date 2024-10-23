import {Colors} from '../constants/Colors';

export const formatNumberWithCommas = (number: number): string => {
  return `${number?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const getSignText = (number: number): string => {
  return number > 0
    ? `+${String(number?.toFixed(2))}`
    : number?.toFixed(2)?.toString();
};

export const formatPaisaWithCommas = (number: number): string => {
  return `PKR ${number?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

interface signPaisaProps {
  paisa: string;
  color: string;
}
export const getSignPaisa = (number: number): signPaisaProps => {
  let paisa: any = Math.abs(number);
  paisa = paisa
    ?.toFixed(2)
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    ?.toString();

  return {
    paisa: number > 0 ? `+ PKR ${paisa}` : `- PKR ${paisa}`,
    color: number > 0 ? Colors.profit : Colors.loss,
  };
};

export const hexToRGBA = (hex: string, opacity: number) => {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const convertUnixTimestamp = (timestamp: number) => {
  const dateObj = new Date(timestamp * 1000);

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  let period = 'AM';
  if (hours >= 12) {
    period = 'PM';
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

  return formattedTime;
};

export const convertUnixTimeWorklet = (timestamp: number) => {
  'worklet';
  const dateObj = new Date(timestamp * 1000);

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  let period = 'AM';
  if (hours >= 12) {
    period = 'PM';
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

  return formattedTime;
};

export const formatPaisaWorklet = (number: number): string => {
  'worklet';
  return !number
    ? `---`
    : `${number?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const formatDate = (timestamp: any) => {
  'worklet';
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export function formatToISO(dateStr: any) {
  // Split the input date string "DD-MM-YYYY" into parts
  const [day, month, year] = dateStr.split('-');

  // Create a new Date object (Note: months are 0-indexed, so subtract 1 from month)
  const date = new Date(year, month - 1, day);

  // Get the current time to append to the date
  const now = new Date();

  // Set hours, minutes, seconds, and milliseconds from the current time
  date.setHours(
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds(),
  );

  // Convert the date to ISO format (with timezone)
  const isoString = date.toISOString();

  // Format it in the desired way (YYYY-MM-DDTHH:mm:ss.sss+00:00)
  return isoString.replace('Z', '+00:00');
}
