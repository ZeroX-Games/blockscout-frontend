import { Skeleton } from '@chakra-ui/react';
import React from 'react';

import IconSvg from 'ui/shared/IconSvg';

type Props = {
  // should be string, will be fixed on the back-end
  fee: string | number;
  isLoading?: boolean;
}

const DetailsFee = ({ fee, isLoading }: Props) => {
  return (
    <>
      { /*TODO: need to update icon here*/ }
      <IconSvg name="zerox-icon" boxSize={ 5 } color="gray.500" isLoading={ isLoading }/>
      <Skeleton isLoaded={ !isLoading } ml={ 2 }>
        { fee }
      </Skeleton>
    </>
  );
};

export default DetailsFee;
