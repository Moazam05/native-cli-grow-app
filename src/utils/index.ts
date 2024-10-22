export const formatNumberWithCommas = (number: number): string => {
  return `${number?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const getSignText = (number: number): string => {
  return number > 0
    ? `+${String(number?.toFixed(2))}`
    : number?.toFixed(2)?.toString();
};

export const formatPaisaWithCommas = (number: number): string => {
  return `₹${number?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};
