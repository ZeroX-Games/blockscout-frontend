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
  const token = {
    icon_url:
      'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=48 48w',
    address: collectionAddr,
    name: 'collection Name',
  };
  return (
    <Tr alignItems="top">
      <Td position="sticky" left={ 0 } backgroundColor="#232B38">
        <Flex flexDir="column" alignItems="flex-start" my="3px" rowGap={ 2 }>
          <TokenEntity
            token={ token }
            isLoading={ isLoading }
            noSymbol
            noCopy
            my="2px"
          />
          <Tag isLoading={ isLoading }>#{ tokenId }</Tag>
        </Flex>
      </Td>
      { delta.map((item, index) => (
        <Td key={ index }>
          <Flex my="3px">
            <Skeleton isLoaded={ !isLoading } w="100%">
              { item }
            </Skeleton>
          </Flex>
        </Td>
      )) }
    </Tr>
  );
};

export default React.memo(TokenUpdateTableItem);
