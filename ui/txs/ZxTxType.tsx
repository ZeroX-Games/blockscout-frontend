import React from 'react';

import Tag from 'ui/shared/chakra/Tag';

export interface Props {
  type: number;
  isLoading?: boolean;
}

const ZxTxType = ({ type, isLoading }: Props) => {
  let label;
  let colorScheme;

  switch (type) {
    case 1:
      label = 'Application Reg.';
      colorScheme = 'teal';
      break;
    case 2:
      label = 'Collection Reg.';
      colorScheme = 'cyan';
      break;
    case 3:
      label = 'Utility Update';
      colorScheme = 'pink';
      break;
    default:
      label = 'Transaction';
      colorScheme = 'purple';

  }

  return type !== 0 ? (
    <Tag colorScheme={ colorScheme } isLoading={ isLoading }>
      { label }
    </Tag>
  ) : null;
};

export default ZxTxType;
