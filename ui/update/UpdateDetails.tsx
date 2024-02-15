import React from 'react';

import TestnetWarning from 'ui/shared/alerts/TestnetWarning';
import DataFetchAlert from 'ui/shared/DataFetchAlert';

import UpdateInfo from './details/UpdateInfo';
import type { UpdateQuery } from './useUpdateQuery';

interface Props {
  updateQuery: UpdateQuery;
}

const UpdateDetails = ({ updateQuery }: Props) => {
  if (updateQuery.isError) {
    return <DataFetchAlert/>;
  }

  return (
    <>
      <TestnetWarning mb={ 6 } isLoading={ updateQuery.isPlaceholderData }/>
      <UpdateInfo data={ updateQuery.data } isLoading={ updateQuery.isPlaceholderData } socketStatus={ updateQuery.socketStatus }/>
    </>
  );
};

export default React.memo(UpdateDetails);
