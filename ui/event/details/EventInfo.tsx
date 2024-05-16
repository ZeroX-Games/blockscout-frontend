import {
  Grid,
  GridItem,
  Text,
  Link,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
// import BigNumber from 'bignumber.js';
import React from 'react';
import { scroller, Element } from 'react-scroll';

import type { EventDetail } from 'types/api/event';

// import { route } from 'nextjs-routes';

import Tag from 'ui/shared/chakra/Tag';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import DetailsCollections from 'ui/shared/DetailsCollections';
import DetailsFee from 'ui/shared/DetailsFee';
import DetailsInfoItemDivider from 'ui/shared/DetailsInfoItemDivider';
import EventEntity from 'ui/shared/entities/event/EventEntity';
import NetworkEntity from 'ui/shared/entities/network/NetworkEntity';
import EventDetailsInfoItem from 'ui/shared/EventDetailsInfoItem';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import TxStatus from 'ui/shared/statusTag/TxStatus';
import UpdateStatus from 'ui/shared/statusTag/UpdateStatus';

interface Props {
  data: EventDetail | undefined;
  isLoading: boolean;
}

const EventInfo = ({ data, isLoading }: Props) => {
  const [ isExpanded, setIsExpanded ] = React.useState(false);

  const handleCutClick = React.useCallback(() => {
    setIsExpanded((flag) => !flag);
    scroller.scrollTo('TxInfo__cutLink', {
      duration: 500,
      smooth: true,
    });
  }, []);

  if (!data) {
    return null;
  }

  const network = { name: 'Arbitrum', hash: '0x881D40237659C251811CEC9c364ef91dC08D300C' };
  // const updates = { attributes: [ 'Rp', 'Mp', 'Speed', 'Exposure', 'Hp', 'Decoration', 'Rp1', 'Mp1', 'Speed1', 'Exposure1', 'Hp1', 'Decoration1' ],
  //   values: [ [ 'Azuki #7352', 10, 0, 1, 20, 1, 0, 10, 0, 1, 20, 1, 0 ],
  //     [ 'Azuki #2314', 0, 0, 5, 0, 0, 10, 0, 0, 5, 0, 0, 10 ],
  //     [ 'Azuki #6381', -30, 0, 0, -8, 0, 0, -30, 0, 0, -8, 0, 0 ] ],
  // };
  return (
    <Grid columnGap={ 12 } rowGap={{ base: 3, lg: 3 }} templateColumns={{ base: 'minmax(0, 1fr)', lg: 'max-content minmax(728px, auto)' }}>
      <EventDetailsInfoItem
        title="Event hash"
        hint="Unique character string (TxID) assigned to every verified transaction"
        flexWrap="nowrap"
        isLoading={ isLoading }
      >
        { data.status === null && <Spinner mr={ 2 } size="sm" flexShrink={ 0 }/> }
        <Skeleton isLoaded={ !isLoading } overflow="hidden">
          <HashStringShortenDynamic hash={ data.eventHash } fontSize="xl"/>
        </Skeleton>
        <CopyToClipboard text={ data.eventHash } isLoading={ isLoading }/>
      </EventDetailsInfoItem>
      <EventDetailsInfoItem
        title="Event status"
        hint="Current event state: Success, Failed (Error), or Pending (In Process)"
        isLoading={ isLoading }
      >
        <UpdateStatus status="ok" errorText="error" isLoading={ isLoading }/>
        { /*{ data.method && (*/ }
        { /*  <Tag colorScheme="gray" isLoading={ isLoading } isTruncated ml={ 3 }>*/ }
        { /*    <Tag colorScheme={ data.method === 'Multicall' ? 'teal' : 'gray' } isLoading={ isLoading } isTruncated ml={ 3 }>*/ }
        { /*    { data.method }*/ }
        { /*  </Tag>*/ }
        { /*) }*/ }
      </EventDetailsInfoItem>
      <EventDetailsInfoItem
        title="Event"
        hint="Event number"
        isLoading={ isLoading }
      >
        { data.block_number === null ?
          <Text>Pending</Text> : (
            <EventEntity
              isLoading={ isLoading }
              number={ data.block_number }
              fontSize="xl"
              noIcon
            />
          ) }
      </EventDetailsInfoItem>
      <EventDetailsInfoItem
        title="Updated Collections"
        isLoading={ isLoading }
        hint="The updated tokens belong to which collections">
        <DetailsCollections collections={ [ 'Meebits', 'DOGE' ] } isLoading={ isLoading }/>
      </EventDetailsInfoItem>
      <EventDetailsInfoItem
        title="Fee"
        hint="Fees paid for the transaction"
        isLoading={ isLoading }
      >
        <DetailsFee fee={ 0.0021 } isLoading={ isLoading }/>
      </EventDetailsInfoItem>
      <DetailsInfoItemDivider/>
      <EventDetailsInfoItem
        title="To"
        hint="Destination where the update was sent"
        isLoading={ isLoading }
        columnGap={ 3 }
      >
        <NetworkEntity
          network={ network }
          isLoading={ isLoading }
        />
      </EventDetailsInfoItem>
      <DetailsInfoItemDivider/>
      <EventDetailsInfoItem
        title="Transaction hash"
        hint="Unique character string (TxID) assigned to every verified transaction"
        flexWrap="nowrap"
        isLoading={ isLoading }
      >
        { data.status === null && <Spinner mr={ 2 } size="sm" flexShrink={ 0 }/> }
        <Skeleton isLoaded={ !isLoading } overflow="hidden">
          <HashStringShortenDynamic hash={ data.eventHash } fontSize="xl"/>
        </Skeleton>
        <CopyToClipboard text={ data.eventHash } isLoading={ isLoading }/>
      </EventDetailsInfoItem>
      <EventDetailsInfoItem title="Transaction status" hint="Update transaction status" isLoading={ isLoading } columnGap={ 3 }>
        <TxStatus status="ok" errorText="error" isLoading={ isLoading }/>
        <Tag colorScheme="gray" isLoading={ isLoading } isTruncated ml={ 3 } fontSize="lg">
          placeholder
        </Tag>
      </EventDetailsInfoItem>
      <GridItem colSpan={{ base: undefined, lg: 2 }}>
        <Element name="TxInfo__cutLink">
          <Skeleton isLoaded={ !isLoading } mt={ 6 } display="inline-block">
            <Link
              display="inline-block"
              fontSize="sm"
              textDecorationLine="underline"
              textDecorationStyle="dashed"
              onClick={ handleCutClick }
            >
              { isExpanded ? 'Hide details' : 'View details' }
            </Link>
          </Skeleton>
        </Element>
      </GridItem>
      { /*{ isExpanded && (*/ }
      { /*  <>*/ }
      { /*    <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 4 }}/>*/ }
      { /*    { /*<TxDetailsOther nonce={ data.nonce } type={ data.type } position={ data.position }/>*/ }
      { /*    <EventDetailsInfoItem*/ }
      { /*      title="Updated tokens"*/ }
      { /*      hint="Updated tokens"*/ }
      { /*    >*/ }
      { /*      <LogUpdatedTokenData data={ data.matrix_entries }/>*/ }
      { /*    </EventDetailsInfoItem>*/ }
      { /*  </>*/ }
      { /*) }*/ }
    </Grid>
  );
};

export default EventInfo;
