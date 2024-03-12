import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { EventSummaryResult } from 'types/api/update';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import useLazyRenderedList from 'lib/hooks/useLazyRenderedList';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';
import TheadSticky from 'ui/shared/TheadSticky';

import EventsTableItem from './EventsTableItem';

type Props = {
  eventResults: Array<EventSummaryResult>;
  top: number;
  showSocketInfo: boolean;
  socketInfoAlert?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
}

const EventsTable = ({
  eventResults,
  top,
  showSocketInfo,
  socketInfoAlert,
  enableTimeIncrement,
  isLoading,
}: Props) => {
  const { cutRef, renderedItemsNum } = useLazyRenderedList(eventResults, !isLoading);

  return (
    <AddressHighlightProvider>
      <Table variant="simple" minWidth="950px" size="xs">
        <TheadSticky top={ top }>
          <Tr>
            <Th width="54px"></Th>
            <Th width="80px">Block ID</Th>
            <Th width="33%">Event Hash</Th>
            <Th width="120px">Type</Th>
            <Th width="120px">Network</Th>
            <Th width={{ base: '164px', xl: '340px' }}>From/To</Th>
            <Th width="15%" isNumeric >Fees</Th>
            <Th width="20%" isNumeric ># of Updates</Th>
            <Th width="20%" isNumeric pr={ 5 }># of Tokens</Th>
          </Tr>
        </TheadSticky>
        <Tbody>
          { showSocketInfo && (
            <SocketNewItemsNotice.Desktop
              url={ window.location.href }
              alert={ socketInfoAlert }
              isLoading={ isLoading }
            />
          ) }
          <AnimatePresence initial={ false }>
            { eventResults.slice(0, renderedItemsNum).map((item, index) => (
              <EventsTableItem
                key={ String(item.block_number) + (isLoading ? index : '') }
                event={ item }
                enableTimeIncrement={ enableTimeIncrement }
                isLoading={ isLoading }
              />
            )) }
          </AnimatePresence>
        </Tbody>
      </Table>
      <div ref={ cutRef }/>
    </AddressHighlightProvider>
  );
};

export default React.memo(EventsTable);
