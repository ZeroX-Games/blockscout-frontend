import { Hide, Show } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import type { MatrixEntry } from '../../types/api/event';
import type { TokenType } from 'types/api/token';
import type { TokenTransfer } from 'types/api/tokenTransfer';

import getFilterValuesFromQuery from 'lib/getFilterValuesFromQuery';
import { apos } from 'lib/html-entities';
import { TOKEN_TYPE_IDS } from 'lib/token/tokenTypes';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import DataListDisplay from 'ui/shared/DataListDisplay';
import TokenUpdateList from 'ui/shared/TokenUpdate/TokenUpdateList';
import TokenUpdateTable from 'ui/shared/TokenUpdate/TokenUpdateTable';

import type { EventQuery } from './useEventQuery';

const getTokenFilterValue = (getFilterValuesFromQuery<TokenType>).bind(null, TOKEN_TYPE_IDS);

interface Props {
  eventQuery: EventQuery;
  tokenTransferFilter?: (data: TokenTransfer) => boolean;
}

const EventTokenTransfer = ({ eventQuery }: Props) => {
  const router = useRouter();
  const [ typeFilter, setTypeFilter ] = React.useState<Array<TokenType>>(getTokenFilterValue(router.query.type) || []);
  const tokenUpdates = eventQuery.data?.matrix_entries.slice(0, 8);

  // const handleTypeFilterChange = React.useCallback((nextValue: Array<TokenType>) => {
  //   tokenUpdates.onFilterChange({ type: nextValue });
  //   setTypeFilter(nextValue);
  // }, [ tokenUpdates ]);

  if (eventQuery.isError) {
    setTypeFilter([]);
    return <DataFetchAlert/>;
  }
  const numActiveFilters = typeFilter.length;
  // const isActionBarHidden = !numActiveFilters && !tokenUpdates.length;
  const isActionBarHidden = true;

  let items: Array<MatrixEntry> = [];

  let attributes: Array<string> = [];
  if (tokenUpdates) {
    attributes = tokenUpdates.attributes;
    if (eventQuery.isPlaceholderData) {
      items = tokenUpdates;
    } else {
      // items = tokenTransferFilter ? tokenTransferQuery.data.items.filter(tokenTransferFilter) : tokenTransferQuery.data.items;
      items = tokenUpdates;
    }
  }
  attributes[0] = 'Token ID';
  const content = tokenUpdates ? (
    <>
      <Hide below="lg" ssr={ false }>
        <TokenUpdateTable data={ items } top={ isActionBarHidden ? 0 : 80 } isLoading={ eventQuery.isPlaceholderData } attributes={ attributes }/>
      </Hide>
      <Show below="lg" ssr={ false }>
        <TokenUpdateList data={ items } isLoading={ eventQuery.isPlaceholderData }/>
      </Show>
    </>
  ) : null;

  // const actionBar = !isActionBarHidden ? (
  //   <ActionBar mt={ -6 }>
  //     <TokenTransferFilter
  //       defaultTypeFilters={ typeFilter }
  //       onTypeFilterChange={ handleTypeFilterChange }
  //       appliedFiltersNum={ numActiveFilters }
  //       isLoading={ eventQuery.isPlaceholderData }
  //     />
  //     { /*<Pagination ml="auto" { ...tokenTransferQuery.pagination }/>*/ }
  //   </ActionBar>
  // ) : null;

  return (
    <DataListDisplay
      isError={ eventQuery.isError || eventQuery.isError }
      items={ items }
      emptyText="There are no token transfers."
      filterProps={{
        emptyFilteredText: `Couldn${ apos }t find any token transfer that matches your query.`,
        hasActiveFilters: Boolean(numActiveFilters),
      }}
      content={ content }
    />
  );
};

export default EventTokenTransfer;
