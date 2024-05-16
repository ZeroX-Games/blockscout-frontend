import { InputGroup, Input, InputLeftElement, chakra, useColorModeValue, forwardRef, InputRightElement } from '@chakra-ui/react';
import throttle from 'lodash/throttle';
import React from 'react';
import type { ChangeEvent, FormEvent, FocusEvent } from 'react';

import { useScrollDirection } from 'lib/contexts/scrollDirection';
import useIsMobile from 'lib/hooks/useIsMobile';
import ClearButton from 'ui/shared/ClearButton';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBlur?: (event: FocusEvent<HTMLFormElement>) => void;
  onFocus?: () => void;
  onHide?: () => void;
  onClear: () => void;
  isHomepage?: boolean;
  value: string;
}

const TableSearchBarInput = ({ onChange, onSubmit, isHomepage, onFocus, onBlur, onHide, onClear, value }: Props, ref: React.ForwardedRef<HTMLFormElement>) => {
  const innerRef = React.useRef<HTMLFormElement>(null);
  React.useImperativeHandle(ref, () => innerRef.current as HTMLFormElement, []);
  const scrollDirection = useScrollDirection();
  const isMobile = useIsMobile();

  const handleScroll = React.useCallback(() => {
    const TOP_BAR_HEIGHT = 36;
    const clientRect = isMobile && innerRef?.current?.getBoundingClientRect();
    if (clientRect && clientRect.y < TOP_BAR_HEIGHT) {
      onHide?.();
    }
  }, [ isMobile, onHide ]);

  const handleChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [ onChange ]);

  React.useEffect(() => {
    if (!isMobile) {
      return;
    }
    const throttledHandleScroll = throttle(handleScroll, 300);

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [ isMobile, handleScroll ]);

  const bgColor = useColorModeValue('white', 'black');
  const transformMobile = scrollDirection !== 'down' ? 'translateY(0)' : 'translateY(-100%)';

  return (
    <chakra.form
      ref={ innerRef }
      noValidate
      onSubmit={ onSubmit }
      onBlur={ onBlur }
      onFocus={ onFocus }
      w="30%"
      backgroundColor={ bgColor }
      borderRadius={{ base: 'none', lg: 'base' }}
      position={{ base: 'absolute', lg: 'static' }}
      top={{ base: 55, lg: 0 }}
      left="0"
      zIndex={{ base: '-1', lg: 'auto' }}
      paddingX={{ base: 4, lg: 0 }}
      paddingTop={{ base: 1, lg: 0 }}
      paddingBottom={{ base: 2, lg: 0 }}
      transform={{ base: transformMobile, lg: 'none' }}
      transitionProperty="transform,box-shadow,background-color,color,border-color"
      transitionDuration="normal"
      transitionTimingFunction="ease"
    >
      <InputGroup size="sm">
        <InputLeftElement w={{ base: 4, lg: 6 }} ml={{ base: 3, lg: 4 }} h="100%">
          <IconSvg name="search" boxSize={{ base: 4, lg: 6 }} color={ useColorModeValue('blackAlpha.600', 'whiteAlpha.600') }/>
        </InputLeftElement>
        <Input
          pl={{ base: '38px', lg: '50px' }}
          sx={{
            '@media screen and (max-width: 999px)': {
              paddingLeft: isHomepage ? '50px' : '38px',
              paddingRight: '36px',
            },
            '@media screen and (min-width: 1001px)': {
              paddingRight: '36px',
            },
          }}
          placeholder={ isMobile ? 'Search by address / ... ' : 'Search by address / collection / token... ' }
          onChange={ handleChange }
          border={ isHomepage ? 'none' : '2px solid' }
          borderColor={ useColorModeValue('blackAlpha.100', 'whiteAlpha.200') }
          _focusWithin={{ _placeholder: { color: 'gray.300' } }}
          color={ useColorModeValue('black', 'white') }
          value={ value }
        />
        { value && (
          <InputRightElement top={{ base: isHomepage ? '18px' : 2, lg: '18px' }} right={ 2 }>
            <ClearButton onClick={ onClear }/>
          </InputRightElement>
        ) }
      </InputGroup>
    </chakra.form>
  );
};

export default React.memo(forwardRef(TableSearchBarInput));
