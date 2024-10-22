import React, {FC} from 'react';
import Explore from '../stocks/Explore';
import Holdings from '../stocks/Holdings';
import AddWatchlist from '../stocks/AddWatchlist';
import CustomTab from './CustomTab';
import WatchList from '../stocks/WatchList';
import StockHeader from '../../../components/StockHeader';

const StockTab: FC = () => {
  const MyTabs = [
    {
      name: 'Explore',
      component: <Explore />,
    },
    {
      name: 'Holdings',
      component: <Holdings />,
    },
    {
      name: "Ritik's Watchlist",
      component: <WatchList />,
    },
    {
      name: '+ Watchlist',
      component: <AddWatchlist />,
    },
  ];

  return <CustomTab tabs={MyTabs} Header={StockHeader} />;
};

export default StockTab;
