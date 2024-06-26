import { Box } from '@chakra-ui/react';
import React from 'react';

import type { GameAssetTokenUpdate } from 'types/api/gameAssetTokenUpdate';

import TokenUpdateListItem from 'ui/shared/TokenUpdate/TokenUpdateListItem';

interface Props {
  data: Array<GameAssetTokenUpdate>;
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
