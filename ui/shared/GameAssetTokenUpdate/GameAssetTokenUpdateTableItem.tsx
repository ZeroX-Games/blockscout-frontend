import { Tr, Td, Skeleton, Flex, Text, Box, Popover, PopoverTrigger, Image } from '@chakra-ui/react';
import React from 'react';

import type { MatrixUpdate } from '../../../types/api/event';

// import type { TokenTransfer } from 'types/api/tokenTransfer';
//
// import getCurrencyValue from 'lib/getCurrencyValue';
// import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
// import AddressFromTo from 'ui/shared/address/AddressFromTo';
import Tag from 'ui/shared/chakra/Tag';

import TokenEntity from '../entities/token/TokenEntity';
import { getUpdateText, getUpdateTextColor } from './helpers';
import UtilityPopoverContent from './UtilityPopoverContent';
// import NftEntity from 'ui/shared/entities/nft/NftEntity';
// import TokenEntity from 'ui/shared/entities/token/TokenEntity';
// import TxEntity from 'ui/shared/entities/tx/TxEntity';
// import { getTokenTransferTypeText } from 'ui/shared/TokenTransfer/helpers';
// import TxAdditionalInfo from 'ui/txs/TxAdditionalInfo';

type Props = MatrixUpdate & {
  isLoading?: boolean;
  collectionAddr: string;
  tokenImage: string;
}

const GameAssetTokenUpdateTableItem = ({
  collectionAddr,
  token_id: tokenId,
  tokenImage,
  delta,
  isLoading,
}: Props) => {
  let token;
  if (collectionAddr === '0xED5AF388653567Af2F388E6224dC7C4b3241C544') {
    token = {
      address: collectionAddr,
      name: 'Meebits',
    };
  } else {
    token = {
      address: collectionAddr,
      name: 'Doge',
    };
  }

  return (
    <Tr alignItems="top">
      { /*<Td position="sticky" left={ 0 }>*/ }
      <Td left={ 0 }>
        <Flex gap={ 8 } alignItems="center">
          <Box w={ 28 } h={ 28 } position="relative">
            <Popover
              trigger="hover"
              placement="bottom-start"
              isLazy
            >
              <PopoverTrigger>
                <Image src={ tokenImage } alt={ token.name } style={{ borderRadius: 55 }}/>
              </PopoverTrigger>
              <UtilityPopoverContent utilityName={ token.name }/>
            </Popover>
          </Box>
          <Flex flexDir="column" alignItems="flex-start" my="2px" rowGap={ 5 }>
            <Popover
              trigger="hover"
              placement="right-start"
              isLazy
            >
              <PopoverTrigger>
                <Flex>
                  <TokenEntity
                    token={ token }
                    isLoading={ isLoading }
                    noSymbol
                    noCopy
                    my="2px"
                  />
                </Flex>
              </PopoverTrigger>
              <UtilityPopoverContent utilityName={ token.name }/>
            </Popover>
            <Tag isLoading={ isLoading } fontSize="md">#{ tokenId }</Tag>
          </Flex>
        </Flex>
      </Td>
      { delta.map((item, index) => (
        <Td key={ index } verticalAlign="center">
          <Flex my="2px">
            <Skeleton isLoaded={ !isLoading } w="100%">
              <Text
                as="span"
                color={ getUpdateTextColor(item) }
                fontSize="24px"
                fontWeight={ 600 }
                lineHeight="shorter"
              >{ getUpdateText(item) }</Text>
            </Skeleton>
          </Flex>
        </Td>
      )) }
    </Tr>
  );
};

export default React.memo(GameAssetTokenUpdateTableItem);
