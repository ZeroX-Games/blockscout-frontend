import { Flex } from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';

import type { MatrixEntry } from '../../../types/api/event';

import type { Filter } from '../../event/EventTokenUpdate';
import type { EventQuery } from '../../event/useEventQuery';
import TokenUpdateCollectionFilter from './TokenUpdateCollectionFilter';

interface Props {
  typeFilter: Filter;
  handleFilterChange: (nextValue: Filter) => void;
  eventQuery: EventQuery;
  tokenUpdates: Array<MatrixEntry>;
}

export type FilterType = string | Array<string>;
export type FilterTypeSingleUpdate = (nextValue: string) => void;
export type FilterTypeMultiUpdate = (nextValue: Array<string>) => void;

const TokenUpdateFilterGroup = ({ typeFilter, handleFilterChange, eventQuery, tokenUpdates }: Props) => {
  const getAllAttributesWithOutDuplicates = useMemo(() => {
    const allAttributes: Array<string> = [];
    tokenUpdates.forEach((entry) => {
      entry.attributes.forEach((attribute) => {
        if (!allAttributes.includes(attribute)) {
          allAttributes.push(attribute);
        }
      });
    });
    return allAttributes;
  }, [ tokenUpdates ]);

  const handleAttributeFilterChange = useCallback((newAttributes: Array<string>) => {
    if (Array.isArray(newAttributes)) {
      handleFilterChange({ ...typeFilter, attributes: newAttributes });
      return;
    }
  }, [ handleFilterChange, typeFilter ]);
  const handleCollectionFilterChange = useCallback((newCollection: string) => {
    handleFilterChange({ ...typeFilter, collectionAddr: newCollection });
  }, [ handleFilterChange, typeFilter ]);
  return (
    <Flex gap={ 4 }>
      <TokenUpdateCollectionFilter
        defaultFilter={ typeFilter }
        onFilterChange={ handleCollectionFilterChange }
        isLoading={ eventQuery.isPlaceholderData }
        // map and get rid of duplicates
        collections={ tokenUpdates.map((entry) => entry.collectionAddr).filter((value, index, self) => self.indexOf(value) === index) }
        name="Collection"
        multi={ false }
      />
      <TokenUpdateCollectionFilter
        defaultFilter={ typeFilter }
        onFilterChange={ handleAttributeFilterChange }
        isLoading={ eventQuery.isPlaceholderData }
        // map and get rid of duplicates
        collections={ tokenUpdates.map((entry) => entry.collectionAddr).filter((value, index, self) => self.indexOf(value) === index) }
        name="Attribute"
        multi={ true }
        options={ getAllAttributesWithOutDuplicates }
      />
    </Flex>
  );
};

export default TokenUpdateFilterGroup;
