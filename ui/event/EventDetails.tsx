import React from 'react';

import { BLOCK_DETAIL } from 'stubs/update';
import TestnetWarning from 'ui/shared/alerts/TestnetWarning';
// import DataFetchAlert from 'ui/shared/DataFetchAlert';

import EventInfo from './details/EventInfo';
import type { EventQuery } from './useEventQuery';

interface Props {
  eventQuery: EventQuery;
}

const EventDetails = ({ eventQuery }: Props) => {
  let data;
  if (eventQuery.isError) {
    data = BLOCK_DETAIL;
    // return <DataFetchAlert/>;
  } else {
    data = eventQuery.data;
  }

  return (
    <>
      <TestnetWarning mb={ 6 } isLoading={ false }/>
      <EventInfo data={ data } isLoading={ false } eventQuery={ eventQuery }/>
    </>
  );
};

export default React.memo(EventDetails);
