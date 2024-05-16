import { Skeleton, chakra } from '@chakra-ui/react';
import React from 'react';

import TruncatedTextTooltip from 'ui/shared/TruncatedTextTooltip';

interface Props {
  className?: string;
  isLoading?: boolean;
  fontWeight?: number;
  value: string;
  color?: string;
}

const TruncatedValue = ({ className, isLoading, value, fontWeight, color }: Props) => {
  return (
    <TruncatedTextTooltip label={ value }>
      <Skeleton
        className={ className }
        isLoaded={ !isLoading }
        display="inline-block"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        height="fit-content"
        fontWeight={ fontWeight }
        color={ color }
      >
        { value }
      </Skeleton>
    </TruncatedTextTooltip>
  );
};

export default React.memo(chakra(TruncatedValue));
