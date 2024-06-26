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

    const connectedChains = (() => {
      return `98`;
    })();

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
            value={ Math.floor((Number(homeSummary.totalBlock) / 2)).toLocaleString() }
            url={ route({ pathname: '/blocks' }) }
            isLoading={ isPlaceholderData }
          />
        ) }
        { /* TODO: connect backend to get update, replace data */ }
        <StatsItem
          icon="zerox-updates"
          title="Total updates"
          value={ Number(data.total_transactions).toLocaleString() }
          url={ route({ pathname: '/txs' }) }
          isLoading={ isSummaryPlaceHolder }
        />
        <StatsItem
          icon="zerox-events"
          title="Total events"
          value={ Number(homeSummary.totalBlock).toLocaleString() }
          url={ route({ pathname: '/txs' }) }
          isLoading={ isSummaryPlaceHolder }
        />
        <StatsItem
          icon="zerox-domains"
          title="Total apps"
          value={ Number('1438').toLocaleString() }
          _last={ isOdd ? lastItemTouchStyle : undefined }
          isLoading={ isPlaceholderData }
        />
        <StatsItem
          icon="zerox-chains"
          title="Connected chains"
          value={ connectedChains }
          _last={ isOdd ? lastItemTouchStyle : undefined }
          // tooltipLabel={ gasLabel }
          isLoading={ isPlaceholderData }
        />
        <StatsItem
          icon="zerox-nodes"
          title="ZeroX nodes"
          value="3,438"
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
