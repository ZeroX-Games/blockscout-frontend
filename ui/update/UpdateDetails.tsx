import React from 'react';

import TestnetWarning from 'ui/shared/alerts/TestnetWarning';
// import DataFetchAlert from 'ui/shared/DataFetchAlert';

import { UPDATE } from '../../stubs/update';
import UpdateInfo from './details/UpdateInfo';
import type { UpdateQuery } from './useUpdateQuery';

interface Props {
  updateQuery: UpdateQuery;
}

const UpdateDetails = ({ updateQuery }: Props) => {
  let data;
  if (updateQuery.isError) {
    data = UPDATE;
    // return <DataFetchAlert/>;
  } else {
    data = updateQuery.data;
  }

  return (
    <>
      <TestnetWarning mb={ 6 } isLoading={ updateQuery.isPlaceholderData }/>
      <UpdateInfo data={ data } isLoading={ updateQuery.isPlaceholderData } socketStatus={ updateQuery.socketStatus }/>
    </>
  );
};

export default React.memo(UpdateDetails);
