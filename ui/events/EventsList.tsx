import { Box } from '@chakra-ui/react';
import React from 'react';

import type { EventSummaryResult } from 'types/api/update';

import useLazyRenderedList from 'lib/hooks/useLazyRenderedList';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';

import EventsListItem from './EventsListItem';

interface Props {
  showBlockInfo: boolean;
  showSocketInfo?: boolean;
  socketInfoAlert?: string;
  enableTimeIncrement?: boolean;
  currentAddress?: string;
  isLoading: boolean;
  items: Array<EventSummaryResult>;
}

const EventsList = (props: Props) => {
  const { cutRef, renderedItemsNum } = useLazyRenderedList(props.items, !props.isLoading);

  return (
    <Box>
      { props.showSocketInfo && (
        <SocketNewItemsNotice.Mobile
          url={ window.location.href }
          alert={ props.socketInfoAlert }
          isLoading={ props.isLoading }
        />
      ) }
      { props.items.slice(0, renderedItemsNum).map((event, index) => (
        <EventsListItem
          key={ String(event.block_number) + (props.isLoading ? index : '') }
          event={ event }
          enableTimeIncrement={ props.enableTimeIncrement }
          isLoading={ props.isLoading }
        />
      )) }
      <Box ref={ cutRef } h={ 0 }/>
    </Box>
  );
};

export default React.memo(EventsList);
