import { Box, HStack, Skeleton } from '@chakra-ui/react';
import { type IconName } from 'public/icons/name';
import React from 'react';

// import * as EntityBase from 'ui/shared/entities/base/components';
import EventEntity from 'ui/shared/entities/event/EventEntity';
import IconSvg from 'ui/shared/IconSvg';

type Props = {
  blockId: number;
  chainId: number;
  isLoading?: boolean;
}

const EventPath = ({ blockId, chainId, isLoading }: Props) => {
  // const darkModeFilter = { filter: 'brightness(0) invert(1)' };
  // const style = useColorModeValue({}, darkModeFilter);
  let networkName = '';
  let networkIconName: IconName = 'networks/ethereum';
  switch (chainId) {
    case 1:
      networkName = 'Ethereum';
      networkIconName = 'networks/ethereum';
      break;
    case 421614:
      networkName = 'Arbitrum';
      networkIconName = 'networks/arbitrum';
      break;
    case 84532:
      networkName = 'Base';
      networkIconName = 'networks/base';
      break;
    case 59140:
      networkName = 'Linea';
      networkIconName = 'networks/linea';
      break;
    default:
      networkName = 'Ethereum';
  }

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
          name={ networkIconName }
          isLoading={ isLoading }
          boxSize={ 5 }
        />
        <Skeleton isLoaded={ !isLoading }>
          <Box>{ networkName }</Box>
        </Skeleton>
      </HStack>
    </HStack>
  );
};

export default React.memo(EventPath);
