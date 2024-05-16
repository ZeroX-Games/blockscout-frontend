import { Show, Hide } from '@chakra-ui/react';
import React from 'react';

import type { AddressFromToFilter } from 'types/api/address';
import type { EventsSortingValue } from 'types/api/event';
import type { EventSummaryResult } from 'types/api/update';

import useIsMobile from 'lib/hooks/useIsMobile';
import AddressCsvExportLink from 'ui/address/AddressCsvExportLink';
import DataListDisplay from 'ui/shared/DataListDisplay';
import type { QueryWithPagesResultV1 } from 'ui/shared/pagination/useQueryWithPagesV1';

import EventsHeaderMobile from './EventsHeaderMobile';
import EventsList from './EventsList';
import EventsTable from './EventsTable';

// const SORT_SEQUENCE: Record<EventsSortingField, Array<EventsSortingValue | undefined>> = {
//   blockId: [ 'blockId-desc', 'blockId-asc', undefined ],
// };

type Props = {
  // eslint-disable-next-line max-len
  query: QueryWithPagesResultV1<'homepage_events_summary'>;
  showBlockInfo?: boolean;
  showSocketInfo?: boolean;
  socketInfoAlert?: string;
  currentAddress?: string;
  filter?: React.ReactNode;
  filterValue?: AddressFromToFilter;
  enableTimeIncrement?: boolean;
  top?: number;
  items?: Array<EventSummaryResult>;
  isPlaceholderData: boolean;
  isError: boolean;
  setSorting: (value: EventsSortingValue | undefined) => void;
  sort: EventsSortingValue | undefined;
}

const EventsContent = ({
  query,
  filter,
  filterValue,
  showBlockInfo = true,
  showSocketInfo = true,
  socketInfoAlert,
  currentAddress,
  enableTimeIncrement,
  top,
  items,
  isPlaceholderData,
  isError,
  setSorting,
  sort,
}: Props) => {
  const isMobile = useIsMobile();

  // const onSortToggle = React.useCallback((field: EventsSortingField) => () => {
  //   const value = getNextSortValue<EventsSortingField, EventsSortingValue>(SORT_SEQUENCE, field)(sort);
  //   setSorting(value);
  // }, [ sort, setSorting ]);

  const content = items ? (
    <>
      <Show below="lg" ssr={ false }>
        <EventsList
          showBlockInfo={ showBlockInfo }
          showSocketInfo={ showSocketInfo }
          socketInfoAlert={ socketInfoAlert }
          isLoading={ isPlaceholderData }
          enableTimeIncrement={ enableTimeIncrement }
          currentAddress={ currentAddress }
          items={ items }
        />
      </Show>
      <Hide below="lg" ssr={ false }>
        <EventsTable
          eventResults={ items }
          showSocketInfo={ showSocketInfo }
          socketInfoAlert={ socketInfoAlert }
          top={ top || query.pagination.isVisible ? 80 : 0 }
          enableTimeIncrement={ enableTimeIncrement }
          isLoading={ isPlaceholderData }
        />
      </Hide>
    </>
  ) : null;

  const actionBar = isMobile ? (
    <EventsHeaderMobile
      mt={ -6 }
      sorting={ sort }
      setSorting={ setSorting }
      paginationProps={ query.pagination }
      showPagination={ query.pagination.isVisible }
      filterComponent={ filter }
      linkSlot={ currentAddress ? (
        <AddressCsvExportLink
          address={ currentAddress }
          params={{ type: 'transactions', filterType: 'address', filterValue }}
          isLoading={ query.pagination.isLoading }
        />
      ) : null
      }
    />
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      items={ items }
      emptyText="There are no transactions."
      content={ content }
      actionBar={ actionBar }
    />
  );
};

export default EventsContent;
