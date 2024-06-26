import { Box } from '@chakra-ui/react';
import React from 'react';

import type { MatrixEntry } from 'types/api/event';

import TokenUpdateListItem from 'ui/shared/TokenUpdate/TokenUpdateListItem';

interface Props {
  data: Array<MatrixEntry>;
  isLoading?: boolean;
}

const GameAssetTokenUpdateList = ({ data, isLoading }: Props) => {
  return (
    <Box>
      { data.map((item, index) => (
        <TokenUpdateListItem
          key={ index }
          { ...item }
          isLoading={ isLoading }
        />
      )) }
    </Box>
  );
};

export default React.memo(GameAssetTokenUpdateList);
