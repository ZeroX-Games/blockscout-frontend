import { Text } from '@chakra-ui/react';
import React from 'react';

import DataFetchAlert from 'ui/shared/DataFetchAlert';
import TxPendingAlert from 'ui/tx/TxPendingAlert';
import TxSocketAlert from 'ui/tx/TxSocketAlert';

import useApiQuery from '../../../lib/api/useApiQuery';
import { TX_ZEROX_TRANSACTION } from '../../../stubs/zeroxTx';
import type { TxQuery } from '../useTxQuery';
import TxZeroxDetails from './TxZeroxDetails';

interface Props {
  txQuery: TxQuery;
}

const TxZeroX = ({ txQuery }: Props) => {
  const { data, isPlaceholderData, isError } = useApiQuery('tx_zerox_type', {
    pathParams: { hash: txQuery.data?.hash.toString(), zeroxType: txQuery.data?.zxTxType.toString() },
    queryOptions: {
      enabled: !txQuery.isPlaceholderData && Boolean(txQuery.data?.zxTxType && txQuery.data?.hash),
      placeholderData: TX_ZEROX_TRANSACTION,
    },
  });

  if (!txQuery.isPending && !txQuery.isPlaceholderData && !txQuery.isError && !txQuery.data.status) {
    return txQuery.socketStatus ? <TxSocketAlert status={ txQuery.socketStatus }/> : <TxPendingAlert/>;
  }

  if (txQuery.isError || isError) {
    return <DataFetchAlert/>;
  }

  if (txQuery.data?.zxTxType === 0 && !isPlaceholderData) {
    return <Text>No ZeroX Transaction found.</Text>;
  }

  return data ? (
    <TxZeroxDetails zeroxTxData={ data } isPlaceholderData={ isPlaceholderData }/>
  ) : null;
};

export default TxZeroX;
