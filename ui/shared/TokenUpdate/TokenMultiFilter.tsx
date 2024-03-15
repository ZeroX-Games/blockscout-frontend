import { CheckboxGroup, Checkbox, Text, Flex, Link, useCheckboxGroup } from '@chakra-ui/react';
import React from 'react';

import type { Filter } from '../../event/EventTokenUpdate';
import type { FilterTypeMultiUpdate } from './TokenUpdateFilterGroup';

type Props = {
  onChange: FilterTypeMultiUpdate;
  defaultValue?: Filter;
  options: Array<string>;
}
const TokenMultiFilter = ({ onChange, defaultValue, options }: Props) => {
  const { value, setValue } = useCheckboxGroup({ defaultValue });

  const handleReset = React.useCallback(() => {
    if (value.length === 0) {
      return;
    }
    setValue([]);
    onChange([]);
  }, [ onChange, setValue, value.length ]);

  const handleChange = React.useCallback((nextValue: Array<string>) => {
    setValue(nextValue);
    onChange(nextValue);
  }, [ onChange, setValue ]);

  return (
    <>
      <Flex justifyContent="space-between" fontSize="sm">
        <Text fontWeight={ 600 } variant="secondary">Type</Text>
        <Link
          onClick={ handleReset }
          cursor={ value.length > 0 ? 'pointer' : 'unset' }
          color={ value.length > 0 ? 'link' : 'text_secondary' }
          _hover={{
            color: value.length > 0 ? 'link_hovered' : 'text_secondary',
          }}
        >
          Reset
        </Link>
      </Flex>
      <CheckboxGroup size="lg" onChange={ handleChange } value={ value }>
        { options.map((option, index) => (
          <Checkbox key={ index } value={ index }>
            <Text fontSize="md">{ option }</Text>
          </Checkbox>
        )) }
      </CheckboxGroup>
    </>
  );
};

export default TokenMultiFilter;
