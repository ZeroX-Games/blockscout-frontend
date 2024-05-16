import { useRouter } from 'next/router';
import React from 'react';

import type { RoutedTab } from 'ui/shared/Tabs/types';

import config from 'configs/app';
import useIsMobile from 'lib/hooks/useIsMobile';
import useNewEventsSocket from 'lib/hooks/useNewEventsSocket';
import { EVENT_SUMMARY } from 'stubs/update';
import EventsWithFrontendSorting from 'ui/events/EventsWithFrontendSorting';
import PageTitle from 'ui/shared/Page/PageTitle';
import Pagination from 'ui/shared/pagination/Pagination';
import useQueryWithPagesV1 from 'ui/shared/pagination/useQueryWithPagesV1';
import RoutedTabs from 'ui/shared/Tabs/RoutedTabs';

const TAB_LIST_PROPS = {
  marginBottom: 0,
  py: 5,
  marginTop: -5,
};

const Events = () => {
  const verifiedTitle = config.chain.verificationType === 'validation' ? 'Validated' : 'Mined';
  const router = useRouter();
  const isMobile = useIsMobile();
  const eventsQuery = useQueryWithPagesV1({
    resourceName: 'homepage_events_summary',
    options: {
      enabled: !router.query.tab || router.query.tab === 'validated' || router.query.tab === 'pending',
      placeholderData: EVENT_SUMMARY,
    },
  });

  // TODO: Disable account feature for now
  // const txsWatchlistQuery = useQueryWithPages({
  //   resourceName: 'txs_watchlist',
  //   options: {
  //     enabled: router.query.tab === 'watchlist',
  //     placeholderData: generateListStub<'txs_watchlist'>(TX, 50, { next_page_params: {
  //       block_number: 9005713,
  //       index: 5,
  //       items_count: 50,
  //     } }),
  //   },
  // });

  const { socketAlert } = useNewEventsSocket();

  // const hasAccount = useHasAccount();

  const tabs: Array<RoutedTab> = [
    {
      id: 'validated',
      title: verifiedTitle,
      component:
        <EventsWithFrontendSorting
          query={ eventsQuery }
          showSocketInfo={ eventsQuery.pagination.page === 1 }
          socketInfoAlert={ socketAlert }
          enableTimeIncrement={ true }
        /> },
    {
      id: 'pending',
      title: 'Pending',
      component: (
        <EventsWithFrontendSorting
          query={ eventsQuery }
          showBlockInfo={ false }
          showSocketInfo={ eventsQuery.pagination.page === 1 }
          socketInfoAlert={ socketAlert }
          enableTimeIncrement={ true }
        />
      ),
    },
    // hasAccount ? {
    //   id: 'watchlist',
    //   title: 'Watch list',
    //   component: <TxsWatchlist query={ txsWatchlistQuery }/>,
    // } : undefined,
  ].filter(Boolean);

  // const pagination = router.query.tab === 'watchlist' ? txsWatchlistQuery.pagination : txsQuery.pagination;
  const pagination = eventsQuery.pagination;
  return (
    <>
      <PageTitle title="Events" withTextAd/>
      <RoutedTabs
        tabs={ tabs }
        tabListProps={ isMobile ? undefined : TAB_LIST_PROPS }
        rightSlot={ (
          pagination.isVisible && !isMobile ? <Pagination my={ 1 } { ...pagination }/> : null
        ) }
        stickyEnabled={ !isMobile }
      />
    </>
  );
};

export default Events;
