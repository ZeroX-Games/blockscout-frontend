import React from 'react';

import useIsInitialLoading from 'lib/hooks/useIsInitialLoading';
import PopoverFilter from 'ui/shared/filters/PopoverFilter';
import TokenCollectionFilter from 'ui/shared/TokenUpdate/TokenCollectionFilter';

interface Props {
  appliedFiltersNum?: number;
  defaultFilter: string;
  onFilterChange: (nextValue: string) => void;
  isLoading?: boolean;
  collections: Array<string>;
}

const TokenUpdateFilter = ({
  onFilterChange,
  defaultFilter,
  appliedFiltersNum,
  collections,
  isLoading,
}: Props) => {
  const isInitialLoading = useIsInitialLoading(isLoading);

  return (
    <PopoverFilter appliedFiltersNum={ appliedFiltersNum } contentProps={{ w: '220px' }} isLoading={ isInitialLoading }>
      <TokenCollectionFilter defaultFilter={ defaultFilter } onFilterChange={ onFilterChange } collections={ collections }/>
      { /*<TokenTypeFilter<TokenType> onChange={ onTypeFilterChange } defaultValue={ defaultTypeFilters } nftOnly={ false }/>*/ }
    </PopoverFilter>
  );
};

export default React.memo(TokenUpdateFilter);
