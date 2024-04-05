import { Box } from '@chakra-ui/react';
import React from 'react';

import type { MatrixEntry } from 'types/api/event';

import TokenUpdateListItem from 'ui/shared/TokenUpdate/TokenUpdateListItem';

interface Props {
  data: Array<MatrixEntry>;
  isLoading?: boolean;
  showTxInfo?: boolean;
}

const TokenUpdateList = ({ data, isLoading }: Props) => {
  return (
    <Box>
      { data.map((item, index) => (
        <TokenUpdateListItem
          token_id="" // TODO: added here to make typescript happy. But should fix item's type
          delta={ [] } // TODO: added here to make typescript happy. But should fix item's type
          key={ index }
          { ...item }
          isLoading={ isLoading }
        />
      )) }
    </Box>
  );
};

export default React.memo(TokenUpdateList);
