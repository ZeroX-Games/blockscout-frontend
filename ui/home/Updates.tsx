import { Heading } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import useHasAccount from 'lib/hooks/useHasAccount';
import LatestDeposits from 'ui/home/LatestDeposits';
import LatestUpdates from 'ui/home/LatestUpdates';
import LatestWatchlistTxs from 'ui/home/LatestWatchlistTxs';
import TabsWithScroll from 'ui/shared/Tabs/TabsWithScroll';

const UpdatesHome = () => {
  const hasAccount = useHasAccount();

  if (config.features.optimisticRollup.isEnabled || hasAccount) {
    const tabs = [
      { id: 'update', title: 'Latest updates', component: <LatestUpdates/> },
      config.features.optimisticRollup.isEnabled && { id: 'deposits', title: 'Deposits (L1→L2 txn)', component: <LatestDeposits/> },
      hasAccount && { id: 'watchlist', title: 'Watch list', component: <LatestWatchlistTxs/> },
    ].filter(Boolean);
    return (
      <>
        <Heading as="h4" size="sm" mb={ 4 }>Updates</Heading>
        <TabsWithScroll tabs={ tabs } lazyBehavior="keepMounted"/>
      </>
    );
  }

  return (
    <>
      <Heading as="h4" size="sm" mb={ 4 }>Latest updates</Heading>
      <LatestUpdates/>
    </>
  );
};

export default UpdatesHome;
