import {View, StyleSheet, Platform} from 'react-native';
import React, {FC, useEffect, useState, useCallback} from 'react';
import {useTheme} from '@react-navigation/native';
import CustomText from '../../../components/CustomText';
import {FONTS} from '../../../constants/Fonts';
import {formatPaisaWithCommas, getSignPaisa} from '../../../utils';
import {normalizeWidth} from '../../../utils/Scaling';
import {holdingsData} from '../../../constants/staticData';

interface HoldingProps {
  data: Record<string, any>[];
}

const HoldingCard: FC<HoldingProps> = React.memo(({data}) => {
  const {colors} = useTheme();
  //   const socketService = useWS();

  const [summary, setSummary] = useState({
    totalInvested: 0,
    totalCurrentValue: 0,
    totalLastDayValue: 0,
    totalReturns: 0,
    oneDayReturn: 0,
    totalReturnsPercentageChange: '',
    dayReturnsPercentageChange: '',
  });

  //   useEffect(() => {
  //     if (socketService && data.length > 0) {
  //       const symbols = data.map((holding) => holding.stock.symbol);
  //       socketService.emit("subscribeToMultipleStocks", symbols as any);

  //       const handleMultipleStocksData = (stocksData: any) => {
  //         updateSummary(stocksData);
  //       };

  //       socketService.on("multipleStocksData", handleMultipleStocksData);

  //       return () => {
  //         socketService.off("multipleStocksData");
  //       };
  //     }
  //   }, [socketService, data]);

  const totalReturns = holdingsData.reduce((acc, holding) => {
    const invested = holding.invested;
    const current = holding.current;
    return acc + (current - invested);
  }, 0);

  const dayReturns = holdingsData.reduce((acc, holding) => {
    return acc + holding.dayReturn;
  }, 0);

  const totalInvested = holdingsData.reduce((acc, holding) => {
    return acc + holding.invested;
  }, 0);

  const totalCurrent = holdingsData.reduce((acc, holding) => {
    return acc + holding.current;
  }, 0);

  const totalReturnsPercentageChange = Math.abs(
    (totalReturns / totalInvested) * 100,
  ).toFixed(2);

  const dayReturnsPercentageChange = Math.abs(
    (dayReturns / totalCurrent) * 100,
  ).toFixed(2);

  return (
    <View
      style={[
        styles.holdingsContainer,
        {
          borderColor: colors.border,
        },
      ]}>
      <View style={styles.flexRowCenter}>
        <View>
          <CustomText variant="h9" fontFamily={FONTS.Regular}>
            Current Value
          </CustomText>
          <CustomText variant="h8" style={styles.currentValueText}>
            {totalCurrent ? formatPaisaWithCommas(totalCurrent) : '-'}
          </CustomText>
        </View>

        <View>
          <CustomText
            variant="h9"
            style={styles.rightAlignedText}
            fontFamily={FONTS.Regular}>
            Total Returns
          </CustomText>
          <CustomText
            variant="h8"
            style={{
              marginTop: 2,
              color: getSignPaisa(totalReturns).color,
            }}>
            {totalReturns
              ? `${
                  getSignPaisa(totalReturns).paisa
                } (${totalReturnsPercentageChange}%)`
              : '-'}
          </CustomText>
        </View>
      </View>

      <View style={styles.flexRowCenter2}>
        <View>
          <CustomText variant="h9" fontFamily={FONTS.Regular}>
            Invested Amount
          </CustomText>
          <CustomText variant="h8" style={styles.investedAmountText}>
            {totalInvested ? formatPaisaWithCommas(totalInvested) : '-'}
          </CustomText>
        </View>

        <View>
          <CustomText
            variant="h9"
            style={styles.rightAlignedText}
            fontFamily={FONTS.Regular}>
            1-Day Returns
          </CustomText>
          <CustomText
            variant="h8"
            style={{
              marginTop: 2,
              color: getSignPaisa(dayReturns).color,
            }}>
            {dayReturns
              ? `${
                  getSignPaisa(dayReturns).paisa
                } (${dayReturnsPercentageChange}%)`
              : '-'}
          </CustomText>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  holdingsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: normalizeWidth(120),
    borderWidth: Platform.OS === 'android' ? 1 : 0.5,
    marginBottom: normalizeWidth(13),
    borderRadius: 6,
  },
  flexRowCenter: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  flexRowCenter2: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  currentValueText: {
    marginTop: 2,
  },
  rightAlignedText: {
    textAlign: 'right',
  },

  investedAmountText: {
    marginTop: 2,
  },
});

export default HoldingCard;
