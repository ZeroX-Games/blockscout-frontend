import { Box, Heading, Flex, Text, VStack, Skeleton } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { SocketMessage } from 'lib/socket/types';
import type { Event } from 'types/api/event';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import useApiQuery, { getResourceKey } from 'lib/api/useApiQuery';
import useIsMobile from 'lib/hooks/useIsMobile';
import { nbsp } from 'lib/html-entities';
import useSocketChannel from 'lib/socket/useSocketChannel';
import useSocketMessage from 'lib/socket/useSocketMessage';
import { BLOCK } from 'stubs/block';
import { HOMEPAGE_STATS } from 'stubs/stats';
import LinkInternal from 'ui/shared/LinkInternal';

import LatestEventsItem from './LatestEventsItem';

const LatestEvents = () => {
  const isMobile = useIsMobile();
  // const blocksMaxCount = isMobile ? 2 : 3;
  let eventsMaxCount: number;
  if (config.features.optimisticRollup.isEnabled || config.UI.views.event.hiddenFields?.total_reward) {
    eventsMaxCount = isMobile ? 4 : 5;
  } else {
    eventsMaxCount = isMobile ? 2 : 3;
  }
  const { data, isPlaceholderData, isError } = useApiQuery('homepage_blocks', {
    queryOptions: {
      placeholderData: Array(eventsMaxCount).fill(BLOCK),
    },
  });

  const queryClient = useQueryClient();
  const statsQueryResult = useApiQuery('homepage_stats', {
    fetchParams: {
      headers: {
        'updated-gas-oracle': 'true',
      },
    },
    queryOptions: {
      refetchOnMount: false,
      placeholderData: HOMEPAGE_STATS,
    },
  });

  const handleNewEventMessage: SocketMessage.NewBlock['handler'] = React.useCallback((payload) => {
    queryClient.setQueryData(getResourceKey('homepage_blocks'), (prevData: Array<Event> | undefined) => {

      const newData = prevData ? [ ...prevData ] : [];

      if (newData.some((event => event.height === payload.block.height))) {
        return newData;
      }

      return [ payload.block, ...newData ].sort((b1, b2) => b2.height - b1.height).slice(0, eventsMaxCount);
    });
  }, [ queryClient, eventsMaxCount ]);

  const channel = useSocketChannel({
    topic: 'blocks:new_block',
    isDisabled: isPlaceholderData || isError,
  });
  useSocketMessage({
    channel,
    event: 'new_block',
    handler: handleNewEventMessage,
  });

  let content;

  if (isError) {
    content = <Text>No data. Please reload page.</Text>;
  }

  if (data) {
    const dataToShow = data.slice(0, eventsMaxCount);

    content = (
      <>
        { statsQueryResult.data?.network_utilization_percentage !== undefined && (
          <Skeleton isLoaded={ !statsQueryResult.isPlaceholderData } mb={{ base: 6, lg: 3 }} display="inline-block">
            <Text as="span" fontSize="sm">
              Network utilization:{ nbsp }
            </Text>
            <Text as="span" fontSize="sm" color="blue.400" fontWeight={ 700 }>
              { statsQueryResult.data?.network_utilization_percentage.toFixed(2) }%
            </Text>
          </Skeleton>
        ) }
        <VStack spacing={ 3 } mb={ 4 } overflow="hidden" alignItems="stretch">
          <AnimatePresence initial={ false } >
            { dataToShow.map(((event, index) => (
              <LatestEventsItem
                key={ event.height + (isPlaceholderData ? String(index) : '') }
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
      <Heading as="h4" size="sm" mb={ 4 }>Latest events</Heading>
      { content }
    </Box>
  );
};

export default LatestEvents;
