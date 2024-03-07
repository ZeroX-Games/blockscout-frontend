import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import useApiQuery from 'lib/api/useApiQuery';
import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import useIsMobile from 'lib/hooks/useIsMobile';
import useNewEventsSocket from 'lib/hooks/useNewEventsSocket';
import { BLOCK_SUMMARY } from 'stubs/update';
import LinkInternal from 'ui/shared/LinkInternal';
import SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';

import LatestEventsItem from './LatestEventsItem';
import LatestEventsItemMobile from './LatestEventsItemMobile';

const LatestEvents = () => {
  const isMobile = useIsMobile();
  const eventsCount = isMobile ? 2 : 6;
  const { data, isPlaceholderData, isError } = useApiQuery('homepage_events_summary', {
    queryOptions: {
      placeholderData: BLOCK_SUMMARY,
    },
  });
  const { num, socketAlert } = useNewEventsSocket(data?.count);
  let response;
  if (isError) {
    response = BLOCK_SUMMARY;
    // return <Text mt={ 4 }>No data. Please reload page.</Text>;
  }
  if (data) {
    response = data;
    const results = response.results;
    const txsUrl = route({ pathname: '/txs' });
    return (
      <>
        <SocketNewItemsNotice borderBottomRadius={ 0 } url={ txsUrl } num={ num } alert={ socketAlert } isLoading={ false } type="event"/>
        <Box mb={ 3 } display={{ base: 'block', lg: 'none' }}>
          { results.slice(0, eventsCount).map(((event, index) => (
            <LatestEventsItemMobile
              key={ index }
              event={ event }
              isLoading={ isPlaceholderData }
            />
          ))) }
        </Box>
        <AddressHighlightProvider>
          <Box mb={ 4 } display={{ base: 'none', lg: 'block' }}>
            { results.slice(0, eventsCount).map(((event, index) => (
              <LatestEventsItem
                key={ index }
                event={ event }
                isLoading={ isPlaceholderData }
              />
            ))) }
          </Box>
        </AddressHighlightProvider>
        <Flex justifyContent="center">
          <LinkInternal fontSize="sm" href={ txsUrl }>View all events</LinkInternal>
        </Flex>
      </>
    );
  }

  return null;
};

export default LatestEvents;
