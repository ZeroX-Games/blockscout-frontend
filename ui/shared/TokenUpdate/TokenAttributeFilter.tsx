import { Box, Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  defaultFilter: Array<string>;
  onFilterChange: (nextValue: unknown) => void;
  attributes: Array<string>;
}

const TokenAttributeFilter = ({ defaultFilter, onFilterChange, attributes }: Props) => {
  return (
    <>
      <Text variant="secondary" fontWeight={ 600 }>Attribute</Text>
      <Stack
        paddingBottom={ 4 }
        borderBottom="1px solid"
        borderColor="divider"
        spacing={ 4 } w="full"
      >
        <CheckboxGroup size="lg" onChange={ onFilterChange } defaultValue={ defaultFilter }>
          { attributes.map((attribute) => {
            return (
              <Box key={ attribute } w="full">
                <Checkbox key={ attribute } value={ attribute } w="full">
                  <Text fontSize="md" textOverflow="ellipsis" overflow="hidden" w="150px" whiteSpace="nowrap">{ attribute }</Text>
                </Checkbox>
              </Box>
            );
          }) }
        </CheckboxGroup>
      </Stack>
    </>
  );
};

export default React.memo(TokenAttributeFilter);
