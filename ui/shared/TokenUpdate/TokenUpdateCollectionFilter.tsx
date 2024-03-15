import React from 'react';

import useIsInitialLoading from 'lib/hooks/useIsInitialLoading';
import PopoverFilterWithName from 'ui/shared/filters/PopoverFilterWithName';
import TokenCollectionFilter from 'ui/shared/TokenUpdate/TokenCollectionFilter';

import type { Filter } from '../../event/EventTokenUpdate';
import TokenMultiFilter from './TokenMultiFilter';
import type { FilterTypeMultiUpdate, FilterTypeSingleUpdate } from './TokenUpdateFilterGroup';

type BaseProps = {
  appliedFiltersNum?: number;
  defaultFilter: Filter;
  isLoading?: boolean;
  collections: Array<string>;
  multi: boolean;
  name: string;
}

type MultiTrueProps = BaseProps & {
  multi: true;
  options: Array<string>;
  onFilterChange: FilterTypeMultiUpdate;
};

type MultiFalseProps = BaseProps & {
  multi: false;
  options?: Array<string>;
  onFilterChange: FilterTypeSingleUpdate;
};

type Props= MultiTrueProps | MultiFalseProps;

const TokenUpdateCollectionFilter = ({
  onFilterChange,
  defaultFilter,
  appliedFiltersNum,
  collections,
  isLoading,
  multi,
  name,
  options,
}: Props) => {
  const isInitialLoading = useIsInitialLoading(isLoading);
  // replace defaultFilter with object
  console.log(defaultFilter);
  const currentFilters = defaultFilter.collectionAddr.slice(-4);
  return (
    <PopoverFilterWithName
      appliedFiltersNum={ appliedFiltersNum }
      contentProps={{ w: '220px' }}
      isLoading={ isInitialLoading }
      name={ name }
      currentFilter={ [ currentFilters ] }>
      { multi ?
        <TokenMultiFilter onChange={ onFilterChange } options={ options } defaultValue={ defaultFilter }/> :
        <TokenCollectionFilter defaultFilter={ defaultFilter } onFilterChange={ onFilterChange } collections={ collections }/> }
      { /*<TokenTypeFilter<TokenType> onChange={ onTypeFilterChange } defaultValue={ defaultTypeFilters } nftOnly={ false }/>*/ }
    </PopoverFilterWithName>
  );
};

export default React.memo(TokenUpdateCollectionFilter);
