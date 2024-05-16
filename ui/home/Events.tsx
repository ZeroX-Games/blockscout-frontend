import { Heading } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import useHasAccount from 'lib/hooks/useHasAccount';
import LatestDeposits from 'ui/home/LatestDeposits';
import LatestEvents from 'ui/home/LatestEvents';
import LatestWatchlistTxs from 'ui/home/LatestWatchlistTxs';
import TabsWithScroll from 'ui/shared/Tabs/TabsWithScroll';

const EventsHome = () => {
  const hasAccount = useHasAccount();

  if (config.features.optimisticRollup.isEnabled || hasAccount) {
    const tabs = [
      { id: 'event', title: 'Latest events', component: <LatestEvents/> },
      config.features.optimisticRollup.isEnabled && { id: 'deposits', title: 'Deposits (L1→L2 txn)', component: <LatestDeposits/> },
      hasAccount && { id: 'watchlist', title: 'Watch list', component: <LatestWatchlistTxs/> },
    ].filter(Boolean);
    return (
      <>
        <Heading as="h4" size="sm" mb={ 4 }>Events</Heading>
        <TabsWithScroll tabs={ tabs } lazyBehavior="keepMounted"/>
      </>
    );
  }

  return (
    <>
      <Heading as="h4" size="sm" mb={ 4 }>Latest events</Heading>
      <LatestEvents/>
    </>
  );
};

export default EventsHome;
