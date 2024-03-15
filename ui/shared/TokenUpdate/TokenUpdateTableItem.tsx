import { Tr, Td, Skeleton, Flex } from '@chakra-ui/react';
import React from 'react';

import type { MatrixUpdate } from '../../../types/api/event';

// import type { TokenTransfer } from 'types/api/tokenTransfer';
//
// import getCurrencyValue from 'lib/getCurrencyValue';
// import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
// import AddressFromTo from 'ui/shared/address/AddressFromTo';
import Tag from 'ui/shared/chakra/Tag';

import TokenEntity from '../entities/token/TokenEntity';
// import NftEntity from 'ui/shared/entities/nft/NftEntity';
// import TokenEntity from 'ui/shared/entities/token/TokenEntity';
// import TxEntity from 'ui/shared/entities/tx/TxEntity';
// import { getTokenTransferTypeText } from 'ui/shared/TokenTransfer/helpers';
// import TxAdditionalInfo from 'ui/txs/TxAdditionalInfo';

type Props = MatrixUpdate & {
  isLoading?: boolean;
  collectionAddr: string;
}

const TokenUpdateTableItem = ({
  collectionAddr,
  token_id: tokenId,
  delta,
  isLoading,
}: Props) => {
  let collectionName = '';
  let iconUrl = '';
  if (collectionAddr === '0xED5AF388653567Af2F388E6224dC7C4b3241C556') {
    collectionName = 'Meebit';
    iconUrl = 'https://i.seadn.io/gcs/files/2d036c8c2bed042a1588622c3173677f.png?auto=format&dpr=1&w=64 64w';
  } else {
    collectionName = 'Doge';
    iconUrl =
      'https://i.seadn.io/gae/' +
      'oJmaHkYOBEoqOWxvSf6B2tTjZaymNCnhrimYEzYYRIu_aogqgTs9PGKn0fyubCJ4D0qDQLGxujFRw3RsreGJhWPpl4HW-BKcxHnpjGY?auto=format&dpr=1&w=64 64w';
  }
  const token = {
    icon_url: iconUrl,
    address: collectionAddr,
    name: collectionName,
  };
  const thWidth = 'calc(80vw/7)';

  return (
    <Tr alignItems="top" display="table">
      <Td position="sticky" left={ 0 } backgroundColor="#232B38" minW="180px"
        maxW="300px">
        <Flex flexDir="column" alignItems="flex-start" my="3px" rowGap={ 2 }>
          <TokenEntity
            token={ token }
            isLoading={ isLoading }
            noSymbol
            noCopy
            my="2px"
          />
          <Tag isLoading={ isLoading }>Token #{ tokenId }</Tag>
        </Flex>
      </Td>
      { delta.map((item, index) => {
        let color = 'gray.400';
        if (item > 0) {
          color = 'teal.400';
        } else if (item < 0) {
          color = 'red.400';
        }
        return (
          <Td key={ index } minW={ thWidth } maxW={ thWidth } ml="20px">
            <Flex my="3px" color={ color }>
              <Skeleton isLoaded={ !isLoading } w="100%">
                { item === 0 ? '-' : item }
              </Skeleton>
            </Flex>
          </Td>
        );
      }) }
    </Tr>
  );
};

export default React.memo(TokenUpdateTableItem);
