import React from 'react';

import type { TxZeroXTransaction } from '../../../types/api/txZeroxTransaction';

import TestnetWarning from 'ui/shared/alerts/TestnetWarning';

import TxZeroxInfo from '../details/TxZeroxInfo';

interface Props {
  zeroxTxData: TxZeroXTransaction;
  isPlaceholderData: boolean;
}

const TxZeroxDetails = ({ zeroxTxData, isPlaceholderData }: Props) => {
  return (
    <>
      <TestnetWarning mb={ 6 } isLoading={ isPlaceholderData }/>
      <TxZeroxInfo data={ zeroxTxData } isLoading={ isPlaceholderData }/>
    </>
  );
};

export default React.memo(TxZeroxDetails);
