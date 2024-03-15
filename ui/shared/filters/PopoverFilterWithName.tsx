import type { PopoverContentProps } from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

import FilterButtonWithName from './FilterButtonWithName';

interface Props {
  appliedFiltersNum?: number;
  isActive?: boolean;
  children: React.ReactNode;
  contentProps?: PopoverContentProps;
  isLoading?: boolean;
  name: string;
  currentFilter: Array<string>;
}

const PopoverFilterWithName = ({ appliedFiltersNum, children, contentProps, isActive, isLoading, name, currentFilter }: Props) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Popover isOpen={ isOpen } onClose={ onClose } placement="bottom-start" isLazy>
      <PopoverTrigger>
        <FilterButtonWithName
          isActive={ isOpen || isActive || Number(appliedFiltersNum) > 0 }
          onClick={ onToggle }
          appliedFiltersNum={ appliedFiltersNum }
          isLoading={ isLoading }
          name={ name }
          currentFilter={ currentFilter }
        />
      </PopoverTrigger>
      <PopoverContent { ...contentProps }>
        <PopoverBody px={ 4 } py={ 6 } display="flex" flexDir="column" rowGap={ 5 }>
          { children }
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default React.memo(PopoverFilterWithName);
