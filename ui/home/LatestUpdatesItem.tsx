import {
  Box,
  Flex,
  HStack,
  Text,
  Grid,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';

import type { Update } from 'types/api/update';

import config from 'configs/app';
import getValueWithUnit from 'lib/getValueWithUnit';
import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import { currencyUnits } from 'lib/units';
import DomainFromTo from 'ui/shared/domain/DomainFromTo';
import UpdateEntity from 'ui/shared/entities/update/UpdateEntity';
import TxStatus from 'ui/shared/statusTag/TxStatus';
import TxFeeStability from 'ui/shared/tx/TxFeeStability';
import TxAdditionalInfo from 'ui/txs/TxAdditionalInfo';
import UpdatePath from 'ui/update/UpdatePath';

type Props = {
  update: Update;
  isLoading?: boolean;
}

const LatestUpdatesItem = ({ update, isLoading }: Props) => {
  const timeAgo = useTimeAgoIncrement(update.timestamp || '0', true);
  const columnNum = config.UI.views.tx.hiddenFields?.value && config.UI.views.tx.hiddenFields?.tx_fee ? 2 : 3;

  return (
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
        <TxAdditionalInfo tx={ update } isLoading={ isLoading } my="3px"/>
        <Box ml={ 3 } w="calc(100% - 40px)">
          <HStack flexWrap="wrap" my="3px">
            { /*<TxType types={ tx.tx_types } isLoading={ isLoading }/>*/ }
            <TxStatus status={ update.status } errorText={ update.status === 'error' ? update.result : undefined } isLoading={ isLoading }/>
            <UpdatePath isLoading={ isLoading }/>
            { /*<TxWatchListTags tx={ update } isLoading={ isLoading }/>*/ }
          </HStack>
          <Flex
            alignItems="center"
            mt="7px"
            mb="3px"
          >
            <UpdateEntity
              isLoading={ isLoading }
              hash={ update.eventHash }
              fontWeight="700"
            />
            { update.timestamp && (
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
        from={ update.from }
        to={ update.to }
        isLoading={ isLoading }
        mode="compact"
      />
      <Flex flexDir="column">
        { !config.UI.views.tx.hiddenFields?.value && (
          <Skeleton isLoaded={ !isLoading } my="3px">
            <Text as="span" whiteSpace="pre">{ currencyUnits.ether } </Text>
            <Text as="span" variant="secondary">{ getValueWithUnit(update.value).dp(5).toFormat() }</Text>
          </Skeleton>
        ) }
        { !config.UI.views.tx.hiddenFields?.tx_fee && (
          <Skeleton isLoaded={ !isLoading } display="flex" whiteSpace="pre" my="3px">
            <Text as="span">Fee </Text>
            { update.stability_fee ? (
              <TxFeeStability data={ update.stability_fee } accuracy={ 5 } color="text_secondary" hideUsd/>
            ) : (
              <Text as="span" variant="secondary">{ update.fee.value ? getValueWithUnit(update.fee.value).dp(5).toFormat() : '-' }</Text>
            ) }
          </Skeleton>
        ) }
      </Flex>
    </Grid>
  );
};

export default React.memo(LatestUpdatesItem);
