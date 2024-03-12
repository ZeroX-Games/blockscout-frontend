import {
  Box,
  Flex,
  HStack,
  Text,
  Grid,
  Skeleton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import type { CollectionParam } from 'types/api/collectionParams';
import type { EventSummaryResult } from 'types/api/update';

import config from 'configs/app';
// import getValueWithUnit from 'lib/getValueWithUnit';
import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import { currencyUnits } from 'lib/units';
import EventAdditionalInfo from 'ui/event/EventAdditionalInfo';
import EventPath from 'ui/event/EventPath';
import DomainFromTo from 'ui/shared/domain/DomainFromTo';
import EventHashEntity from 'ui/shared/entities/event/EventHashEntity';
import EventStatus from 'ui/shared/statusTag/EventStatus';

type Props = {
  event: EventSummaryResult;
  isLoading?: boolean;
  collectionAddr: string;
}

const LatestEventsItem = ({ event, isLoading, collectionAddr }: Props) => {
  const timeAgo = useTimeAgoIncrement(event.timestamp || '0', true);
  const columnNum = config.UI.views.tx.hiddenFields?.value && config.UI.views.tx.hiddenFields?.tx_fee ? 2 : 3;
  const to: CollectionParam = {
    collectionId: collectionAddr,
    name: 'GTA V',
  };
  return (
    <Box
      as={ motion.div }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ display: 'none' }}
      transitionDuration="normal"
      transitionTimingFunction="linear">
      <Grid
        gridTemplateColumns={{
          lg: columnNum === 2 ? '3fr minmax(auto, 180px)' : '3fr minmax(auto, 180px) 150px',
          xl: columnNum === 2 ? '3fr minmax(auto, 250px)' : '3fr minmax(auto, 275px) 150px',
        }}
        gridGap={ 8 }
        width="100%"
        minW="700px"
        borderTop="1px solid"
        borderColor="divider"
        p={ 4 }
        _last={{ borderBottom: '1px solid', borderColor: 'divider' }}
        display={{ base: 'none', lg: 'grid' }}
      >
        <Flex overflow="hidden" w="100%">
          <EventAdditionalInfo event={ event } isLoading={ isLoading } my="3px"/>
          <Box ml={ 3 } w="calc(100% - 40px)">
            <HStack flexWrap="wrap" my="3px">
              { /*<TxType types={ tx.tx_types } isLoading={ isLoading }/>*/ }
              <EventStatus status="ok" isLoading={ isLoading }/>
              <EventPath blockId={ event.block_number } isLoading={ isLoading }/>
              { /*<TxWatchListTags tx={ update } isLoading={ isLoading }/>*/ }
            </HStack>
            <Flex
              alignItems="center"
              mt="7px"
              mb="3px"
            >
              <EventHashEntity
                isLoading={ isLoading }
                number={ event.block_number }
                hash={ event.eventHash }
                mr="auto"
                fontWeight="700"
              />
              { event.timestamp && (
                <Skeleton
                  isLoaded={ !isLoading }
                  color="text_secondary"
                  fontWeight="400"
                  fontSize="sm"
                  flexShrink={ 0 }
                  ml={ 2 }
                >
                  <span>{ timeAgo }</span>
                </Skeleton>
              ) }
            </Flex>
          </Box>
        </Flex>
        <DomainFromTo
          from={ event.domain_details }
          to={ to }
          isLoading={ isLoading }
          mode="compact"
        />
        <Flex flexDir="column">
          { !config.UI.views.tx.hiddenFields?.value && (
            <Skeleton isLoaded={ !isLoading } my="3px">
              <Text as="span" whiteSpace="pre">{ currencyUnits.ether } </Text>
              { /*<Text as="span" variant="secondary">{ getValueWithUnit(event.fee).dp(5).toFormat() }</Text>*/ }
            </Skeleton>
          ) }
          { !config.UI.views.tx.hiddenFields?.tx_fee && (
            <Skeleton isLoaded={ !isLoading } display="flex" whiteSpace="pre" my="3px">
              <Text as="span">Fee </Text>
              { /*<Text as="span" variant="secondary">{ event.fee ? getValueWithUnit(event.fee).dp(5).toFormat() : '-' }</Text>*/ }
            </Skeleton>
          ) }
        </Flex>
      </Grid>
    </Box>
  );
};

export default React.memo(LatestEventsItem);
