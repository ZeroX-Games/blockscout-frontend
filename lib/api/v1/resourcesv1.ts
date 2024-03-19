import type { ChartUpdateResponse } from '../../../types/api/charts';
import type { EventDetail, EventFilters, EventsSorting } from 'types/api/event';
import type { HomeSummary } from 'types/api/HomeSummary';
import type { EventSummary } from 'types/api/update';
import type { UpdateInterpretationResponse } from 'types/api/updateInterpretation';
import type { ArrayElement } from 'types/utils';

import type { ResourcePath } from '../resources';

export interface ApiResource {
  path: ResourcePath;
  endpoint?: string;
  basePath?: string;
  pathParams?: Array<string>;
  needAuth?: boolean; // for external APIs which require authentication
}

export const RESOURCES_V1 = {
  // EVENTS
  event: {
    path: '/api/v1/block-detail/:eventId',
    pathParams: [ 'eventId' as const ],
  },
  event_interpretation: {
    path: '/api/v2/events/:hash/summary',
    pathParams: [ 'hash' as const ],
  },

  // HOMEPAGE
  homepage_summary_stat: {
    path: '/api/v1/summary',
  },
  homepage_events_summary: {
    path: '/api/v1/blocks',
    filterFields: [ ],
  },
  homepage_chart_updates: {
    path: '/api/v1/updates',
  },
};

export type ResourceNameV1 = keyof typeof RESOURCES_V1;
export const SORTING_FIELDS = [ 'sort', 'order' ];

type ResourcePathMap = {
  [K in ResourceNameV1]: typeof RESOURCES_V1[K]['path']
}
export type ResourcePathV1 = ResourcePathMap[keyof ResourcePathMap]

export type ResourceFiltersKey<R extends ResourceNameV1> = typeof RESOURCES_V1[R] extends {filterFields: Array<unknown>} ?
  ArrayElement<typeof RESOURCES_V1[R]['filterFields']> :
  never;

export const resourceKey = (x: keyof typeof RESOURCES_V1) => x;

type ResourcePathParamName<Resource extends ResourceNameV1> =
  typeof RESOURCES_V1[Resource] extends { pathParams: Array<string> } ?
    ArrayElement<typeof RESOURCES_V1[Resource]['pathParams']> :
    string;

export type ResourcePathParamsV1<Resource extends ResourceNameV1> = typeof RESOURCES_V1[Resource] extends { pathParams: Array<string> } ?
  Record<ResourcePathParamName<Resource>, string | undefined> :
  never;

export interface ResourceErrorV1<T = unknown> {
  payload?: T;
  status: Response['status'];
  statusText: Response['statusText'];
}

export type ResourceErrorAccountV1<T> = ResourceErrorV1<{ errors: T }>

export type PaginatedResourcesV1 = 'homepage_events_summary';

export type PaginatedResponse<Q extends PaginatedResourcesV1> = ResourcePayloadV1<Q>;

/* eslint-disable @typescript-eslint/indent */
export type ResourcePayloadV1<Q extends ResourceNameV1> =
Q extends 'homepage_summary_stat' ? HomeSummary :
Q extends 'homepage_events_summary' ? EventSummary :
Q extends 'event' ? EventDetail :
Q extends 'event_interpretation' ? UpdateInterpretationResponse :
Q extends 'homepage_chart_updates' ? ChartUpdateResponse :
never;
/* eslint-enable @typescript-eslint/indent */

/* eslint-disable @typescript-eslint/indent */
export type PaginationFiltersV1<Q extends PaginatedResourcesV1> =
Q extends 'homepage_events_summary' ? EventFilters :
never;
/* eslint-enable @typescript-eslint/indent */

/* eslint-disable @typescript-eslint/indent */
export type PaginationSortingV1<Q extends PaginatedResourcesV1> =
Q extends 'homepage_events_summary' ? EventsSorting :
never;
/* eslint-enable @typescript-eslint/indent */
