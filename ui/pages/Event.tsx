import React from 'react';

import type { RoutedTab } from 'ui/shared/Tabs/types';

import { useAppContext } from 'lib/contexts/app';
import throwOnResourceLoadError from 'lib/errors/throwOnResourceLoadError';
import { publicClient } from 'lib/web3/client';
import EventDetails from 'ui/event/EventDetails';
import EventSubHeading from 'ui/event/EventSubHeading';
import useEventQuery from 'ui/event/useEventQuery';
import TextAd from 'ui/shared/ad/TextAd';
import PageTitle from 'ui/shared/Page/PageTitle';
import RoutedTabs from 'ui/shared/Tabs/RoutedTabs';
import TabsSkeleton from 'ui/shared/Tabs/TabsSkeleton';
import useTabIndexFromQuery from 'ui/shared/Tabs/useTabIndexFromQuery';

import EventTokenUpdate from '../event/EventTokenUpdate';

const EventPageContent = () => {
  const appProps = useAppContext();

  const eventQuery = useEventQuery();
  const { data, isPlaceholderData, isError, error, errorUpdateCount } = eventQuery;

  const showDegradedView = publicClient && (isError || isPlaceholderData) && errorUpdateCount > 0;

  const tabs: Array<RoutedTab> = (() => {
    // const detailsComponent = showDegradedView ?
    //   // TODO: UpdateDetailsDegraded
    //   <UpdateDetailsDegraded hash={ hash } updateQuery={ updateQuery }/> :
    //   <UpdateDetails updateQuery={ updateQuery }/>;
    const detailsComponent = <EventDetails eventQuery={ eventQuery }/>;

    return [
      {
        id: 'index',
        title: 'Details',
        component: detailsComponent,
      },
      // config.features.suave.isEnabled && data?.wrapped ?
      //   { id: 'wrapped', title: 'Regular tx details', component: <TxDetailsWrapped data={ data.wrapped }/> } :
      //   undefined,
      { id: 'token_updates', title: 'NFU updates', component: <EventTokenUpdate eventQuery={ eventQuery }/> },
      // config.features.userOps.isEnabled ?
      //   { id: 'user_ops', title: 'User operations', component: <TxUserOps txQuery={ updateQuery }/> } :
      //   undefined,
      // { id: 'internal', title: 'Internal txns', component: <TxInternals txQuery={ updateQuery }/> },
      // { id: 'logs', title: 'Logs', component: <TxLogs txQuery={ updateQuery }/> },
      // { id: 'state', title: 'State', component: <TxState txQuery={ updateQuery }/> },
      // { id: 'raw_trace', title: 'Raw trace', component: <TxRawTrace txQuery={ updateQuery }/> },
    ].filter(Boolean);
  })();

  const tabIndex = useTabIndexFromQuery(tabs);

  const backLink = React.useMemo(() => {
    const hasGoBackLink = appProps.referrer && appProps.referrer.includes('/');

    if (!hasGoBackLink) {
      return;
    }

    return {
      label: 'Back to main page',
      url: appProps.referrer,
    };
  }, [ appProps.referrer ]);

  const titleSecondRow = data ? <EventSubHeading eventDetail={ data } isLoading={ isPlaceholderData }/> : null;

  const content = (() => {
    if (isPlaceholderData && !showDegradedView) {
      return (
        <>
          <TabsSkeleton tabs={ tabs } mt={ 6 }/>
          { tabs[tabIndex]?.component }
        </>
      );
    }

    return <RoutedTabs tabs={ tabs }/>;
  })();

  if (isError && !showDegradedView) {
    if (error?.status === 422 || error?.status === 404) {
      throwOnResourceLoadError({ resource: 'event', error, isError: true });
    }
  }

  return (
    <>
      <TextAd mb={ 6 }/>
      <PageTitle
        title="Event details"
        backLink={ backLink }
        secondRow={ titleSecondRow }
      />
      { content }
    </>
  );
};

export default EventPageContent;
