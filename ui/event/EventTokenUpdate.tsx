import { Hide, Show } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import type { MatrixEntry } from 'types/api/event';
import type { TokenTransfer } from 'types/api/tokenTransfer';

import { apos } from 'lib/html-entities';
import ActionBar from 'ui/shared/ActionBar';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import DataListDisplay from 'ui/shared/DataListDisplay';
import TokenUpdateFilter from 'ui/shared/TokenUpdate/TokenUpdateFilter';
import TokenUpdateList from 'ui/shared/TokenUpdate/TokenUpdateList';
import TokenUpdateTable from 'ui/shared/TokenUpdate/TokenUpdateTable';

import type { EventQuery } from './useEventQuery';

interface Props {
  eventQuery: EventQuery;
  tokenTransferFilter?: (data: TokenTransfer) => boolean;
}

const EventTokenTransfer = ({ eventQuery }: Props) => {
  const [ typeFilter, setTypeFilter ] = React.useState<string>('');
  const [ updates, setUpdates ] = React.useState<Array<MatrixEntry>>([]);
  const [ attributes, setAttributes ] = React.useState<Array<string>>([]);
  const tokenUpdates = React.useMemo(() => {
    return eventQuery.data ? eventQuery.data.matrix_entries.slice(0, 8) : [];
  }, [ eventQuery.data ]);

  useEffect(() => {
    if (tokenUpdates.length) {
      const defaultCollectionAddr = tokenUpdates[0].collectionAddr;
      const filterData = tokenUpdates.filter((entry) => entry.collectionAddr === defaultCollectionAddr);
      setUpdates(filterData);
      setTypeFilter(defaultCollectionAddr);
      setAttributes(tokenUpdates[0].attributes);
    }
  }, [ tokenUpdates ]);

  const handleFilterChange = React.useCallback((nextValue: string) => {
    const filterData = tokenUpdates.filter((entry) => entry.collectionAddr === nextValue);
    setUpdates(filterData);
    setAttributes(filterData[0].attributes);
    setTypeFilter(nextValue);
  }, [ tokenUpdates ]);

  if (eventQuery.isError) {
    setTypeFilter('');
    return <DataFetchAlert/>;
  }

  // const isActionBarHidden = !typeFilter.length && !updates.length;
  const isActionBarHidden = false;

  let items: Array<MatrixEntry> = [];

  if (tokenUpdates) {
    if (eventQuery.isPlaceholderData) {
      items = tokenUpdates;
    } else {
      // items = tokenTransferFilter ? tokenTransferQuery.data.items.filter(tokenTransferFilter) : tokenTransferQuery.data.items;
      items = tokenUpdates;
    }
  }
  const content = tokenUpdates ? (
    <>
      <Hide below="lg" ssr={ false }>
        <TokenUpdateTable data={ updates } top={ isActionBarHidden ? 0 : 80 } isLoading={ eventQuery.isPlaceholderData } attributes={ attributes }/>
      </Hide>
      <Show below="lg" ssr={ false }>
        <TokenUpdateList data={ updates } isLoading={ eventQuery.isPlaceholderData }/>
      </Show>
    </>
  ) : null;

  const actionBar = !isActionBarHidden ? (
    <ActionBar mt={ -6 }>
      <TokenUpdateFilter
        defaultFilter={ typeFilter }
        onFilterChange={ handleFilterChange }
        isLoading={ eventQuery.isPlaceholderData }
        // map and get rid of duplicates
        collections={ tokenUpdates.map((entry) => entry.collectionAddr).filter((value, index, self) => self.indexOf(value) === index) }
      />
      { /*<Pagination ml="auto" { ...tokenTransferQuery.pagination }/>*/ }
    </ActionBar>
  ) : null;

  return (
    <DataListDisplay
      isError={ eventQuery.isError || eventQuery.isError }
      items={ items }
      emptyText="There are no token transfers."
      filterProps={{
        emptyFilteredText: `Couldn${ apos }t find any token transfer that matches your query.`,
        hasActiveFilters: true,
      }}
      content={ content }
      actionBar={ actionBar }
    />
  );
};

export default EventTokenTransfer;
