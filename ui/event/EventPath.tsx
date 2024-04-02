import { Box, HStack, Skeleton } from '@chakra-ui/react';
import React from 'react';

// import * as EntityBase from 'ui/shared/entities/base/components';
import { CHAIN_TYPES } from 'lib/chainTypes';
import EventEntity from 'ui/shared/entities/event/EventEntity';
import IconSvg from 'ui/shared/IconSvg';

type Props = {
  blockId: number;
  chainID: number;
  isLoading?: boolean;
}

const EventPath = ({ blockId, chainID, isLoading }: Props) => {
  // const darkModeFilter = { filter: 'brightness(0) invert(1)' };
  // const style = useColorModeValue({}, darkModeFilter);
  const network = CHAIN_TYPES[`${ chainID }`];
  const icon = network?.icon || 'networks/unknown';
  const name = network?.title || 'unknown';
  return (
    <HStack gap={ 2 }>
      <EventEntity
        isLoading={ isLoading }
        number={ blockId }
        tailLength={ 2 }
        lineHeight={ 7 }
        fontWeight={ 500 }
        mr="auto"
        name="zerox-events"
      />
      <IconSvg
        name="arrows/east"
        isLoading={ isLoading }
        boxSize={ 5 }
      />
      <HStack gap={ 2 }>
        <IconSvg
          name={ icon }
          isLoading={ isLoading }
          boxSize={ 5 }
        />
        <Skeleton isLoaded={ !isLoading }>
          <Box>{ name }</Box>
        </Skeleton>
      </HStack>
    </HStack>
  );
};

export default React.memo(EventPath);
