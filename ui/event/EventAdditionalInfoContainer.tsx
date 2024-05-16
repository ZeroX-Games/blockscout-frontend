import { Box, Divider, Skeleton } from '@chakra-ui/react';
import React from 'react';

import type { EventSummaryResult } from 'types/api/update';

import EventAdditionalInfoContent from './EventAdditionalInfoContent';

interface Props {
  event: EventSummaryResult;
  isLoading: boolean;
}

const EventAdditionalInfoContainer = ({ event, isLoading }: Props) => {
  if (isLoading) {
    return (
      <Box>
        <Skeleton w="130px" h="24px" borderRadius="full" mb={ 6 }/>
        <Box>
          <Skeleton w="110px" h="16px" borderRadius="full" mb={ 3 }/>
          <Skeleton w="100%" h="16px" borderRadius="full"/>
        </Box>
        <Divider my={ 4 }/>
        <Box>
          <Skeleton w="110px" h="16px" borderRadius="full" mb={ 3 }/>
          <Skeleton w="100%" h="16px" borderRadius="full"/>
        </Box>
        <Divider my={ 4 }/>
        <Box>
          <Skeleton w="110px" h="16px" borderRadius="full" mb={ 3 }/>
          <Skeleton w="100%" h="16px" borderRadius="full"/>
        </Box>
        <Divider my={ 4 }/>
        <Box>
          <Skeleton w="110px" h="16px" borderRadius="full" mb={ 3 }/>
          <Skeleton w="75%" h="16px" borderRadius="full"/>
          <Skeleton w="75%" h="16px" borderRadius="full" mt={ 1 }/>
          <Skeleton w="75%" h="16px" borderRadius="full" mt={ 1 }/>
        </Box>
        <Divider my={ 4 }/>
        <Skeleton w="80px" h="16px" borderRadius="full"/>
      </Box>
    );
  }

  return <EventAdditionalInfoContent event={ event }/>;
};

export default React.memo(EventAdditionalInfoContainer);
