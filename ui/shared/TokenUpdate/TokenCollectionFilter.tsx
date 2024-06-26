import { Box, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  defaultFilter: string;
  onFilterChange: (nextValue: unknown) => void;
  collections: Array<string>;
}

const TokenCollectionFilter = ({ defaultFilter, onFilterChange, collections }: Props) => {
  return (
    <>
      <Text variant="secondary" fontWeight={ 600 }>Collection</Text>
      <RadioGroup
        size="lg"
        onChange={ onFilterChange }
        defaultValue={ defaultFilter }
        paddingBottom={ 4 }
        borderBottom="1px solid"
        borderColor="divider"
      >
        <Stack spacing={ 4 } w="full">
          { collections.map((collection) => {
            let name;
            if (collection === '0x1059f25e02b15623cad1b2363dbc7666c7c5de5d') {
              name = 'Doge';
            } else {
              name = 'Meebit';
            }
            return (
              <Box key={ collection } w="full">
                <Radio key={ collection } value={ collection } w="full">
                  <Text fontSize="md" textOverflow="ellipsis" overflow="hidden" w="150px" whiteSpace="nowrap">{ name }</Text>
                </Radio>
              </Box>
            );
          }) }
        </Stack>
      </RadioGroup>
    </>
  );
};

export default React.memo(TokenCollectionFilter);
