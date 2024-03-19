import type { HomeSummary } from 'types/api/HomeSummary';
import type { ChainIndicatorId } from 'types/homepage';
import type { TimeChartData } from 'ui/shared/chart/types';

import type { ResourcePayloadV1 } from 'lib/api/v1/resourcesv1';

export type ChartsResources = 'homepage_chart_updates';

export interface TChainIndicatorV1<R extends ChartsResources> {
  id: ChainIndicatorId;
  title: string;
  value: (stats: HomeSummary) => string;
  icon: React.ReactNode;
  hint?: string;
  api: {
    resourceName: R;
    dataFn: (response: ResourcePayloadV1<R>) => TimeChartData;
  };
}
