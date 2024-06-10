import {
  Grid,
  GridItem,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';

import type { TxZeroXTransaction } from 'types/api/txZeroxTransaction';

import CopyToClipboard from 'ui/shared/CopyToClipboard';
import DetailsInfoItem from 'ui/shared/DetailsInfoItem';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import TxSocketAlert from 'ui/tx/TxSocketAlert';

import AddressEntity from '../../shared/entities/address/AddressEntity';
interface Props {
  data: TxZeroXTransaction | undefined;
  isLoading: boolean;
  socketStatus?: 'close' | 'error';
}

const TxZeroxInfo = ({ data, isLoading, socketStatus }: Props) => {
  if (!data) {
    return null;
  }

  return (
    <Grid columnGap={ 12 } rowGap={{ base: 3, lg: 3 }} templateColumns={{ base: 'minmax(0, 1fr)', lg: 'max-content minmax(728px, auto)' }}>
      { socketStatus && (
        <GridItem colSpan={{ base: undefined, lg: 2 }} mb={ 2 }>
          <TxSocketAlert status={ socketStatus }/>
        </GridItem>
      ) }
      <DetailsInfoItem
        title="Transaction hash"
        hint="Unique character string (TxID) assigned to every verified transaction"
        flexWrap="nowrap"
        isLoading={ isLoading }
      >
        { data.txHash === null && <Spinner mr={ 2 } size="sm" flexShrink={ 0 }/> }
        <Skeleton isLoaded={ !isLoading } overflow="hidden">
          <HashStringShortenDynamic hash={ data.txHash }/>
        </Skeleton>
        <CopyToClipboard text={ data.txHash } isLoading={ isLoading }/>
      </DetailsInfoItem>
      <DetailsInfoItem
        title="Contract address"
        hint="Address of the contract that initiated the transaction"
        flexWrap="nowrap"
        isLoading={ isLoading }
      >
        { data.contract_address === null && <Spinner mr={ 2 } size="sm" flexShrink={ 0 }/> }
        <AddressEntity
          address={ data.contract_address }
          isLoading={ isLoading }
          noIcon
        />
      </DetailsInfoItem>
    </Grid>
  );
};

export default TxZeroxInfo;
