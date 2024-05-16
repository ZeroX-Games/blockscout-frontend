import {
  HStack,
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';

import type { CollectionParam } from '../../types/api/collectionParams';
import type { EventSummaryResult } from '../../types/api/update';

import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import ListItemMobile from 'ui/shared/ListItemMobile/ListItemMobile';

import DomainFromTo from '../shared/domain/DomainFromTo';

type Props = {
  event: EventSummaryResult;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
}

const EventsListItem = ({ event, isLoading, enableTimeIncrement }: Props) => {
  const to = event.collectionsAddrs[0];
  const dataTo: CollectionParam = {
    collectionId: to,
    name: 'NFT Fighter',
  };

  const timeAgo = useTimeAgoIncrement(event.timestamp, enableTimeIncrement);

  return (
    <ListItemMobile display="block" width="100%" isAnimated key={ event.block_number }>
      <Flex justifyContent="space-between" mt={ 4 }>
        <HStack flexWrap="wrap">
          { /*<TxType types={ event.tx_types } isLoading={ isLoading }/>*/ }
          { /*<TxStatus status={ event.status } errorText={ event.status === 'error' ? event.result : undefined } isLoading={ isLoading }/>*/ }
          { /*<TxWatchListTags tx={ tx } isLoading={ isLoading }/>*/ }
        </HStack>
        { /*<TxAdditionalInfo tx={ tx } isMobile isLoading={ isLoading }/>*/ }
      </Flex>
      <Flex justifyContent="space-between" lineHeight="24px" mt={ 3 } alignItems="center">
        <TxEntity
          isLoading={ isLoading }
          hash={ event.block_number }
          truncation="constant"
          fontWeight="700"
        />
        { event.timestamp && (
          <Skeleton isLoaded={ !isLoading } color="text_secondary" fontWeight="400" fontSize="sm">
            <span>{ timeAgo }</span>
          </Skeleton>
        ) }
      </Flex>
      { /*{ event.method && (*/ }
      { /*  <Flex mt={ 3 }>*/ }
      { /*    <Skeleton isLoaded={ !isLoading } display="inline-block" whiteSpace="pre">Method </Skeleton>*/ }
      { /*    <Skeleton*/ }
      { /*      isLoaded={ !isLoading }*/ }
      { /*      color="text_secondary"*/ }
      { /*      overflow="hidden"*/ }
      { /*      whiteSpace="nowrap"*/ }
      { /*      textOverflow="ellipsis"*/ }
      { /*    >*/ }
      { /*      <span>{ event.method }</span>*/ }
      { /*    </Skeleton>*/ }
      { /*  </Flex>*/ }
      { /*) }*/ }
      { /*{ showBlockInfo && event.block !== null && (*/ }
      { /*  <Flex mt={ 2 }>*/ }
      { /*    <Skeleton isLoaded={ !isLoading } display="inline-block" whiteSpace="pre">Block </Skeleton>*/ }
      { /*    <BlockEntity*/ }
      { /*      isLoading={ isLoading }*/ }
      { /*      number={ event.block }*/ }
      { /*      noIcon*/ }
      { /*    />*/ }
      { /*  </Flex>*/ }
      { /*) }*/ }
      <DomainFromTo
        from={ event.domain_details }
        to={ dataTo }
        isLoading={ isLoading }
        mt="2px"
        mode={{ lg: 'compact', xl: 'long' }}
      />
    </ListItemMobile>
  );
};

export default React.memo(EventsListItem);
