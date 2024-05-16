import { Box, Flex } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { route } from 'nextjs-routes';

import useApiQueryV1 from 'lib/api/v1/useApiQueryV1';
import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import useIsMobile from 'lib/hooks/useIsMobile';
import useNewEventsSocket from 'lib/hooks/useNewEventsSocket';
import { EVENT_SUMMARY } from 'stubs/update';
import LinkInternal from 'ui/shared/LinkInternal';
import SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';

import LatestEventsItem from './LatestEventsItem';
import LatestEventsItemMobile from './LatestEventsItemMobile';

const LatestEvents = () => {
  const isMobile = useIsMobile();
  const eventsCount = isMobile ? 2 : 7;
  const { data, isPlaceholderData, isError } = useApiQueryV1('homepage_events_summary', {
    queryOptions: {
      placeholderData: EVENT_SUMMARY,
    },
  });
  const { socketAlert } = useNewEventsSocket();
  let response;
  if (isError) {
    response = EVENT_SUMMARY;
    // return <Text mt={ 4 }>No data. Please reload page.</Text>;
  }
  if (data) {
    response = data;
    const results = response.results;
    const eventsUrl = route({ pathname: '/events' });
    const dataToShow = results.slice(0, eventsCount);

    return (
      <>
        <SocketNewItemsNotice borderBottomRadius={ 0 } url={ eventsUrl } alert={ socketAlert } isLoading={ false } type="event"/>
        <Box mb={ 3 } display={{ base: 'block', lg: 'none' }}>
          <AnimatePresence initial={ false } >
            { dataToShow.map(((event, index) => {
              return (event.collectionsAddrs.map((addr) => (
                <LatestEventsItemMobile
                  key={ event.eventHash + addr + (isPlaceholderData ? String(index) : '') }
                  event={ event }
                  isLoading={ isPlaceholderData }
                  collectionAddr={ addr }
                />
              )));
            })) }
          </AnimatePresence>
        </Box>
        <AddressHighlightProvider>
          <Box mb={ 4 } display={{ base: 'none', lg: 'block' }}>
            <AnimatePresence initial={ false } >
              { dataToShow.map(((event, index) => {
                return (
                  <LatestEventsItem
                    key={ event.eventHash + (isPlaceholderData ? String(index) : '') }
                    event={ event }
                    isLoading={ isPlaceholderData }
                  />
                );
              })) }
            </AnimatePresence>
          </Box>
        </AddressHighlightProvider>
        <Flex justifyContent="center">
          <LinkInternal fontSize="sm" href={ eventsUrl }>View all events</LinkInternal>
        </Flex>
      </>
    );
  }

  return null;
};

export default LatestEvents;
