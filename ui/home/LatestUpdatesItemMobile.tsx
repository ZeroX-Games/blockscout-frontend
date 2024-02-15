import {
  Box,
  Flex,
  HStack,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';

import type { Update } from '../../types/api/update';

import config from 'configs/app';
import getValueWithUnit from 'lib/getValueWithUnit';
import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import { currencyUnits } from 'lib/units';
import AddressFromTo from 'ui/shared/address/AddressFromTo';
import TxStatus from 'ui/shared/statusTag/TxStatus';
import TxFeeStability from 'ui/shared/tx/TxFeeStability';
import TxAdditionalInfo from 'ui/txs/TxAdditionalInfo';
import TxType from 'ui/txs/TxType';

import UpdateEntity from '../shared/entities/update/UpdateEntity';

type Props = {
  update: Update;
  isLoading?: boolean;
}

const LatestUpdatesItemMobile = ({ update, isLoading }: Props) => {
  const dataTo = update.to ? update.to : update.created_contract;
  const timeAgo = useTimeAgoIncrement(update.timestamp || '0', true);

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
          <TxType types={ update.tx_types } isLoading={ isLoading }/>
          <TxStatus status={ update.status } errorText={ update.status === 'error' ? update.result : undefined } isLoading={ isLoading }/>
          { /*<TxWatchListTags tx={ update } isLoading={ isLoading }/>*/ }
        </HStack>
        <TxAdditionalInfo tx={ update } isMobile isLoading={ isLoading }/>
      </Flex>
      <Flex
        mt={ 2 }
        alignItems="center"
        width="100%"
        justifyContent="space-between"
        mb={ 6 }
      >
        <UpdateEntity
          isLoading={ isLoading }
          hash={ update.eventHash }
          fontWeight="700"
          truncation="constant"
        />
        { update.timestamp && (
          <Skeleton isLoaded={ !isLoading } color="text_secondary" fontWeight="400" fontSize="sm" ml={ 3 }>
            <span>{ timeAgo }</span>
          </Skeleton>
        ) }
      </Flex>
      <AddressFromTo
        from={ update.from }
        to={ dataTo }
        isLoading={ isLoading }
        fontSize="sm"
        fontWeight="500"
        mb={ 3 }
      />
      { !config.UI.views.tx.hiddenFields?.value && (
        <Skeleton isLoaded={ !isLoading } mb={ 2 } fontSize="sm" w="fit-content">
          <Text as="span">Value { currencyUnits.ether } </Text>
          <Text as="span" variant="secondary">{ getValueWithUnit(update.value).dp(5).toFormat() }</Text>
        </Skeleton>
      ) }
      { !config.UI.views.tx.hiddenFields?.tx_fee && (
        <Skeleton isLoaded={ !isLoading } fontSize="sm" w="fit-content" display="flex" whiteSpace="pre">
          <Text as="span">Fee { !config.UI.views.tx.hiddenFields?.fee_currency ? `${ currencyUnits.ether } ` : '' }</Text>
          { update.stability_fee ? (
            <TxFeeStability data={ update.stability_fee } accuracy={ 5 } color="text_secondary" hideUsd/>
          ) : (
            <Text as="span" variant="secondary">{ update.fee.value ? getValueWithUnit(update.fee.value).dp(5).toFormat() : '-' }</Text>
          ) }
        </Skeleton>
      ) }
    </Box>
  );
};

export default React.memo(LatestUpdatesItemMobile);
