import React, {FC, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {FONTS} from '../../constants/Fonts';
import {useTheme} from '@react-navigation/native';
import CustomText from '../CustomText';
import {formatPaisaWithCommas, getSignPaisa} from '../../utils';
import MiniChart from '../MiniChart';

interface HoldingListItemProps {
  item: Record<string, any>;
}

type Stock = {
  __v: number;
  _id: string;
  companyName: string;
  currentPrice: number;
  iconUrl: string;
  lastDayTradedPrice: number;
  symbol: string;
  dayTimeSeries: Array<TimeSeries>;
  tenMinTimeSeries: Array<TimeSeries>;
};

type TimeSeries = {
  _internal_originalTime: number;
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
  timestamp: string;
};

const HoldingListItem: FC<HoldingListItemProps> = ({item}) => {
  const {colors} = useTheme();
  const [stockSocketData, setStockSocketData] = useState<Stock | null>(null);
  //   const socketService = useWS();

  const invested = useMemo(
    () => item.buyPrice * item.quantity,
    [item.buyPrice, item.quantity],
  );
  const currentStockPrice = 100 ?? item.stock.currentPrice;
  const currentValue = useMemo(
    () => currentStockPrice * item.quantity,
    [currentStockPrice, item.quantity],
  );
  const isProfit = useMemo(
    () => currentValue - invested,
    [currentValue, invested],
  );

  const scalingFactor = 0.2;

  //   useEffect(() => {
  //     if (socketService) {
  //       socketService.emit('subscribeToStocks', item.stock.symbol);

  //       socketService.on(item.stock.symbol, (data: Stock) => {
  //         setStockSocketData(data);
  //       });

  //       return () => {
  //         socketService.off(item.stock.symbol);
  //       };
  //     }
  //   }, [item.stock.symbol, socketService]);

  const scaledCloseValues =
    stockSocketData?.dayTimeSeries
      ?.slice(-14)
      ?.map(item => Number((item.close * scalingFactor).toFixed(2)))
      ?.filter(
        (_, index, array) => index % Math.floor(array.length / 14) === 0,
      ) || [];

  return (
    <View style={[styles.container, {borderColor: colors.border}]}>
      <View style={{width: '40%'}}>
        <CustomText variant="h8" fontFamily={FONTS.Medium}>
          {item?.stock_name}
        </CustomText>
        <CustomText
          style={{opacity: 0.7, marginVertical: 5}}
          variant="h9"
          fontFamily={FONTS.Medium}>
          {item?.noOfShares} shares
        </CustomText>
      </View>

      <MiniChart
        stockData={item.stockData}
        color={getSignPaisa(item.current - item.invested).color}
      />

      <View style={{alignItems: 'flex-end'}}>
        <CustomText
          variant="h8"
          fontFamily={FONTS.Medium}
          style={{color: getSignPaisa(item.current - item.invested).color}}>
          {getSignPaisa(item.current - item.invested).paisa.slice(0, 1) +
            getSignPaisa(item.current).paisa.slice(1)}
        </CustomText>

        <CustomText
          style={{opacity: 0.7, marginVertical: 5}}
          variant="h9"
          fontFamily={FONTS.Medium}>
          ({formatPaisaWithCommas(item.invested)})
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: Platform.OS === 'android' ? 1 : 0.5,
  },
});

export default HoldingListItem;
