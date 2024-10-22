import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StockTab from './components/StockTab';
import MutualTab from './components/MutualTab';
import PayTab from './components/PayTab';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Stocks" component={StockTab} />
      <Tab.Screen name="Mutual Funds" component={MutualTab} />
      <Tab.Screen name="Pay" component={PayTab} />
    </Tab.Navigator>
  );
};

export default BottomTab;
