import type { TokenTransfer } from 'types/api/tokenTransfer';

export const getTokenTransferTypeText = (type: TokenTransfer['type']) => {
  switch (type) {
    case 'token_minting':
      return 'Token minting';
    case 'token_burning':
      return 'Token burning';
    case 'token_spawning':
      return 'Token creating';
    case 'token_transfer':
      return 'Token transfer';
  }
};

export const getUpdateTextColor = (update: number) => {
  if (update > 0) {
    return 'teal.500';
  } else if (update < 0) {
    return 'red.500';
  }

  return 'inherit';
};

export const getUpdateText = (update: number) => {
  if (update > 0) {
    return `+${ update }`;
  } else if (update === 0) {
    return '-';
  }

  return update;
};
