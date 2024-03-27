import type { ThemeTypings } from '@chakra-ui/react';
import { Flex, chakra, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

import type { ApplicationParam } from 'types/api/applicationParams';
import type { CollectionParam } from 'types/api/collectionParams';

import type { EntityProps } from 'ui/shared/entities/application/ApplicationEntity';
import ApplicationEntity from 'ui/shared/entities/application/ApplicationEntity';

import CollectionEntry from '../entities/collection/CollectionEntity';
import ApplicationFromToIcon from './ApplicationFromToIcon';

type Mode = 'compact' | 'long';

interface Props {
  from: ApplicationParam;
  to: CollectionParam;
  mode?: Mode | Partial<Record<ThemeTypings['breakpoints'], Mode>>;
  className?: string;
  isLoading?: boolean;
  tokenHash?: string;
  truncation?: EntityProps['truncation'];
  noIcon?: boolean;
}

const ApplicationFromTo = ({ from, to, mode: modeProp, className, isLoading, tokenHash = '', truncation, noIcon }: Props) => {
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
          <ApplicationFromToIcon
            isLoading={ isLoading }
            type="unspecified"
            transform="rotate(90deg)"
          />
          <ApplicationEntity
            application={ from }
            isLoading={ isLoading }
            noIcon={ noIcon }
            tokenHash={ tokenHash }
            truncation={ truncation }
            maxW={ truncation === 'constant' ? undefined : 'calc(100% - 28px)' }
            w="min-content"
            iconSize="md"
          />
        </Flex>
        { to && (
          <CollectionEntry
            collection={ to }
            isLoading={ isLoading }
            noIcon={ noIcon }
            tokenHash={ tokenHash }
            truncation={ truncation }
            maxW={ truncation === 'constant' ? undefined : 'calc(100% - 28px)' }
            w="min-content"
            ml="28px"
            iconSize="md"
          />
        ) }
      </Flex>
    );
  }

  const iconSizeWithMargins = (5 + 4 + 3) * 4;

  return (
    <Flex className={ className } alignItems="center">
      <ApplicationEntity
        application={ from }
        isLoading={ isLoading }
        noIcon={ noIcon }
        tokenHash={ tokenHash }
        truncation={ truncation }
        maxW={ truncation === 'constant' ? undefined : `calc(50% - ${ iconSizeWithMargins / 2 }px)` }
        mr={ 4 }
        iconSize="md"
      />
      <ApplicationFromToIcon
        isLoading={ isLoading }
        type="unspecified"
      />
      { to && (
        <CollectionEntry
          collection={ to }
          isLoading={ isLoading }
          noIcon={ noIcon }
          tokenHash={ tokenHash }
          truncation={ truncation }
          maxW={ truncation === 'constant' ? undefined : `calc(50% - ${ iconSizeWithMargins / 2 }px)` }
          ml={ 3 }
          iconSize="md"
        />
      ) }
    </Flex>
  );
};

export default chakra(ApplicationFromTo);
