import {
  Grid,
  GridItem,
  Text,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
// import BigNumber from 'bignumber.js';
import React from 'react';
import { scroller } from 'react-scroll';

import type { EventDetail } from 'types/api/event';

// import { route } from 'nextjs-routes';

import Tag from 'ui/shared/chakra/Tag';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import DetailsCollections from 'ui/shared/DetailsCollections';
import DetailsFee from 'ui/shared/DetailsFee';
import DetailsInfoItem from 'ui/shared/DetailsInfoItem';
import DetailsInfoItemDivider from 'ui/shared/DetailsInfoItemDivider';
import EventEntity from 'ui/shared/entities/event/EventEntity';
import NetworkEntity from 'ui/shared/entities/network/NetworkEntity';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import LogUpdatedTokenData from 'ui/shared/logs/LogUpdatedTokenData';
import TxStatus from 'ui/shared/statusTag/TxStatus';
import UpdateStatus from 'ui/shared/statusTag/UpdateStatus';

interface Props {
  data: EventDetail | undefined;
  isLoading: boolean;
}

const EventInfo = ({ data, isLoading }: Props) => {
  const [ isExpanded, setIsExpanded ] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // TODO: fix type. MatrixEntry is not compatible with MatrixUpdate
  const matrixUpdate = data.matrix_entries as any;
  return (
    <Grid columnGap={ 8 } rowGap={{ base: 3, lg: 3 }} templateColumns={{ base: 'minmax(0, 1fr)', lg: 'max-content minmax(728px, auto)' }}>
      <DetailsInfoItem
        title="Event hash"
        hint="Unique character string (TxID) assigned to every verified transaction"
        flexWrap="nowrap"
        isLoading={ isLoading }
      >
        { data.status === null && <Spinner mr={ 2 } size="sm" flexShrink={ 0 }/> }
        <Skeleton isLoaded={ !isLoading } overflow="hidden">
          <HashStringShortenDynamic hash={ data.eventHash }/>
        </Skeleton>
        <CopyToClipboard text={ data.eventHash } isLoading={ isLoading }/>
      </DetailsInfoItem>
      <DetailsInfoItem
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
      </DetailsInfoItem>
      <DetailsInfoItem
        title="Event"
        hint="Event number"
        isLoading={ isLoading }
      >
        { data.block_number === null ?
          <Text>Pending</Text> : (
            <EventEntity
              isLoading={ isLoading }
              number={ data.block_number }
              noIcon
            />
          ) }
      </DetailsInfoItem>
      <DetailsInfoItem
        title="Updated Collections"
        isLoading={ isLoading }
        hint="The updated tokens belong to which collections">
        <DetailsCollections collections={ [ 'Meebit', 'Doge' ] } isLoading={ isLoading }/>
      </DetailsInfoItem>
      <DetailsInfoItem
        title="Fee"
        hint="Fees paid for the transaction"
        isLoading={ isLoading }
      >
        <DetailsFee fee={ 0.0021 } isLoading={ isLoading }/>
      </DetailsInfoItem>
      <DetailsInfoItemDivider/>
      <DetailsInfoItem
        title="To"
        hint="Destination where the update was sent"
        isLoading={ isLoading }
        columnGap={ 3 }
      >
        <NetworkEntity
          chainId={ data.application_details.chainID }
          isLoading={ isLoading }
        />
      </DetailsInfoItem>
      <DetailsInfoItemDivider/>
      <DetailsInfoItem
        title="Transaction hash"
        hint="Unique character string (TxID) assigned to every verified transaction"
        flexWrap="nowrap"
        isLoading={ isLoading }
      >
        { data.status === null && <Spinner mr={ 2 } size="sm" flexShrink={ 0 }/> }
        <Skeleton isLoaded={ !isLoading } overflow="hidden">
          <HashStringShortenDynamic hash={ data.eventHash }/>
        </Skeleton>
        <CopyToClipboard text={ data.eventHash } isLoading={ isLoading }/>
      </DetailsInfoItem>
      <DetailsInfoItem title="Transaction status" hint="Update transaction status" isLoading={ isLoading } columnGap={ 3 }>
        <TxStatus status="ok" errorText="error" isLoading={ isLoading }/>
        <Tag colorScheme="gray" isLoading={ isLoading } isTruncated ml={ 3 }>
          placeholder
        </Tag>
      </DetailsInfoItem>
      { /*<GridItem colSpan={{ base: undefined, lg: 2 }}>*/ }
      { /*  <Element name="TxInfo__cutLink">*/ }
      { /*    <Skeleton isLoaded={ !isLoading } mt={ 6 } display="inline-block">*/ }
      { /*      <Link*/ }
      { /*        display="inline-block"*/ }
      { /*        fontSize="sm"*/ }
      { /*        textDecorationLine="underline"*/ }
      { /*        textDecorationStyle="dashed"*/ }
      { /*        onClick={ handleCutClick }*/ }
      { /*      >*/ }
      { /*        { isExpanded ? 'Hide details' : 'View details' }*/ }
      { /*      </Link>*/ }
      { /*    </Skeleton>*/ }
      { /*  </Element>*/ }
      { /*</GridItem>*/ }
      { isExpanded && (
        <>
          <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 4 }}/>
          { /*<TxDetailsOther nonce={ data.nonce } type={ data.type } position={ data.position }/>*/ }
          <DetailsInfoItem
            title="Updated tokens"
            hint="Updated tokens"
          >
            <LogUpdatedTokenData data={ matrixUpdate }/>
          </DetailsInfoItem>
        </>
      ) }
    </Grid>
  );
};

export default EventInfo;
