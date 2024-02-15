import { useRouter } from 'next/router';
import React from 'react';

import type { RoutedTab } from 'ui/shared/Tabs/types';

import config from 'configs/app';
import { useAppContext } from 'lib/contexts/app';
import throwOnResourceLoadError from 'lib/errors/throwOnResourceLoadError';
import getQueryParamString from 'lib/router/getQueryParamString';
import { publicClient } from 'lib/web3/client';
import TextAd from 'ui/shared/ad/TextAd';
import EntityTags from 'ui/shared/EntityTags';
import PageTitle from 'ui/shared/Page/PageTitle';
import RoutedTabs from 'ui/shared/Tabs/RoutedTabs';
import TabsSkeleton from 'ui/shared/Tabs/TabsSkeleton';
import useTabIndexFromQuery from 'ui/shared/Tabs/useTabIndexFromQuery';
import UpdateDetailsDegraded from 'ui/update/UpdateDetailsDegraded';
// import TxDetailsWrapped from 'ui/tx/TxDetailsWrapped';
// import TxInternals from 'ui/tx/TxInternals';
// import TxLogs from 'ui/tx/TxLogs';
// import TxRawTrace from 'ui/tx/TxRawTrace';
// import TxState from 'ui/tx/TxState';
import UpdateSubHeading from 'ui/update/UpdateSubHeading';
// import TxTokenTransfer from 'ui/tx/TxTokenTransfer';
// import TxUserOps from 'ui/tx/TxUserOps';
import useUpdateQuery from 'ui/update/useUpdateQuery';

import UpdateDetails from '../update/UpdateDetails';

const UpdatePageContent = () => {
  const router = useRouter();
  const appProps = useAppContext();

  const hash = getQueryParamString(router.query.hash);
  const updateQuery = useUpdateQuery();
  const { data, isPlaceholderData, isError, error, errorUpdateCount } = updateQuery;

  const showDegradedView = publicClient && (isError || isPlaceholderData) && errorUpdateCount > 0;

  const tabs: Array<RoutedTab> = (() => {
    const detailsComponent = showDegradedView ?
      // TODO: UpdateDetailsDegraded
      <UpdateDetailsDegraded hash={ hash } updateQuery={ updateQuery }/> :
      <UpdateDetails updateQuery={ updateQuery }/>;

    return [
      {
        id: 'index',
        title: config.features.suave.isEnabled && data?.wrapped ? 'Confidential compute tx details' : 'Details',
        component: detailsComponent,
      },
      // config.features.suave.isEnabled && data?.wrapped ?
      //   { id: 'wrapped', title: 'Regular tx details', component: <TxDetailsWrapped data={ data.wrapped }/> } :
      //   undefined,
      // { id: 'token_transfers', title: 'Token transfers', component: <TxTokenTransfer txQuery={ updateQuery }/> },
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

  const tags = (
    <EntityTags
      isLoading={ isPlaceholderData }
      tagsBefore={ [ data?.tx_tag ? { label: data.tx_tag, display_name: data.tx_tag } : undefined ] }
    />
  );

  const backLink = React.useMemo(() => {
    const hasGoBackLink = appProps.referrer && appProps.referrer.includes('/txs');

    if (!hasGoBackLink) {
      return;
    }

    return {
      label: 'Back to transactions list',
      url: appProps.referrer,
    };
  }, [ appProps.referrer ]);

  const titleSecondRow = <UpdateSubHeading hash={ hash } hasTag={ Boolean(data?.tx_tag) }/>;

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
      throwOnResourceLoadError({ resource: 'tx', error, isError: true });
    }
  }

  return (
    <>
      <TextAd mb={ 6 }/>
      <PageTitle
        title="Update details"
        backLink={ backLink }
        contentAfter={ tags }
        secondRow={ titleSecondRow }
      />
      { content }
    </>
  );
};

export default UpdatePageContent;
