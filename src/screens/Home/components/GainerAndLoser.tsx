import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CircleTab from '../../../components/CircleTab';
import MaterialTab from '../../../components/MaterialTab';
import {mostBoughtData} from '../../../constants/staticData';
import StockCard from '../../../components/StockCard';

const GainerAndLoser = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [marketCap, setMarketCap] = useState(0);
  //   const stockData = useAppSelector(selectStocks);
  const stockData = mostBoughtData;
  const Gainers = [
    ...stockData.slice(0, 3),
    {
      name: 'Gainers',
    },
  ];
  const Losers = [
    ...stockData.slice(0, 3),
    {
      name: 'Losers',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <MaterialTab
          focused={currentTab === 0}
          onPress={() => setCurrentTab(0)}
          label="Gainers"
        />
        <MaterialTab
          focused={currentTab === 1}
          onPress={() => setCurrentTab(1)}
          label="Losers"
        />
      </View>

      <View style={styles.tabContainer}>
        <CircleTab
          focused={marketCap === 0}
          onPress={() => setMarketCap(0)}
          label="Large"
        />
        <CircleTab
          focused={marketCap === 1}
          onPress={() => setMarketCap(1)}
          label="Mid"
        />
        <CircleTab
          focused={marketCap === 2}
          onPress={() => setMarketCap(2)}
          label="Small"
        />
      </View>

      <StockCard data={currentTab === 0 ? Gainers : Losers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
});

export default GainerAndLoser;
