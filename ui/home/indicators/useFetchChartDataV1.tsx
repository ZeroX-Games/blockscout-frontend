import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

import type { TChainIndicatorV1, ChartsResources } from './typesV1';
import type { TimeChartData } from 'ui/shared/chart/types';

import type { ResourcePayloadV1 } from 'lib/api/v1/resourcesv1';
import useApiQueryV1 from 'lib/api/v1/useApiQueryV1';

export default function useFetchChartDataV1<R extends ChartsResources>(indicator: TChainIndicatorV1<R> | undefined): UseQueryResult<TimeChartData> {
  const queryResult = useApiQueryV1(indicator?.api.resourceName || 'homepage_chart_updates', {
    queryOptions: { enabled: Boolean(indicator) },
  });

  return React.useMemo(() => {
    return {
      ...queryResult,
      data: queryResult.data && indicator ? indicator.api.dataFn(queryResult.data as ResourcePayloadV1<R>) : queryResult.data,
    } as UseQueryResult<TimeChartData>;
  }, [ indicator, queryResult ]);
}
