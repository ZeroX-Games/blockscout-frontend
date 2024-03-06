import type { ThemeTypings } from '@chakra-ui/react';
import { Flex, chakra, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

import type { DomainParam } from 'types/api/domainParams';

import type { EntityProps } from 'ui/shared/entities/domain/DomainEntity';
import DomainEntity from 'ui/shared/entities/domain/DomainEntity';

import DomainFromToIcon from './DomainFromToIcon';

type Mode = 'compact' | 'long';

interface Props {
  from: DomainParam;
  to: DomainParam;
  mode?: Mode | Partial<Record<ThemeTypings['breakpoints'], Mode>>;
  className?: string;
  isLoading?: boolean;
  tokenHash?: string;
  truncation?: EntityProps['truncation'];
  noIcon?: boolean;
}

const DomainFromTo = ({ from, to, mode: modeProp, className, isLoading, tokenHash = '', truncation, noIcon }: Props) => {
  const mode = useBreakpointValue(
    {
      base: (typeof modeProp === 'object' ? modeProp.base : modeProp),
      lg: (typeof modeProp === 'object' ? modeProp.lg : modeProp),
      xl: (typeof modeProp === 'object' ? modeProp.xl : modeProp),
    },
  ) ?? 'long';
  if (mode === 'compact') {
    return (
      <Flex className={ className } flexDir="column" rowGap={ 3 }>
        <Flex alignItems="center" columnGap={ 2 }>
          <DomainFromToIcon
            isLoading={ isLoading }
            type="unspecified"
            transform="rotate(90deg)"
          />
          <DomainEntity
            domain={ from }
            isLoading={ isLoading }
            noIcon={ noIcon }
            tokenHash={ tokenHash }
            truncation={ truncation }
            maxW={ truncation === 'constant' ? undefined : 'calc(100% - 28px)' }
            w="min-content"
            type="domain"
          />
        </Flex>
        { to && (
          <DomainEntity
            domain={ to }
            isLoading={ isLoading }
            noIcon={ noIcon }
            tokenHash={ tokenHash }
            truncation={ truncation }
            maxW={ truncation === 'constant' ? undefined : 'calc(100% - 28px)' }
            w="min-content"
            ml="28px"
            type="collection"
          />
        ) }
      </Flex>
    );
  }

  const iconSizeWithMargins = (5 + 4 + 3) * 4;

  return (
    <Flex className={ className } alignItems="center">
      <DomainEntity
        domain={ from }
        isLoading={ isLoading }
        noIcon={ noIcon }
        tokenHash={ tokenHash }
        truncation={ truncation }
        maxW={ truncation === 'constant' ? undefined : `calc(50% - ${ iconSizeWithMargins / 2 }px)` }
        mr={ 4 }
        type="domain"
      />
      <DomainFromToIcon
        isLoading={ isLoading }
        type="unspecified"
      />
      { to && (
        <DomainEntity
          domain={ to }
          isLoading={ isLoading }
          noIcon={ noIcon }
          tokenHash={ tokenHash }
          truncation={ truncation }
          maxW={ truncation === 'constant' ? undefined : `calc(50% - ${ iconSizeWithMargins / 2 }px)` }
          ml={ 3 }
          type="collection"
        />
      ) }
    </Flex>
  );
};

export default chakra(DomainFromTo);
