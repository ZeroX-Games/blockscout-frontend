import { Image, Skeleton } from '@chakra-ui/react';
import React from 'react';

type Props = {
  // should be string, will be fixed on the back-end
  fee: string | number;
  isLoading?: boolean;
}

const DetailsFee = ({ fee, isLoading }: Props) => {
  return (
    <>
      { /*TODO: need to update icon here*/ }
      { /*<IconSvg name="zerox-icon" boxSize={ 5 } color="gray.500" isLoading={ isLoading }/>*/ }
      <Image src="https://raw.githubusercontent.com/ZeroX-Games/blockscout-frontend/main/configs/assets/network-icons/zerox-icon-light.png"
        boxSize={ 5 } color="gray.500" alt="fee icon"/>
      <Skeleton isLoaded={ !isLoading } ml={ 2 }>
        { fee }
      </Skeleton>
    </>
  );
};

export default DetailsFee;
