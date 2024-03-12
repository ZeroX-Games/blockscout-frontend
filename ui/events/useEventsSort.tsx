import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

import type { EventsSortingValue } from 'types/api/event';
import type { EventSummary, EventSummaryResult } from 'types/api/update';

import type { ResourceError } from 'lib/api/resources';
import compareBns from 'lib/bigint/compareBns';
import * as cookies from 'lib/cookies';
import type { Option } from 'ui/shared/sort/Sort';

export const SORT_OPTIONS: Array<Option<EventsSortingValue>> = [
  { title: 'Default', id: undefined },
  { title: 'Value ascending', id: 'blockId-asc' },
  { title: 'Value descending', id: 'blockId-desc' },
];

type SortingValue = EventsSortingValue | undefined;

type HookResult = UseQueryResult<EventSummary, ResourceError<unknown>> & {
  sorting: SortingValue;
  setSortByValue: (value: SortingValue) => void;
}

const sortEvents = (sorting: SortingValue) => (event1: EventSummaryResult, event2: EventSummaryResult) => {
  switch (sorting) {
    case 'blockId-desc':
      return compareBns(event1.block_number, event2.block_number);
    case 'blockId-asc':
      return compareBns(event2.block_number, event1.block_number);
    default:
      return 0;
  }
};

export default function useEventsSort(
  queryResult: UseQueryResult<EventSummary, ResourceError<unknown>>,
): HookResult {

  const [ sorting, setSorting ] = React.useState<SortingValue>(cookies.get(cookies.NAMES.EVENTS_SORT) as SortingValue);

  const setSortByValue = React.useCallback((value: SortingValue) => {
    setSorting((prevVal: SortingValue) => {
      let newVal: SortingValue = undefined;
      if (value !== prevVal) {
        newVal = value as SortingValue;
      }
      cookies.set(cookies.NAMES.EVENTS_SORT, newVal ? newVal : '');
      return newVal;
    });
  }, []);

  return React.useMemo(() => {
    if (queryResult.isError || queryResult.isPending) {
      return { ...queryResult, setSortByValue, sorting };
    }

    return {
      ...queryResult,
      data: { ...queryResult.data, items: queryResult.data?.results.slice().sort(sortEvents(sorting)) },
      setSortByValue,
      sorting,
    };
  }, [ queryResult, setSortByValue, sorting ]);

}
