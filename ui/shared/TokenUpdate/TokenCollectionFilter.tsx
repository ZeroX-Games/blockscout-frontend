import { Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  defaultFilter: string;
  onFilterChange: (nextValue: any) => void;
  collections: Array<string>;
}

const TokenCollectionFilter = ({ defaultFilter, onFilterChange, collections }: Props) => {
  return (
    <>
      <Text variant="secondary" fontWeight={ 600 }>Address</Text>
      <RadioGroup
        size="lg"
        onChange={ onFilterChange }
        defaultValue={ defaultFilter }
        paddingBottom={ 4 }
        borderBottom="1px solid"
        borderColor="divider"
      >
        <Stack spacing={ 4 }>
          { collections.map((collection) => {
            return <Radio key={ collection } value={ collection }><Text fontSize="md">{ collection }</Text></Radio>;
          }) }
        </Stack>
      </RadioGroup>
    </>
  );
};

export default React.memo(TokenCollectionFilter);
