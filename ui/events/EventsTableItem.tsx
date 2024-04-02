import {
  Tr,
  Td,
  VStack,
  Skeleton, HStack, Box,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import type { CollectionParam } from '../../types/api/collectionParams';
import type { EventSummaryResult } from '../../types/api/update';

import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import ApplicationFromTo from 'ui/shared/application/ApplicationFromTo';
import EventEntity from 'ui/shared/entities/event/EventEntity';
import EventHashEntity from 'ui/shared/entities/event/EventHashEntity';
import IconSvg from 'ui/shared/IconSvg';
import EventStatus from 'ui/shared/statusTag/EventStatus';
import TxAdditionalInfo from 'ui/txs/TxAdditionalInfo';

type Props = {
  event: EventSummaryResult;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
}

const EventsTableItem = ({ event, enableTimeIncrement, isLoading }: Props) => {
  const to = event.collectionsAddrs[0];
  const dataTo: CollectionParam = {
    collectionId: to,
    name: 'GTA V',
  };
  const timeAgo = useTimeAgoIncrement(event.timestamp, enableTimeIncrement);

  return (
    <Tr
      as={ motion.tr }
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      key={ event.block_number }
    >
      <Td pl={ 4 }>
        <TxAdditionalInfo tx={ event } isLoading={ isLoading }/>
      </Td>
      <Td >
        <VStack alignItems="start" lineHeight="24px">
          <EventEntity
            number={ event.block_number }
            isLoading={ isLoading }
            fontWeight={ 700 }
            noIcon
            maxW="100%"
          />
          { event.timestamp && <Skeleton color="text_secondary" fontWeight="400" isLoaded={ !isLoading }><span>{ timeAgo }</span></Skeleton> }
        </VStack>
      </Td>
      <Td pr={ 4 }>
        <VStack alignItems="start" lineHeight="24px">
          <EventHashEntity
            hash={ event.eventHash }
            number={ event.block_number }
            isLoading={ isLoading }
            fontWeight={ 700 }
            noIcon
            maxW="100%"
          />
        </VStack>
      </Td>
      <Td>
        <VStack alignItems="start" lineHeight="24px">
          <EventStatus status="ok" isLoading={ isLoading }/>
        </VStack>
      </Td>
      <Td>
        <VStack alignItems="start" lineHeight="24px">
          <HStack gap={ 2 }>
            <IconSvg
              name="networks/arbitrum"
              isLoading={ isLoading }
              boxSize={ 5 }
            />
            <Skeleton isLoaded={ !isLoading }>
              <Box>BASE</Box>
            </Skeleton>
          </HStack>
          { /*<EventType types={ event.tx_types } isLoading={ isLoading }/>*/ }
          { /*<TxStatus status={ event.status } errorText={ event.status === 'error' ? event.result : undefined } isLoading={ isLoading }/>*/ }
          { /*<TxWatchListTags tx={ event } isLoading={ isLoading }/>*/ }
        </VStack>
      </Td>
      { /*<Td whiteSpace="nowrap">*/ }
      { /*  { event.method && (*/ }
      { /*    <Tag colorScheme={ event.method === 'Multicall' ? 'teal' : 'gray' } isLoading={ isLoading } isTruncated>*/ }
      { /*      { event.method }*/ }
      { /*    </Tag>*/ }
      { /*  ) }*/ }
      { /*</Td>*/ }
      <Td>
        <ApplicationFromTo
          from={ event.application_details }
          to={ dataTo }
          isLoading={ isLoading }
          mt="2px"
          mode={{ lg: 'compact', xl: 'long' }}
        />
      </Td>
      <Td isNumeric>123</Td>
      <Td isNumeric>{ event.numberOfUpdates }</Td>
      <Td isNumeric pr={ 4 }>{ event.numberOfTokens }</Td>
    </Tr>
  );
};

export default React.memo(EventsTableItem);
