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
  isLoading?: boolean;
  top?: number;
  showTxInfo?: boolean;
}

const TokenUpdateTable = ({
  data,
  attributes,
  isLoading,
}: Props) => {
  const thWidth = 'calc(80vw/7)';
  return (
    <AddressHighlightProvider>
      <TableContainer overflowX="scroll" overflowY="unset" w="80vw">
        <Table style={{ tableLayout: 'unset' }} display="block" maxH="800px" overflowY="scroll">
          <Thead top={ 0 } position="sticky" backgroundColor="#383F4A" borderTopLeftRadius="20px" display="table">
            <Tr display="table">
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
                <Th key={ index } minW={ thWidth } maxW={ thWidth } ml="20px" >{ attribute }</Th>
              )) }
            </Tr>
          </Thead>
          <Tbody >
            { data.map((item, collectionIndex) => {
              return (item.updates.map((update, rowIndex) => (
                <TokenUpdateTableItem
                  key={ `${ collectionIndex }-${ rowIndex }` }
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
