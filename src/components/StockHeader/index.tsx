import {View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import TabHeader from './components/TabHeader';
import FNOIndexes from './components/FNOIndexes';

const StockHeader = () => {
  const {colors} = useTheme();

  return (
    <View style={{backgroundColor: colors.background}}>
      <TabHeader title="Stocks" />
      <FNOIndexes />
    </View>
  );
};

export default StockHeader;
