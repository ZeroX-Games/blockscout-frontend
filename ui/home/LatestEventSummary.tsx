import { Box, Heading, Flex, Text, VStack } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import useApiQueryV1 from 'lib/api/v1/useApiQueryV1';
import useIsMobile from 'lib/hooks/useIsMobile';
import { EVENT_SUMMARY } from 'stubs/update';
import LinkInternal from 'ui/shared/LinkInternal';

import useNewEventsSocket from '../../lib/hooks/useNewEventsSocket';
import LatestEventSummaryItem from './LatestEventSummaryItem';

const LatestEventSummary = () => {
  const isMobile = useIsMobile();
  // const socket = useWebSocketContext();
  // const blocksMaxCount = isMobile ? 2 : 3;
  let eventsMaxCount: number;
  if (config.features.optimisticRollup.isEnabled || config.UI.views.event.hiddenFields?.total_reward) {
    eventsMaxCount = isMobile ? 4 : 5;
  } else {
    eventsMaxCount = isMobile ? 2 : 3;
  }
  eventsMaxCount = 5;
  const { data, isPlaceholderData, isError } = useApiQueryV1('homepage_events_summary', {
    queryOptions: {
      placeholderData: EVENT_SUMMARY,
    },
  });
  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   handleNewUpdateMessage();
  //   // handleSocketClose();
  // }, [ socket, handleNewUpdateMessage ]);
  useNewEventsSocket();

  let content;

  if (isError) {
    content = <Text>No data. Please reload page.</Text>;
  }

  if (data && data.results) {
    const dataToShow = data.results.slice(0, eventsMaxCount);
    content = (
      <>
        { /*{ statsQueryResult.data?.network_utilization_percentage !== undefined && (*/ }
        { /*  <Skeleton isLoaded={ !statsQueryResult.isPlaceholderData } mb={{ base: 6, lg: 3 }} display="inline-block">*/ }
        { /*    <Text as="span" fontSize="sm">*/ }
        { /*      Network utilization:{ nbsp }*/ }
        { /*    </Text>*/ }
        { /*    <Text as="span" fontSize="sm" color="blue.400" fontWeight={ 700 }>*/ }
        { /*      { statsQueryResult.data?.network_utilization_percentage.toFixed(2) }%*/ }
        { /*    </Text>*/ }
        { /*  </Skeleton>*/ }
        { /*) }*/ }
        <VStack spacing={ 3 } mb={ 4 } overflow="hidden" alignItems="stretch">
          <AnimatePresence initial={ false } >
            { dataToShow.map(((event, index) => (
              <LatestEventSummaryItem
                key={ event.eventHash + (isPlaceholderData ? String(index) : '') }
                event={ event }
                isLoading={ isPlaceholderData }
              />
            ))) }
          </AnimatePresence>
        </VStack>
        <Flex justifyContent="center">
          { /*TODO: change to events*/ }
          <LinkInternal fontSize="sm" href={ route({ pathname: '/events' }) }>View all Events</LinkInternal>
        </Flex>
      </>
    );
  }

  return (
    <Box width={{ base: '100%', lg: '280px' }} flexShrink={ 0 }>
      <Heading as="h4" size="sm" mb={ 4 }>Latest events summary</Heading>
      { content }
    </Box>
  );
};

export default LatestEventSummary;
