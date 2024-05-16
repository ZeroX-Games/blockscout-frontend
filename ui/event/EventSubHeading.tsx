import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import type { EventDetail } from 'types/api/event';

import EventInterpretation from 'ui/event/interpretation/EventInterpretation';

type Props = {
  eventDetail: EventDetail;
  isLoading?: boolean;
}

const EventSubHeading = ({ eventDetail, isLoading }: Props) => {
  return (
    <Box display={{ base: 'block', lg: 'flex' }} alignItems="center" w="100%" mb={ 4 }>
      <Flex mr={{ base: 0, lg: 6 }} flexWrap="wrap" alignItems="center">
        <EventInterpretation
          eventDetail={ eventDetail }
          isLoading={ isLoading } // TODO: loading state
          fontSize="lg"
        />
        { /*{ !txInterpretationQuery.isPlaceholderData && txInterpretationQuery.data?.data.summaries &&
          txInterpretationQuery.data?.data.summaries.length > 1 &&*/ }
        { /*  <Link ml={ 3 } href={ `#${ TX_ACTIONS_BLOCK_ID }` }>all actions</Link> }*/ }
      </Flex>
      { /*{ !hasInterpretation && <TxEntity hash={ hash } noLink noCopy={ false } fontWeight={ 500 } mr={{ base: 0, lg: 2 }} fontFamily="heading"/> }*/ }
    </Box>
  );
};

export default EventSubHeading;
