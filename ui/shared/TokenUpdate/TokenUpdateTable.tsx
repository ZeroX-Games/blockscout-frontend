import { Table, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';
import React from 'react';

import type { MatrixEntry } from 'types/api/event';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { default as Thead } from 'ui/shared/TheadSticky';
import TokenUpdateTableItem from 'ui/shared/TokenUpdate/TokenUpdateTableItem';

interface Props {
  data: Array<MatrixEntry>;
  attributes: Array<string>;
  baseAddress?: string;
  top: number;
  isLoading?: boolean;
}

const TokenUpdateTable = ({
  data,
  attributes,
  top,
  isLoading,
}: Props) => {
  // eslint-disable-next-line no-console
  console.log(top);
  //  token_id is a random int between 100 and 400
  const mockData = [ { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ 0, -43, 0, 55, 53, 0, 12 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ 35, -24, -23, 73, 118, 0, 61 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ 0, -24, 35, -23, 118, 73, 61 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ 61, -23, -24, 73, 0, 35, 118 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ -23, 35, 73, 118, 0, 61, -24 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ -24, 61, 73, 35, 0, 118, -23 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ 35, -24, 0, -23, 61, 73, 118 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ 73, 0, 61, -24, 35, -23, 118 ] },
  ];

  const mockData1 = [
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(),
      delta: [ 0, (Math.floor(Math.random() * 100) - 50), 0,
        (Math.floor(Math.random() * 100) - 50), (Math.floor(Math.random() * 100) - 50), 0,
        (Math.floor(Math.random() * 100) - 50) ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ -24, 73, 0, 35, -23, 118, 61 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ 0, -24, 35, 118, 61, 73, -23 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ 73, -24, 118, 61, -23, 0, 35 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ 56, 88, -45, -33, -65, -78, -73 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ -38, 51, 42, 60, 53, -50, 75 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ 21, 88, 14, -75, -46, -19, -15 ] },
    { token_id: (Math.floor(Math.random() * 300) + 100).toString(), delta: [ 71, -45, -17, -66, -50, -46, 11 ] },
  ];

  const imageSet = [
    'https://i.seadn.io/gcs/files/55631706377fa154a5d2eb3233a10841.png?auto=format&dpr=1&w=128 128w',
    'https://i.seadn.io/gcs/files/7c699b5a59bf6bf31fa3b6dd16c076af.png?auto=format&dpr=1&w=128 128w',
    'https://i.seadn.io/gcs/files/c86b7ba051505ed456703a7737caabe7.png?auto=format&dpr=1&w=128 128w',
    'https://i.seadn.io/gcs/files/1c08eb9d14decf9448dae9fe3e08e4d3.png?auto=format&dpr=1&w=128 128w',
    'https://i.seadn.io/gcs/files/9ac317903f3b093171676bcaaa9e8a74.png?auto=format&dpr=1&w=128 128w',
    'https://i.seadn.io/s/raw/files/5cb336e7dc5dca12a9bf4fc25190de33.png?auto=format&dpr=1&w=128 128w',
    'https://i.seadn.io/gcs/files/1d5410110ffae37e04600d720639193e.png?auto=format&dpr=1&w=128 128w',
    'https://i.seadn.io/gcs/files/52828a746055b0323be4e933c550863d.png?auto=format&dpr=1&w=128 128w',
    'https://i.seadn.io/gcs/files/763e240d1b4834e8aed7b9a5e9526286.png?auto=format&dpr=1&w=128 128w',
  ];

  const imageSet1 =
    [ 'https://i.seadn.io/gae/FqeWZsJm4jyPdZ-wdsbKces8Bfq6xFeP_D6s6z3ar119kUGd0BpWYstAM50RE5BybLIpz-EJEuqhZqvUjA_8cgGs6lWYsgGtbzwm?auto=format&dpr=1&w=1000',
      'https://i.seadn.io/gae/2mBx2UfrUTt6eBZpyRvGsc4ztb0pBCyXtfHos5-pylVQ_caca3sLGtcguwTNn1Wr4uFUSmu0s99GclEZCzfMGi4iSQN94krQdQy9sg?auto=format&dpr=1&w=1000',
      'https://i.seadn.io/gae/VfTRKyou43031CFWEeqA0QFx9asboJDPSgtGjBRgguINnxdYYYN-JBvI-iBSv01tXOLFOAupTVXJB99AU0npZ9_yGAlu0lgeb8Ujpok?auto=format&dpr=1&w=1000',
      'https://i.seadn.io/gae/VY5ao2s84TsYrT56y4TlLz8WglIZ6N4V2a2i7OYOnmirqAx7T0maqhAbQDHFAhgI81ZwbtcxVXkY7DhGZr_6Jt2xDkXaknhVxz8b-g?auto=format&dpr=1&w=1000',
      'https://i.seadn.io/gae/dWxbX681x0-PwXXp187vhQ8wjoS77nI0cg0AD_vX-A5pz82vvAxhpDw7G8oZ3fwJJiyMpj3zwiG2PfwTeG_nrG05-rRtR23NR9Z0Dw?auto=format&dpr=1&w=1000',
      'https://i.seadn.io/gae/dWgHCSGiTV10u1ltemcO2RtrIsqF-fEvcICPtEC4zdmFYVcgUQj3HgQp-XviUTBIws7ixmLipfKK4HsMtm8TYGl_P4xnvo2gfZ3_y0U?auto=format&dpr=1&w=1000',
      'https://i.seadn.io/gae/_-Du5JCp_2eT43_QWWpOOKMnqpQSe0DvzRthcjqaSF3ICYXmkLJztrdyVp9fY4WenLywYjjaEFnUFmblNbjGQbAEH-xij2weD88_?auto=format&dpr=1&w=1000',
      'https://i.seadn.io/gae/VfTRKyou43031CFWEeqA0QFx9asboJDPSgtGjBRgguINnxdYYYN-JBvI-iBSv01tXOLFOAupTVXJB99AU0npZ9_yGAlu0lgeb8Ujpok?auto=format&dpr=1&w=1000',
      'https://i.seadn.io/gae/NP1ZvH-b2JaDSDhrOlT8BCYi7Xw5cMh1FcSOObrUC5cb7BmJEOQ9zr0F6cAkPJxD1-N6AIEJcV8GFiUUeKzSxCfti1G6P2SXjM4OjA?auto=format&dpr=1&w=1000',

    ];

  return (
    <AddressHighlightProvider>
      <TableContainer maxW="1200px" overflowX="unset" overflowY="unset">
        <Table style={{ tableLayout: 'unset' }}>
          <Thead top={ 0 } position="sticky" backgroundColor="#383F4A" borderTopLeftRadius="20px">
            <Tr>
              <Th
                position="sticky"
                left={ 0 }
                overflow="hidden"
                zIndex={ 2 }
                fontSize="lg"
                minW="265px"
              >
                Utility
              </Th>
              { attributes.map((attribute, index) => (
                <Th key={ index } minW="165px" maxW="200px" ml="20px" fontSize="lg">{ attribute === 'Proficiency' ? 'Level' : attribute }</Th>
              )) }
            </Tr>
          </Thead>
          <Tbody>
            { data.map((item, index) => {
              const mock = item.collectionAddr === '0xED5AF388653567Af2F388E6224dC7C4b3241C544' ? mockData : mockData1;
              const imageArray = item.collectionAddr === '0xED5AF388653567Af2F388E6224dC7C4b3241C544' ? imageSet : imageSet1;
              const extendedUpdates = [ ...item.updates, ...mock ];
              return (extendedUpdates.map((update, updateIndex) => (
                <TokenUpdateTableItem
                  key={ `${ index }-${ updateIndex }` }
                  tokenImage={ imageArray[updateIndex] }
                  collectionAddr={ item.collectionAddr }
                  { ...update }
                  isLoading={ isLoading }
                />
              )));
            }) }
          </Tbody>
        </Table>
      </TableContainer>
    </AddressHighlightProvider>
  );
};

export default React.memo(TokenUpdateTable);
