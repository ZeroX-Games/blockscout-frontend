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
  console.log(top);
  return (
    <AddressHighlightProvider>
      <TableContainer maxW="1200px" overflowX="scroll" overflowY="unset">
        <Table style={{ tableLayout: 'unset' }}>
          <Thead top={ 0 } position="sticky" backgroundColor="#383F4A" borderTopLeftRadius="20px">
            <Tr>
              <Th
                minW="180px"
                maxW="300px"
                position="sticky"
                left={ 0 }
                overflow="hidden"
                zIndex={ 2 }
                backgroundColor="#383F4A"
                boxShadow="-20px -20px 0px #232B38"
              >
                TokenId
              </Th>
              { attributes.map((attribute, index) => (
                <Th key={ index } minW="125px" maxW="200px" ml="20px" >{ attribute }</Th>
              )) }
            </Tr>
          </Thead>
          <Tbody>
            { data.map((item, index) => {
              return (item.updates.map((update) => (
                <TokenUpdateTableItem
                  key={ index }
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
