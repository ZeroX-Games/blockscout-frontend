import { Box, HStack } from '@chakra-ui/react';
import React from 'react';

// import * as EntityBase from 'ui/shared/entities/base/components';
import EventEntity from 'ui/shared/entities/event/EventEntity';
import IconSvg from 'ui/shared/IconSvg';

type Props = {
  blockId: number;
  isLoading?: boolean;
}

const UpdatePath = ({ blockId, isLoading }: Props) => {
  // const darkModeFilter = { filter: 'brightness(0) invert(1)' };
  // const style = useColorModeValue({}, darkModeFilter);
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
          name="networks/base"
          isLoading={ isLoading }
          boxSize={ 5 }
        />
        <Box>BASE</Box>
      </HStack>
    </HStack>
  );
};

export default React.memo(UpdatePath);
