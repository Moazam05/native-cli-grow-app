import {StyleSheet, ScrollView, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import Details from './Details';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {screenHeight} from '../../utils/Scaling';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import {getSignPaisa} from '../../utils';
import StockDetailHeader from './components/StockDetailHeader';
import MediumChart from './components/MediumChart';
import TradeChart from './components/TradeChart';
import TimeFrame from './components/TimeFrame';
import DetailTab from './components/DetailTab';
import Overview from './components/Overview';
import FutureAndOption from './components/FutureAndOption';
import {ptData} from '../../constants/staticData';

interface ParamsType {
  stock?: any;
}
const tabs = ['Overview', 'F&O'];

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

const StockDetail: FC = () => {
  const route = useRoute<RouteProp<ParamListBase>>();
  // const socketService = useWS();
  const stockData = (route.params as ParamsType)?.stock || null;
  const navigation: any = useNavigation();

  const [stockSocketData, setSocketStockData] = useState<Stock | any>(null);
  // useEffect(() => {
  //   if (socketService && stockData.symbol) {
  //     socketService.emit("subscribeToStocks", stockData.symbol);

  //     socketService.on(stockData.symbol, (data) => {
  //       setSocketStockData(data);
  //     });

  //     return () => {};
  //   }
  // }, [socketService]);

  const priceChange =
    stockSocketData?.currentPrice - stockSocketData?.lastDayTradedPrice;
  const percentageChange = Math.abs(
    (priceChange / stockSocketData?.lastDayTradedPrice) * 100,
  ).toFixed(2);

  const [isVisible, setIsVisible] = useState(false);
  const [chartDataLoading, setChartDataLoading] = useState(false);

  const [currentTimeFrame, setCurrentTimeFrame] = useState('1D');
  const [currentTab, setCurrentTab] = useState(0);
  const [chartMode, setChartMode] = useState('line');

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;

    const threshold = screenHeight * 0.07;

    if (scrollPosition >= threshold && !isVisible) {
      setIsVisible(true);
    } else if (scrollPosition < threshold && isVisible) {
      setIsVisible(false);
    }
  };

  const onPressExpandHandler = () => {
    navigation.navigate('TradingView', {stock: stockData});
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <StockDetailHeader stock={stockData} isVisible={isVisible} />

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.subContainer, {paddingTop: 0}]}>
          <Details data={stockData} />
          {chartMode === 'line' ? (
            <MediumChart
              data={ptData}
              loading={chartDataLoading}
              color={getSignPaisa(priceChange).color}
              onPressExpand={onPressExpandHandler}
            />
          ) : (
            <TradeChart
              data={ptData}
              onPressExpand={onPressExpandHandler}
              loading={chartDataLoading}
              color={getSignPaisa(priceChange).color}
            />
          )}
          <TimeFrame
            chartMode={chartMode}
            currentTimeFrame={currentTimeFrame}
            onSetChartMode={async type => {
              setChartDataLoading(true);
              setTimeout(() => {
                setChartMode(type);
                setChartDataLoading(false);
              }, 500);
            }}
            onSetCurrentTimeFrame={timeframe => setCurrentTimeFrame(timeframe)}
          />
        </View>
        <ScrollView horizontal contentContainerStyle={{width: '100%'}}>
          {tabs.map((item, index) => {
            const tabWidth = (1 / tabs?.length) * 100;
            return (
              <DetailTab
                key={index}
                style={{width: `${tabWidth}%`}}
                onPress={() => setCurrentTab(index)}
                label={item}
                focused={currentTab == index}
              />
            );
          })}
        </ScrollView>

        <View style={styles.subContainer}>
          {currentTab == 0 && <Overview />}
          {currentTab == 1 && <FutureAndOption />}
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  subContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

export default StockDetail;
