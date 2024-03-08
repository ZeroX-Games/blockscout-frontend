import { Box } from '@chakra-ui/react';
import React from 'react';

import type { MatrixEntry } from 'types/api/event';

import TokenUpdateListItem from 'ui/shared/TokenUpdate/TokenUpdateListItem';

interface Props {
  data: Array<MatrixEntry>;
  baseAddress?: string;
  showTxInfo?: boolean;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
}

const TokenUpdateList = ({ data, baseAddress, showTxInfo, enableTimeIncrement, isLoading }: Props) => {
  return (
    <Box>
      { data.map((item, index) => (
        <TokenUpdateListItem
          key={ index }
          { ...item }
          baseAddress={ baseAddress }
          showTxInfo={ showTxInfo }
          enableTimeIncrement={ enableTimeIncrement }
          isLoading={ isLoading }
        />
      )) }
    </Box>
  );
};

export default React.memo(TokenUpdateList);
