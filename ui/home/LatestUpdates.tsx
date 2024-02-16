import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import useApiQuery from 'lib/api/useApiQuery';
import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import useIsMobile from 'lib/hooks/useIsMobile';
import useNewTxsSocket from 'lib/hooks/useNewTxsSocket';
import { UPDATE } from 'stubs/update';
import LinkInternal from 'ui/shared/LinkInternal';
import SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';

import LatestUpdatesItem from './LatestUpdatesItem';
import LatestUpdatesItemMobile from './LatestUpdatesItemMobile';

const LatestUpdates = () => {
  const isMobile = useIsMobile();
  const updatesCount = isMobile ? 2 : 6;
  const { data, isPlaceholderData, isError } = useApiQuery('homepage_updates', {
    queryOptions: {
      placeholderData: Array(updatesCount).fill(UPDATE),
    },
  });
  const { num, socketAlert } = useNewTxsSocket();
  let data1;
  if (isError) {
    data1 = Array(updatesCount).fill(UPDATE);
    // return <Text mt={ 4 }>No data. Please reload page.</Text>;
  }

  if (data || isError) {
    data1 = Array(updatesCount).fill(UPDATE);
    const txsUrl = route({ pathname: '/txs' });
    return (
      <>
        <SocketNewItemsNotice borderBottomRadius={ 0 } url={ txsUrl } num={ num } alert={ socketAlert } isLoading={ isPlaceholderData } type="update"/>
        <Box mb={ 3 } display={{ base: 'block', lg: 'none' }}>
          { data1.slice(0, updatesCount).map(((update, index) => (
            <LatestUpdatesItemMobile
              key={ update.eventHash + (isPlaceholderData ? index : '') }
              update={ update }
              isLoading={ isPlaceholderData }
            />
          ))) }
        </Box>
        <AddressHighlightProvider>
          <Box mb={ 4 } display={{ base: 'none', lg: 'block' }}>
            { data1.slice(0, updatesCount).map(((update, index) => (
              <LatestUpdatesItem
                key={ update.eventHash + (isPlaceholderData ? index : '') }
                update={ update }
                isLoading={ isPlaceholderData }
              />
            ))) }
          </Box>
        </AddressHighlightProvider>
        <Flex justifyContent="center">
          <LinkInternal fontSize="sm" href={ txsUrl }>View all updates</LinkInternal>
        </Flex>
      </>
    );
  }

  return null;
};

export default LatestUpdates;
