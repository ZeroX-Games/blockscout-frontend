import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import useApiQuery from 'lib/api/useApiQuery';
import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import useIsMobile from 'lib/hooks/useIsMobile';
import useNewTxsSocket from 'lib/hooks/useNewTxsSocket';
import { TX } from 'stubs/tx';
import LinkInternal from 'ui/shared/LinkInternal';
import SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';

import LatestTxsItemMobile from './LatestTxsItemMobile';
import LatestUpdatesItem from './LatestUpdatesItem';

const LatestUpdates = () => {
  const isMobile = useIsMobile();
  const updatesCount = isMobile ? 2 : 6;
  const { data, isPlaceholderData, isError } = useApiQuery('homepage_updates', {
    queryOptions: {
      placeholderData: Array(updatesCount).fill(TX),
    },
  });

  const { num, socketAlert } = useNewTxsSocket();

  if (isError) {
    return <Text mt={ 4 }>No data. Please reload page.</Text>;
  }

  if (data) {
    const txsUrl = route({ pathname: '/txs' });
    return (
      <>
        <SocketNewItemsNotice borderBottomRadius={ 0 } url={ txsUrl } num={ num } alert={ socketAlert } isLoading={ isPlaceholderData } type="update"/>
        <Box mb={ 3 } display={{ base: 'block', lg: 'none' }}>
          { data.slice(0, updatesCount).map(((update, index) => (
            <LatestTxsItemMobile
              key={ update.hash + (isPlaceholderData ? index : '') }
              tx={ update }
              isLoading={ isPlaceholderData }
            />
          ))) }
        </Box>
        <AddressHighlightProvider>
          <Box mb={ 4 } display={{ base: 'none', lg: 'block' }}>
            { data.slice(0, updatesCount).map(((update, index) => (
              <LatestUpdatesItem
                key={ update.hash + (isPlaceholderData ? index : '') }
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
