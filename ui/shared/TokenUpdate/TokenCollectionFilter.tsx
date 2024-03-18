import { Flex, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import EventEntity from '../entities/event/EventEntity';
import type { FilterTypeSingleUpdate } from './TokenUpdateFilterGroup';

interface Props {
  defaultFilter: string;
  onFilterChange: FilterTypeSingleUpdate;
  collections: Array<string>;
}

const TokenCollectionFilter = ({ defaultFilter, onFilterChange, collections }: Props) => {
  const defaultValue = defaultFilter;
  const handleChange = React.useCallback((nextValue: string) => {
    onFilterChange(nextValue);
  }, [ onFilterChange ]);
  return (
    <>
      <Text variant="secondary" fontWeight={ 600 }>Address</Text>
      <RadioGroup
        size="lg"
        onChange={ handleChange }
        defaultValue={ defaultValue }
        paddingBottom={ 4 }
        borderBottom="1px solid"
        borderColor="divider"
      >
        <Stack spacing={ 4 }>
          { collections.map((collection) => {
            let name;
            if (collection === '0xED5AF388653567Af2F388E6224dC7C4b3241C544') {
              name = 'Meebit';
            } else {
              name = 'Doge';
            }
            return (
              <Radio key={ collection } value={ collection }>
                <Flex maxW="160px">
                  <EventEntity number={ name } hash={ collection } maxW="100%" noIcon={ true } noLink={ true }/>
                </Flex>
              </Radio>
            );
          }) }
        </Stack>
      </RadioGroup>
    </>
  );
};

export default React.memo(TokenCollectionFilter);
