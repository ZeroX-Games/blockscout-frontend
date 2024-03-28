import React from 'react';

import type { MatrixUpdate } from 'types/api/event';

import LogUpdatedTokenDataTable from './LogUpdatedTokenDataTable';
interface Props {
  data: Array<MatrixUpdate>;
  isLoading?: boolean;
}

const LogUpdatedTokenData = ({ data, isLoading }: Props) => {
  return (
    <LogUpdatedTokenDataTable data={ data } isLoading={ isLoading }/>
  );
};

export default React.memo(LogUpdatedTokenData);
