import { Flex } from '@chakra-ui/react';
import React from 'react';

// import type { GameAssetTokenUpdate } from '../../../types/api/gameAssetTokenUpdate';

import type { GameAssetTokenUpdateQuery } from '../../tx/zeroxTransaction/useUtilityUpdateQuery';
import GameAssetUpdateHeatMap from './GameAssetUpdateHeatMap';

interface Props {
  query: GameAssetTokenUpdateQuery;
}

// deprecated
const GameAssetUpdateTable = ({
  query,
}: Props) => {
  //  token_id is a random int between 100 and 400
  if (!query.data) {
    return null;
  }
  // const mockData: Array<GameAssetTokenUpdate> =
  // [ { id: (Math.floor(Math.random() * 300) + 100).toString(), updates: [ 0, -43, 0, 55, 53, 0, 12 ], name: 'a' },
  //   { id: (Math.floor(Math.random() * 300) + 100).toString(), updates: [ 35, -24, -23, 73, 118, 0, 61 ], name: 'b' },
  //   { id: (Math.floor(Math.random() * 300) + 100).toString(), updates: [ 0, -24, 35, -23, 118, 73, 61 ], name: 'c' },
  //   { id: (Math.floor(Math.random() * 300) + 100).toString(), updates: [ 61, -23, -24, 73, 0, 35, 118 ], name: 'd' },
  //   { id: (Math.floor(Math.random() * 300) + 100).toString(), updates: [ -23, 35, 73, 118, 0, 61, -24 ], name: 'e' },
  //   { id: (Math.floor(Math.random() * 300) + 100).toString(), updates: [ -24, 61, 73, 35, 0, 118, -23 ], name: 'f' },
  //   { id: (Math.floor(Math.random() * 300) + 100).toString(), updates: [ 35, -24, 0, -23, 61, 73, 118 ], name: 'g' },
  //   { id: (Math.floor(Math.random() * 300) + 100).toString(), updates: [ 73, 0, 61, -24, 35, -23, 118 ], name: 'h' },
  // ];

  // const imageSet = [
  //   'https://i.seadn.io/gcs/files/55631706377fa154a5d2eb3233a10841.png?auto=format&dpr=1&w=128 128w',
  //   'https://i.seadn.io/gcs/files/7c699b5a59bf6bf31fa3b6dd16c076af.png?auto=format&dpr=1&w=128 128w',
  //   'https://i.seadn.io/gcs/files/c86b7ba051505ed456703a7737caabe7.png?auto=format&dpr=1&w=128 128w',
  //   'https://i.seadn.io/gcs/files/1c08eb9d14decf9448dae9fe3e08e4d3.png?auto=format&dpr=1&w=128 128w',
  //   'https://i.seadn.io/gcs/files/9ac317903f3b093171676bcaaa9e8a74.png?auto=format&dpr=1&w=128 128w',
  //   'https://i.seadn.io/s/raw/files/5cb336e7dc5dca12a9bf4fc25190de33.png?auto=format&dpr=1&w=128 128w',
  //   'https://i.seadn.io/gcs/files/1d5410110ffae37e04600d720639193e.png?auto=format&dpr=1&w=128 128w',
  //   'https://i.seadn.io/gcs/files/52828a746055b0323be4e933c550863d.png?auto=format&dpr=1&w=128 128w',
  //   'https://i.seadn.io/gcs/files/763e240d1b4834e8aed7b9a5e9526286.png?auto=format&dpr=1&w=128 128w',
  // ];

  return (
    <Flex w="1000px" h="600px">
      <GameAssetUpdateHeatMap/>
    </Flex>
  );
  {/*<AddressHighlightProvider>*/
  }
  {/*  <TableContainer maxW="1200px" overflowX="unset" overflowY="unset">*/
  }
  {/*    <Table style={{ tableLayout: 'unset' }}>*/
  }
  {/*      <Thead top={ 0 } position="sticky" backgroundColor="#383F4A" borderTopLeftRadius="20px">*/
  }
  {/*        <Tr>*/
  }
  {/*          <Th*/
  }
  {/*            position="sticky"*/
  }
  {/*            left={ 0 }*/
  }
  {/*            overflow="hidden"*/
  }
  {/*            zIndex={ 2 }*/
  }
  {/*            fontSize="lg"*/
  }
  {/*            minW="265px"*/
  }
  {/*          >*/
  }
  {/*          Utility*/
  }
  {/*          </Th>*/
  }
  {/*          { query.data.attributes.map((attribute, index) => (*/
  }
  {/*            <Th key={ index } minW="165px" maxW="200px" ml="20px" fontSize="lg">{ attribute === 'Proficiency' ? 'Level' : attribute }</Th>*/
  }
  {/*          )) }*/
  }
  {/*        </Tr>*/
  }
  {/*      </Thead>*/
  }
  {/*      <Tbody>*/
  }
  {/*        { query.data.updatedTokens.map((item, index) => {*/
  }
  {/*        // const mock = item.collectionAddr === '0xED5AF388653567Af2F388E6224dC7C4b3241C544' ? mockData : mockData1;*/
  }
  {/*          const mock = mockData;*/
  }
  {/*          // const imageArray = item.collectionAddr === '0xED5AF388653567Af2F388E6224dC7C4b3241C544' ? imageSet : imageSet1;*/
  }
  {/*          const imageArray = imageSet;*/
  }
  {/*          const extendedUpdates = [ item, ...mock ];*/
  }
  {/*          return (extendedUpdates.map((update, updateIndex) => (*/
  }
  {/*            <GameAssetTokenUpdateTableItem*/
  }
  {/*              key={ `${ index }-${ updateIndex }` }*/
  }
  {/*              tokenImage={ imageArray[updateIndex] }*/
  }
  {/*              collectionAddr={ query.data.collectionAddress }*/
  }
  {/*              { ...update }*/
  }
  {/*              isLoading={ query.isLoading }*/
  }
  {/*            />*/
  }
  {/*          )));*/
  }
  {/*        }) }*/
  }
  {/*      </Tbody>*/
  }
  {/*    </Table>*/
  }
  {/*  </TableContainer>*/
  }
  {/*</AddressHighlightProvider>*/
  }

};

export default React.memo(GameAssetUpdateTable);
