import React from 'react';

import TestnetWarning from 'ui/shared/alerts/TestnetWarning';
// import DataFetchAlert from 'ui/shared/DataFetchAlert';

import { BLOCK_DETAIL } from '../../stubs/update';
import UpdateInfo from './details/UpdateInfo';
import type { UpdateQuery } from './useUpdateQuery';

interface Props {
  updateQuery: UpdateQuery;
}

const UpdateDetails = ({ updateQuery }: Props) => {
  let data;
  if (updateQuery.isError) {
    data = BLOCK_DETAIL;
    // return <DataFetchAlert/>;
  } else {
    data = updateQuery.data;
    data = BLOCK_DETAIL;
  }

  return (
    <>
      <TestnetWarning mb={ 6 } isLoading={ false }/>
      <UpdateInfo data={ data } isLoading={ false } socketStatus={ updateQuery.socketStatus }/>
    </>
  );
};

export default React.memo(UpdateDetails);
