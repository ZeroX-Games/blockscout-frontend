import { Grid } from '@chakra-ui/react';
// import BigNumber from 'bignumber.js';
import React from 'react';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import useApiQueryV1 from 'lib/api/v1/useApiQueryV1';
// import { WEI } from 'lib/consts';
// import { currencyUnits } from 'lib/units';
import { HOME_SUMMARY, HOMEPAGE_STATS } from 'stubs/stats';
// import GasInfoTooltipContent from 'ui/shared/GasInfoTooltipContent/GasInfoTooltipContent';

import useNewHomePageSummarySocket from '../../lib/hooks/useNewHomePageSummarySocket';
import StatsItem from './StatsItem';

// const hasGasTracker = config.UI.homepage.showGasTracker;
// const hasAvgBlockTime = config.UI.homepage.showAvgBlockTime;

const Stats = () => {
  const { data, isPlaceholderData, isError } = useApiQuery('homepage_stats', {
    fetchParams: {
      headers: {
        'updated-gas-oracle': 'true',
      },
    },
    queryOptions: {
      refetchOnMount: false,
      placeholderData: HOMEPAGE_STATS,
    },
  });

  const { data: homeSummary, isPlaceholderData: isSummaryPlaceHolder, isError: isSummaryError } = useApiQueryV1('homepage_summary_stat', {
    queryOptions: {
      placeholderData: HOME_SUMMARY,
    },
  });
  useNewHomePageSummarySocket();
  const zkEvmLatestBatchQuery = useApiQuery('homepage_zkevm_latest_batch', {
    queryOptions: {
      placeholderData: 12345,
      enabled: config.features.zkEvmRollup.isEnabled,
    },
  });

  if (isError || zkEvmLatestBatchQuery.isError || isSummaryError) {
    return null;
  }

  let content;

  const lastItemTouchStyle = { gridColumn: { base: 'span 2', lg: 'unset' } };

  let itemsCount = 6;
  // !hasGasTracker && itemsCount--;
  // !hasAvgBlockTime && itemsCount--;

  if (data && homeSummary) {
    !data.gas_prices && itemsCount--;
    data.rootstock_locked_btc && itemsCount++;
    const isOdd = Boolean(itemsCount % 2);
    // const gasLabel = hasGasTracker && data.gas_prices ? <GasInfoTooltipContent data={ data } dataUpdatedAt={ dataUpdatedAt }/> : null;

    // const gasPriceText = (() => {
    //   if (data.gas_prices?.average?.fiat_price) {
    //     return `$${ data.gas_prices.average.fiat_price }`;
    //   }
    //
    //   if (data.gas_prices?.average?.price) {
    //     return `${ data.gas_prices.average.price.toLocaleString() } ${ currencyUnits.gwei }`;
    //   }
    //
    //   return 'N/A';
    // })();

    content = (
      <>
        { config.features.zkEvmRollup.isEnabled ? (
          <StatsItem
            icon="txn_batches"
            title="Latest batch"
            value={ (zkEvmLatestBatchQuery.data || 0).toLocaleString() }
            url={ route({ pathname: '/batches' }) }
            isLoading={ zkEvmLatestBatchQuery.isPlaceholderData }
          />
        ) : (
          <StatsItem
            icon="zerox-blocks"
            title="Total blocks"
            value="572,457,248"
            // value={ Number(homeSummary.totalBlock).toLocaleString() }
            url={ route({ pathname: '/events' }) }
            isLoading={ isPlaceholderData }
          />
        ) }
        { /* TODO: connect backend to get update, replace data */ }
        <StatsItem
          icon="zerox-updates"
          title="Total updates"
          value={ Number(homeSummary.totalUpdates).toLocaleString() }
          url={ route({ pathname: '/events' }) }
          isLoading={ isSummaryPlaceHolder }
        />
        <StatsItem
          icon="zerox-events"
          title="Total events"
          value="853,236,853"
          // value={ Number(homeSummary.totalBlock).toLocaleString() }
          url={ route({ pathname: '/events' }) }
          isLoading={ isSummaryPlaceHolder }
        />
        <StatsItem
          icon="zerox-domains"
          title="Total Applications"
          value="15,561"
          // value={ Number(homeSummary.totalApplications).toLocaleString() }
          _last={ isOdd ? lastItemTouchStyle : undefined }
          isLoading={ isPlaceholderData }
        />
        <StatsItem
          icon="zerox-chains"
          title="Connected chains"
          value="16"
          // value={ Number(homeSummary.totalChains).toLocaleString() }
          _last={ isOdd ? lastItemTouchStyle : undefined }
          // tooltipLabel={ gasLabel }
          isLoading={ isPlaceholderData }
        />
        <StatsItem
          icon="zerox-nodes"
          title="ZeroX nodes"
          value="267"
          _last={ isOdd ? lastItemTouchStyle : undefined }
          isLoading={ isPlaceholderData }
        />
      </>
    );
  }

  return (
    <Grid
      gridTemplateColumns={{ lg: `repeat(${ itemsCount }, 1fr)`, base: '1fr 1fr' }}
      gridTemplateRows={{ lg: 'none', base: undefined }}
      gridGap="10px"
      marginTop="24px"
    >
      { content }
    </Grid>

  );
};

export default Stats;
