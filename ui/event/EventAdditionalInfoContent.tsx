import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

import type { EventSummaryResult } from 'types/api/update';

import { route } from 'nextjs-routes';

import LinkInternal from 'ui/shared/LinkInternal';

const EventAdditionalInfoContent = ({ event }: { event: EventSummaryResult }) => {
  const sectionProps = {
    borderBottom: '1px solid',
    borderColor: 'divider',
    paddingBottom: 4,
  };

  const sectionTitleProps = {
    color: 'gray.500',
    fontWeight: 600,
    marginBottom: 3,
    fontSize: 'sm',
  };

  return (
    <>
      <Heading as="h4" size="sm" mb={ 6 }>Additional info </Heading>
      <Box { ...sectionProps } mb={ 4 }>
        <Text { ...sectionTitleProps }>Domain detail</Text>
        <Box>
          <Text as="span" fontWeight="500">Name: </Text>
          <Text fontWeight="600" as="span">{ event.domain_details.name }</Text>
        </Box>
        <Box mt={ 1 }>
          <Text as="span" fontWeight="500">Id: </Text>
          <Text fontWeight="600" as="span">{ event.domain_details.domainId }</Text>
        </Box>
        <Box mt={ 1 }>
          <Text as="span" fontWeight="500">Description: </Text>
          <Text fontWeight="600" as="span">{ event.domain_details.description }</Text>
        </Box>
      </Box>
      <Box { ...sectionProps } mb={ 4 }>
        <Text { ...sectionTitleProps }># of updates</Text>
        <Box>
          <Text fontWeight="600" as="span">{ event.numberOfUpdates }</Text>
        </Box>
      </Box>
      <Box { ...sectionProps } mb={ 4 }>
        <Text { ...sectionTitleProps }>Created at</Text>
        <Box>
          <Text fontWeight="600" as="span">{ new Date(event.timestamp).toUTCString() }</Text>
        </Box>
      </Box>
      <LinkInternal fontSize="sm" href={ route({ pathname: '/event/[event_id]', query: { event_id: String(event.block_number) } }) }>More details</LinkInternal>
    </>
  );
};

export default React.memo(EventAdditionalInfoContent);
