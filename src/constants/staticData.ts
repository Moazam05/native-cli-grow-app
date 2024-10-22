import React from 'react';
import FOIcon from '../assets/images/fo.svg';
import AllStocks from '../assets/images/allstocks.svg';
import IPOIcon from '../assets/images/ipo.svg';
import EventIcon from '../assets/images/events.svg';
import FOIconDark from '../assets/images/fno_dark.svg';
import AllStocksDark from '../assets/images/allstocks_dark.svg';
import IPOIconDark from '../assets/images/ipo_dark.svg';
import EventIconDark from '../assets/images/calendar_dark.svg';
import {RFValue} from 'react-native-responsive-fontsize';

export const userPic = {
  pic: 'https://i.pinimg.com/736x/98/58/74/9858745cd157f2797065e639c5b3bf23.jpg',
};
export const FnoIndexesData = [
  {
    id: 1,
    name: 'NIFTY 50',
    symbol: '^NSEI',
    icon_url:
      'https://assets-netstorage.groww.in/stock-assets/logos/GIDXNIFTY.png',
    current_price: 22123.12,
    price_change: +124.12,
    percentage_change: '0.22%',
  },
  {
    id: 2,
    name: 'BANK NIFTY',
    symbol: '^NSEBANK',
    icon_url:
      'https://assets-netstorage.groww.in/stock-assets/logos/GIDXNIFTYBANK.png',
    current_price: 48500.23,
    price_change: -140.29,
    percentage_change: '0.12%',
  },
  {
    id: 3,
    name: 'FINNIFTY',
    symbol: '^NSEFIN',
    icon_url:
      'https://assets-netstorage.groww.in/stock-assets/logos/GIDXNIFTYFIN.png',
    current_price: 40500.42,
    price_change: +224.29,
    percentage_change: '0.34%',
  },
  {
    id: 4,
    name: 'SENSEX',
    symbol: '^BSESN',
    icon_url:
      'https://assets-netstorage.groww.in/stock-assets/logos/GIDXBSESN.png',
    current_price: 75000.24,
    price_change: -124.29,
    percentage_change: '0.24%',
  },
  {
    id: 5,
    name: 'Button',
    symbol: '^NSEI',
    current_price: 22123.24,
    price_change: -124.29,
    percentage_change: '0.24%',
  },
];

export const mostBoughtData = [
  {
    id: 1,
    name: 'Vodafone Idea',
    icon_url: 'https://logo.clearbit.com/vodafoneidea.com',
    current_price: 14.12,
    price_change: +1.23,
    percentage_change: '0.22%',
  },
  {
    id: 2,
    name: 'Tata Steel',
    icon_url: 'https://logo.clearbit.com/tata.com',
    current_price: 165.8,
    price_change: -12.4,
    percentage_change: '0.22%',
  },
  {
    id: 3,
    icon_url: 'https://logo.clearbit.com/irctc.com',
    name: 'Indian Railway Catering & Tourism Corporation',
    current_price: 1044.12,
    price_change: +14.2,
    percentage_change: '23.21%',
  },
  {
    id: 4,
    name: 'Zomato',
    icon_url: 'https://logo.clearbit.com/zomato.com',
    current_price: 189.12,
    price_change: +14.2,
    percentage_change: '23.21%',
  },
];

export const Gainers = [
  ...mostBoughtData.slice(0, 3),
  {
    id: 4,
    name: 'Gainers',
    icon_url: 'https://logo.clearbit.com/zomato.com',
    current_price: 189.12,
    price_change: +14.2,
    percentage_change: '23.21%',
  },
];

export const Losers = [
  ...mostBoughtData.slice(0, 3),
  {
    id: 4,
    name: 'Losers',
    icon_url: 'https://logo.clearbit.com/zomato.com',
    current_price: 189.12,
    price_change: +14.2,
    percentage_change: '23.21%',
  },
];

export const ProductAndToolsData = [
  {
    id: 1,
    name: 'F&O',
    light_icon: React.createElement(FOIcon, {
      width: RFValue(30),
      height: RFValue(30),
    }),
    dark_icon: React.createElement(FOIconDark, {
      width: RFValue(30),
      height: RFValue(30),
    }),
  },
  {
    id: 2,
    name: 'Events',
    light_icon: React.createElement(EventIcon, {
      width: RFValue(30),
      height: RFValue(30),
    }),
    dark_icon: React.createElement(EventIconDark, {
      width: RFValue(30),
      height: RFValue(30),
    }),
  },
  {
    id: 3,
    name: 'IPO',
    light_icon: React.createElement(IPOIcon, {
      width: RFValue(30),
      height: RFValue(30),
    }),
    dark_icon: React.createElement(IPOIconDark, {
      width: RFValue(30),
      height: RFValue(30),
    }),
  },
  {
    id: 4,
    name: 'All Stocks',
    light_icon: React.createElement(AllStocks, {
      width: RFValue(30),
      height: RFValue(30),
    }),
    dark_icon: React.createElement(AllStocksDark, {
      width: RFValue(30),
      height: RFValue(30),
    }),
  },
];

export const holdingsData = [
  {
    id: 1,
    stock_name: 'IRFC',
    invested: 24000.42,
    current: 35000.12,
    noOfShares: 100,
    dayReturn: 400.23,
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 2,
    stock_name: 'Tata Steel',
    invested: 35000.42,
    current: 33000.12,
    noOfShares: 300,
    dayReturn: -600.43,
    stockData: [11, 10.2, 11, 10, 10, 10.3, 9.3, 9.4, 9.5, 9.4, 9, 9, 9, 9],
  },
];

export const watchlistData = [
  {
    id: 1,
    stock_name: 'Vodafone Idea',
    current_price: 14.12,
    price_change: +21.23,
    percentage_change: '0.22%',
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 2,
    stock_name: 'IRFC',
    current_price: 180.12,
    price_change: +54.23,
    percentage_change: '0.23%',
    stockData: [11, 12, 11, 11, 11.2, 11.3, 12, 11, 11, 13, 11, 10, 10, 12],
  },
  {
    id: 3,
    stock_name: 'Tata Steel',
    current_price: 140.12,
    price_change: -11.23,
    percentage_change: '0.23%',
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 4,
    stock_name: 'IREDA',
    current_price: 120.12,
    price_change: +12.23,
    percentage_change: '0.23%',
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 5,
    stock_name: 'NTPC',
    current_price: 14.12,
    price_change: +21.23,
    percentage_change: '0.22%',
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 6,
    stock_name: 'Rail Vikas Nigam',
    current_price: 180.12,
    price_change: +54.23,
    percentage_change: '0.23%',
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 7,
    stock_name: 'PNB',
    current_price: 140.12,
    price_change: -11.23,
    percentage_change: '0.23%',
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 8,
    stock_name: 'ITC',
    current_price: 120.12,
    price_change: +12.23,
    percentage_change: '0.23%',
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
  {
    id: 9,
    stock_name: 'Adani Green Energy',
    current_price: 1220.12,
    price_change: +132.23,
    percentage_change: '0.23%',
    stockData: [11, 10.2, 11, 11, 11.2, 11.3, 12, 11, 11, 12, 12, 12, 10, 12],
  },
];

export const ptData = [
  {value: 160, date: '1 Apr 2025'},
  {value: 180, date: '2 Apr 2025'},
  {value: 190, date: '3 Apr 2025'},
  {value: 180, date: '4 Apr 2025'},
  {value: 140, date: '5 Apr 2025'},
  {value: 145, date: '6 Apr 2025'},
  {value: 160, date: '7 Apr 2025'},
  {value: 200, date: '8 Apr 2025'},

  {value: 220, date: '9 Apr 2025'},
  {
    value: 240,
    date: '10 Apr 2025',
    label: '10 Apr',
    labelTextStyle: {color: 'lightgray', width: 60},
  },
  {value: 280, date: '11 Apr 2025'},
  {value: 260, date: '12 Apr 2025'},
  {value: 340, date: '13 Apr 2025'},
  {value: 385, date: '14 Apr 2025'},
  {value: 280, date: '15 Apr 2025'},
  {value: 390, date: '16 Apr 2025'},

  {value: 370, date: '17 Apr 2025'},
  {value: 285, date: '18 Apr 2025'},
  {value: 295, date: '19 Apr 2025'},
  {
    value: 300,
    date: '20 Apr 2025',
    label: '20 Apr',
    labelTextStyle: {color: 'lightgray', width: 60},
  },
  {value: 280, date: '21 Apr 2025'},
  {value: 295, date: '22 Apr 2025'},
  {value: 260, date: '23 Apr 2025'},
  {value: 255, date: '24 Apr 2025'},

  {value: 190, date: '25 Apr 2025'},
  {value: 220, date: '26 Apr 2025'},
  {value: 205, date: '27 Apr 2025'},
  {value: 230, date: '28 Apr 2025'},
  {value: 210, date: '29 Apr 2025'},
  {
    value: 200,
    date: '30 Apr 2025',
    label: '30 Apr',
    labelTextStyle: {color: 'lightgray', width: 60},
  },
  {value: 240, date: '1 May 2025'},
  {value: 250, date: '2 May 2025'},
  {value: 280, date: '3 May 2025'},
  {value: 250, date: '4 May 2025'},
  {value: 210, date: '5 May 2025'},
];

export const ptData2 = [
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
  {value: 10},
];

export const candleChartData = [
  {
    timestamp: '2024-04-01T00:00:00Z',
    open: 1782,
    high: 1764,
    low: 1701,
    close: 1748,
  },
  {
    timestamp: '2024-04-02T00:00:00Z',
    open: 1755,
    high: 1790,
    low: 1742,
    close: 1785,
  },
  {
    timestamp: '2024-04-03T00:00:00Z',
    open: 1780,
    high: 1812,
    low: 1775,
    close: 1805,
  },
  {
    timestamp: '2024-04-04T00:00:00Z',
    open: 1822,
    high: 1825,
    low: 1738,
    close: 1830,
  },
  {
    timestamp: '2024-04-05T00:00:00Z',
    open: 1829,
    high: 1835,
    low: 1801,
    close: 1993,
  },
  {
    timestamp: '2024-04-06T00:00:00Z',
    open: 1993,
    high: 1980,
    low: 1900,
    close: 1955,
  },
  {
    timestamp: '2024-04-07T00:00:00Z',
    open: 1955,
    high: 1940,
    low: 1940,
    close: 1999,
  },
  {
    timestamp: '2024-04-08T00:00:00Z',
    open: 1999,
    high: 1999,
    low: 1923,
    close: 2020,
  },
  {
    timestamp: '2024-04-09T00:00:00Z',
    open: 2020,
    high: 2040,
    low: 1855,
    close: 1885,
  },
  {
    timestamp: '2024-04-10T00:00:00Z',
    open: 1885,
    high: 1910,
    low: 1875,
    close: 1922,
  },
  {
    timestamp: '2024-04-11T00:00:00Z',
    open: 1922,
    high: 1945,
    low: 1815,
    close: 1924,
  },
  {
    timestamp: '2024-04-12T00:00:00Z',
    open: 1924,
    high: 1950,
    low: 1902,
    close: 1945,
  },
  {
    timestamp: '2024-04-13T00:00:00Z',
    open: 1945,
    high: 1970,
    low: 1928,
    close: 1962,
  },
  {
    timestamp: '2024-04-14T00:00:00Z',
    open: 1962,
    high: 1985,
    low: 1920,
    close: 1958,
  },
  {
    timestamp: '2024-04-15T00:00:00Z',
    open: 1958,
    high: 1982,
    low: 1959,
    close: 1975,
  },
  {
    timestamp: '2024-04-16T00:00:00Z',
    open: 1975,
    high: 2039,
    low: 1928,
    close: 2007,
  },
  {
    timestamp: '2024-04-17T00:00:00Z',
    open: 2007,
    high: 2010,
    low: 1978,
    close: 1999,
  },
  {
    timestamp: '2024-04-18T00:00:00Z',
    open: 1999,
    high: 2015,
    low: 1998,
    close: 1948,
  },
  {
    timestamp: '2024-04-19T00:00:00Z',
    open: 1948,
    high: 1942,
    low: 1998,
    close: 1933,
  },
  {
    timestamp: '2024-04-19T00:00:00Z',
    open: 1933,
    high: 1942,
    low: 1928,
    close: 1913,
  },
  {
    timestamp: '2024-04-19T00:00:00Z',
    open: 1913,
    high: 1942,
    low: 1948,
    close: 1943,
  },
  {
    timestamp: '2024-04-19T00:00:00Z',
    open: 1943,
    high: 1900,
    low: 1922,
    close: 1913,
  },
  {
    timestamp: '2024-04-19T00:00:00Z',
    open: 1913,
    high: 1900,
    low: 1922,
    close: 1809,
  },
  {
    timestamp: '2024-04-19T00:00:00Z',
    open: 1809,
    high: 1859,
    low: 1739,
    close: 1797,
  },
  {
    timestamp: '2024-04-19T00:00:00Z',
    open: 1747,
    high: 1859,
    low: 1739,
    close: 1797,
  },
  {
    timestamp: '2024-04-19T00:00:00Z',
    open: 1797,
    high: 1859,
    low: 1739,
    close: 1897,
  },
  {
    timestamp: '2024-04-19T00:00:00Z',
    open: 1897,
    high: 1829,
    low: 1809,
    close: 1817,
  },
  {
    timestamp: '2024-04-19T00:00:00Z',
    open: 1817,
    high: 1859,
    low: 1739,
    close: 1787,
  },
];

export default {
  userPic,
  FnoIndexesData,
  holdingsData,
  mostBoughtData,
  watchlistData,
  ptData,
  ptData2,
  candleChartData,
};
