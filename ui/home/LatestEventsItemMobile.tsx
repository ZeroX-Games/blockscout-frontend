import {
  Box,
  Flex,
  HStack,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';

import type { CollectionParam } from '../../types/api/collectionParams';
import type { EventSummaryResult } from 'types/api/update';

import config from 'configs/app';
import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import { currencyUnits } from 'lib/units';
import DomainFromTo from 'ui/shared/domain/DomainFromTo';
import EventEntity from 'ui/shared/entities/event/EventEntity';
import TxStatus from 'ui/shared/statusTag/TxStatus';
import TxAdditionalInfo from 'ui/txs/TxAdditionalInfo';

type Props = {
  event: EventSummaryResult;
  isLoading?: boolean;
  collectionAddr: string;
}

const LatestEventsItemMobile = ({ event, isLoading, collectionAddr }: Props) => {
  const timeAgo = useTimeAgoIncrement(event.timestamp || '0', true);
  const to: CollectionParam = {
    collectionId: collectionAddr,
    name: 'GTA V',
  };
  return (
    <Box
      width="100%"
      borderTop="1px solid"
      borderColor="divider"
      py={ 4 }
      _last={{ borderBottom: '1px solid', borderColor: 'divider' }}
      display={{ base: 'block', lg: 'none' }}
    >
      <Flex justifyContent="space-between">
        <HStack flexWrap="wrap">
          <TxStatus status="ok" errorText="unexpected error" isLoading={ isLoading }/>
          { /*<TxWatchListTags tx={ event } isLoading={ isLoading }/>*/ }
        </HStack>
        <TxAdditionalInfo tx={ event } isMobile isLoading={ isLoading }/>
      </Flex>
      <Flex
        mt={ 2 }
        alignItems="center"
        width="100%"
        justifyContent="space-between"
        mb={ 6 }
      >
        <EventEntity
          isLoading={ isLoading }
          hash={ event.eventHash }
          fontWeight="700"
          truncation="constant"
        />
        { event.timestamp && (
          <Skeleton isLoaded={ !isLoading } color="text_secondary" fontWeight="400" fontSize="sm" ml={ 3 }>
            <span>{ timeAgo }</span>
          </Skeleton>
        ) }
      </Flex>
      <DomainFromTo
        from={ event.domain_details }
        to={ to }
        isLoading={ isLoading }
        fontSize="sm"
        fontWeight="500"
        mb={ 3 }
      />
      { !config.UI.views.tx.hiddenFields?.value && (
        <Skeleton isLoaded={ !isLoading } mb={ 2 } fontSize="sm" w="fit-content">
          <Text as="span">Value { currencyUnits.ether } </Text>
          { /*<Text as="span" variant="secondary">{ getValueWithUnit(event.fee).dp(5).toFormat() }</Text>*/ }
        </Skeleton>
      ) }
      { !config.UI.views.tx.hiddenFields?.tx_fee && (
        <Skeleton isLoaded={ !isLoading } fontSize="sm" w="fit-content" display="flex" whiteSpace="pre">
          <Text as="span">Fee { !config.UI.views.tx.hiddenFields?.fee_currency ? `${ currencyUnits.ether } ` : '' }</Text>
          { /*<Text as="span" variant="secondary">{ event.fee ? getValueWithUnit(event.fee).dp(5).toFormat() : '-' }</Text>*/ }
        </Skeleton>
      ) }
    </Box>
  );
};

export default React.memo(LatestEventsItemMobile);
