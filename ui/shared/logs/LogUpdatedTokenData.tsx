import React from 'react';

import LogUpdatedTokenDataTable from './LogUpdatedTokenDataTable';
interface Props {
  data: any;
  isLoading?: boolean;
}

const LogUpdatedTokenData = ({ data, isLoading }: Props) => {
  return (
    <LogUpdatedTokenDataTable data={ data } isLoading={ isLoading }/>
  );
};

export default React.memo(LogUpdatedTokenData);
