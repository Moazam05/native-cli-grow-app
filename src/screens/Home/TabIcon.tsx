import Mutual from '../../assets/tabicons/mutual.png';
import MutualFocused from '../../assets/tabicons/mutual_focused.png';
import Stock from '../../assets/tabicons/stock.png';
import StockFocused from '../../assets/tabicons/stock_focused.png';
import Pay from '../../assets/tabicons/pay.png';
import PayFocused from '../../assets/tabicons/pay_focused.png';
import React, {FC} from 'react';
import {Image, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

interface TabProps {
  name: 'Stock' | 'Mutual' | 'Pay';
}

interface IconProp {
  focused: boolean;
}

const icons = {
  Stock: {default: Stock, focused: StockFocused},
  Mutual: {default: Mutual, focused: MutualFocused},
  Pay: {default: Pay, focused: PayFocused},
};

const TabIcon: FC<TabProps> = ({name}) => {
  return <Image source={icons[name].default} style={styles.tabIcon} />;
};

const TabIconFocused: FC<TabProps> = ({name}) => {
  return <Image source={icons[name].focused} style={styles.tabIcon} />;
};

export const StockTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? <TabIconFocused name="Stock" /> : <TabIcon name="Stock" />;
};

export const MutualTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? <TabIconFocused name="Mutual" /> : <TabIcon name="Mutual" />;
};

export const PayTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? <TabIconFocused name="Pay" /> : <TabIcon name="Pay" />;
};

const styles = StyleSheet.create({
  tabIcon: {
    width: RFValue(18),
    height: RFValue(18),
  },
});
