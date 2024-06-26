import { Hide, Show } from '@chakra-ui/react';
import React from 'react';

import type { TokenTransfer } from 'types/api/tokenTransfer';

import { apos } from 'lib/html-entities';
// import ActionBar from 'ui/shared/ActionBar';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import DataListDisplay from 'ui/shared/DataListDisplay';
// import PopoverFilter from 'ui/shared/filters/PopoverFilter';
// import TableSearchBar from 'ui/shared/tableSearch/TableSearchBar';
// import TokenAttributeFilter from 'ui/shared/TokenUpdate/TokenAttributeFilter';
// import TokenCollectionFilter from 'ui/shared/TokenUpdate/TokenCollectionFilter';
import GameAssetUpdateTable from 'ui/shared/GameAssetTokenUpdate/GameAssetUpdateTable';
import GameAssetTokenUpdateList from 'ui/shared/TokenUpdate/TokenUpdateList';

import type { GameAssetTokenUpdateQuery } from './useUtilityUpdateQuery';

interface Props {
  gameAssetUpdateQuery: GameAssetTokenUpdateQuery;
  tokenTransferFilter?: (data: TokenTransfer) => boolean;
}

const TxGameAssetUpdate = ({ gameAssetUpdateQuery }: Props) => {
  // const [ typeFilter, setTypeFilter ] = React.useState<string>('');
  // const [ updates, setUpdates ] = React.useState<Array<MatrixEntry>>([]);
  // const [ attributes, setAttributes ] = React.useState<Array<string>>([]);

  const tokenUpdates = React.useMemo(() => {
    return gameAssetUpdateQuery.data ? gameAssetUpdateQuery.data.updatedTokens.slice(0, 8) : [];
  }, [ gameAssetUpdateQuery.data ]);
  // useEffect(() => {
  // if (tokenUpdates.length) {
  // const defaultCollectionAddr = tokenUpdates[0].collectionAddr;
  // const filterData = tokenUpdates.filter((entry) => entry.collectionAddr === defaultCollectionAddr);
  // setUpdates(filterData);
  // setTypeFilter(defaultCollectionAddr);
  // setAttributes(tokenUpdates[0].attributes);
  // }
  // }, [ tokenUpdates ]);

  // const onFilterChange = React.useCallback((nextValue: string) => {
  //   const filterData = tokenUpdates.filter((entry) => entry.collectionAddr === nextValue);
  //   setUpdates(filterData);
  //   setAttributes(filterData[0].attributes);
  //   setTypeFilter(nextValue);
  // }, [ tokenUpdates ]);

  // const onAttributeFilterChange = useCallback((val: Array<string>) => {
  //   const filteredUpdates = tokenUpdates.map((update) => {
  //     const newAttributes = val.filter((att) => !update.attributes.includes(att));
  //     const newIndexes = newAttributes.map((att) => attributes.indexOf(att));
  //     return {
  //       updates: update.updates.map((matrixUpdate) => ({
  //         token_id: matrixUpdate.token_id,
  //         delta: matrixUpdate.delta.filter((_, index) => !newIndexes.includes(index)),
  //       })),
  //       attributes: newAttributes,
  //       collectionAddr: update.collectionAddr,
  //     };
  //   });
  //   setAttributes(val);
  //   setUpdates(filteredUpdates);
  // }, [ tokenUpdates, attributes ]);

  if (gameAssetUpdateQuery.isError) {
    // setTypeFilter('');
    return <DataFetchAlert/>;
  }

  // const isActionBarHidden = !typeFilter.length && !updates.length;
  // const isActionBarHidden = false;

  // let items: Array<GameAssetTokenUpdate> = [];
  //
  // if (tokenUpdates) {
  //   if (gameAssetTokenUpdateQuery.isPlaceholderData) {
  //     items = tokenUpdates;
  //   } else {
  //     // items = tokenTransferFilter ? tokenTransferQuery.data.items.filter(tokenTransferFilter) : tokenTransferQuery.data.items;
  //     items = tokenUpdates;
  //   }
  // }
  const content = tokenUpdates ? (
    <>
      <Hide below="lg" ssr={ false }>
        <GameAssetUpdateTable
          query={ gameAssetUpdateQuery }
          // top={ isActionBarHidden ? 0 : 80 }
        />
      </Hide>
      <Show below="lg" ssr={ false }>
        <GameAssetTokenUpdateList data={ tokenUpdates } isLoading={ gameAssetUpdateQuery.isPlaceholderData }/>
      </Show>
    </>
  ) : null;

  const actionBar =
    //   !isActionBarHidden ? (
    //   <ActionBar mt={ -6 }>
    //     <TableSearchBar/>
    //     <HStack>
    //       <PopoverFilter contentProps={{ w: '220px' }} text="Collection">
    //         <TokenCollectionFilter
    //           defaultFilter={ typeFilter }
    //           onFilterChange={ onFilterChange }
    //           collections={ tokenUpdates.map((entry) => entry.collectionAddr).filter((value, index, self) => self.indexOf(value) === index) }/>
    //       </PopoverFilter>
    //       <PopoverFilter contentProps={{ w: '220px' }} text="Attribute">
    //         <TokenAttributeFilter
    //           defaultFilter={ attributes }
    //           onFilterChange={ onAttributeFilterChange }
    //           attributes={ tokenUpdates[0].attributes.map((att) => att) }/>
    //       </PopoverFilter>
    //     </HStack>
    //     { /*<Pagination ml="auto" { ...tokenTransferQuery.pagination }/>*/ }
    //   </ActionBar>
    // ) :
    null;

  return (
    <DataListDisplay
      isError={ gameAssetUpdateQuery.isError }
      items={ tokenUpdates }
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

export default TxGameAssetUpdate;
