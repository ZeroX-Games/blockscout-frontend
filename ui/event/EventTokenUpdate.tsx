import { Hide, Show } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import type { MatrixEntry } from 'types/api/event';
import type { TokenTransfer } from 'types/api/tokenTransfer';

import { apos } from 'lib/html-entities';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import DataListDisplay from 'ui/shared/DataListDisplay';
import TokenUpdateList from 'ui/shared/TokenUpdate/TokenUpdateList';
import TokenUpdateTable from 'ui/shared/TokenUpdate/TokenUpdateTable';

import TokenUpdateActionBar from '../shared/TokenUpdate/TokenUpdateActionBar';
import TokenUpdateFilterGroup from '../shared/TokenUpdate/TokenUpdateFilterGroup';
import type { EventQuery } from './useEventQuery';

interface Props {
  eventQuery: EventQuery;
  tokenTransferFilter?: (data: TokenTransfer) => boolean;
}

export type Filter = {
  collectionAddr: string;
  attributes: Array<string>;
}

const EventTokenTransfer = ({ eventQuery }: Props) => {
  const tokenUpdates = React.useMemo(() => {
    return eventQuery.data ? eventQuery.data.matrix_entries.slice(0, 8) : [];
  }, [ eventQuery.data ]);

  const initFilterObj = React.useMemo(() => ({
    collectionAddr: tokenUpdates[0].collectionAddr,
    attributes: [],
  }), [ tokenUpdates ]);
  const [ typeFilter, setTypeFilter ] = React.useState<Filter>(initFilterObj);
  const [ updates, setUpdates ] = React.useState<Array<MatrixEntry>>([]);
  const [ attributes, setAttributes ] = React.useState<Array<string>>([]);

  useEffect(() => {
    if (tokenUpdates.length) {
      const defaultCollectionAddr = tokenUpdates[0].collectionAddr;
      const filterData = tokenUpdates.filter((entry) => entry.collectionAddr === defaultCollectionAddr);
      setUpdates(filterData);
      setTypeFilter(initFilterObj);
      setAttributes(tokenUpdates[0].attributes);
    }
  }, [ initFilterObj, tokenUpdates ]);

  const handleFilterChange = React.useCallback((nextValue: Filter) => {
    const filterCollectionData = tokenUpdates.filter((entry) => entry.collectionAddr === nextValue.collectionAddr);
    if (nextValue.attributes.length) {
      const attributes = filterCollectionData[0].attributes;
      const selectedAttributesIdx = attributes.map((attribute) => {
        return nextValue.attributes.includes(attribute);
      });
      const filterData = filterCollectionData.map((entry) => {
        return {
          ...entry,
          attributes: entry.attributes.filter((_, idx) => {
            return selectedAttributesIdx[idx];
          }),
          updates: entry.updates.map((update) => {
            return {
              ...update,
              delta: update.delta.filter((_, idx) => {
                return selectedAttributesIdx[idx];
              }),
            };
          }),
        };
      });
      setUpdates(filterData);
      setAttributes(nextValue.attributes);
    } else {
      setUpdates(filterCollectionData);
      setAttributes(filterCollectionData[0].attributes);
    }
    setTypeFilter(nextValue);
  }, [ tokenUpdates ]);

  if (eventQuery.isError) {
    setTypeFilter(initFilterObj);
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
        <TokenUpdateTable data={ updates } isLoading={ eventQuery.isPlaceholderData } attributes={ attributes }/>
      </Hide>
      <Show below="lg" ssr={ false }>
        <TokenUpdateList data={ updates } isLoading={ eventQuery.isPlaceholderData }/>
      </Show>
    </>
  ) : null;

  const actionBar = !isActionBarHidden ? (
    <TokenUpdateActionBar mt={ -6 }>
      <TokenUpdateFilterGroup
        typeFilter={ typeFilter }
        handleFilterChange={ handleFilterChange }
        eventQuery={ eventQuery }
        tokenUpdates={ tokenUpdates }/>
      { /*<Pagination ml="auto" { ...tokenTransferQuery.pagination }/>*/ }
    </TokenUpdateActionBar>
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
