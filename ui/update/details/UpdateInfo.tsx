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

import type { BlockDetail } from 'types/api/update';

// import { route } from 'nextjs-routes';

import Tag from 'ui/shared/chakra/Tag';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import DetailsFee from 'ui/shared/DetailsFee';
import DetailsInfoItem from 'ui/shared/DetailsInfoItem';
import DetailsInfoItemDivider from 'ui/shared/DetailsInfoItemDivider';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import EventEntity from 'ui/shared/entities/event/EventEntity';
import NetworkEntity from 'ui/shared/entities/network/NetworkEntity';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import LogUpdatedTokenData from 'ui/shared/logs/LogUpdatedTokenData';
import TxStatus from 'ui/shared/statusTag/TxStatus';
import UpdateStatus from 'ui/shared/statusTag/UpdateStatus';
import TextSeparator from 'ui/shared/TextSeparator';
import TxSocketAlert from 'ui/tx/TxSocketAlert';

interface Props {
  data: BlockDetail | undefined;
  isLoading: boolean;
  socketStatus?: 'close' | 'error';
}

const UpdateInfo = ({ data, isLoading, socketStatus }: Props) => {
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

  const network = { name: 'Base', hash: '0x881D40237659C251811CEC9c364ef91dC08D300C' };
  // const updates = { attributes: [ 'Rp', 'Mp', 'Speed', 'Exposure', 'Hp', 'Decoration', 'Rp1', 'Mp1', 'Speed1', 'Exposure1', 'Hp1', 'Decoration1' ],
  //   values: [ [ 'Azuki #7352', 10, 0, 1, 20, 1, 0, 10, 0, 1, 20, 1, 0 ],
  //     [ 'Azuki #2314', 0, 0, 5, 0, 0, 10, 0, 0, 5, 0, 0, 10 ],
  //     [ 'Azuki #6381', -30, 0, 0, -8, 0, 0, -30, 0, 0, -8, 0, 0 ] ],
  // };
  return (
    <Grid columnGap={ 8 } rowGap={{ base: 3, lg: 3 }} templateColumns={{ base: 'minmax(0, 1fr)', lg: 'max-content minmax(728px, auto)' }}>
      { socketStatus && (
        <GridItem colSpan={{ base: undefined, lg: 2 }} mb={ 2 }>
          <TxSocketAlert status={ socketStatus }/>
        </GridItem>
      ) }
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
        title="Update status"
        hint="Current update state: Success, Failed (Error), or Pending (In Process)"
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
        hint="Event number containing the update"
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
          network={ network }
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
      <DetailsInfoItem
        title="Block"
        hint="Block number containing the transaction"
        isLoading={ isLoading }
      >
        { data.block_number === null ?
          <Text>Pending</Text> : (
            <BlockEntity
              isLoading={ isLoading }
              number={ data.block_number }
              noIcon
            />
          ) }
        { Boolean(data.confirmations) && (
          <>
            <TextSeparator color="gray.500"/>
            <Skeleton isLoaded={ !isLoading } color="text_secondary">
              <span>{ data.confirmations } Block confirmations</span>
            </Skeleton>
          </>
        ) }
      </DetailsInfoItem>
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
      { isExpanded && (
        <>
          <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 4 }}/>
          { /*<TxDetailsOther nonce={ data.nonce } type={ data.type } position={ data.position }/>*/ }
          <DetailsInfoItem
            title="Updated tokens"
            hint="Updated tokens"
          >
            <LogUpdatedTokenData data={ data.matrix_entries }/>
          </DetailsInfoItem>
        </>
      ) }
    </Grid>
  );
};

export default UpdateInfo;
