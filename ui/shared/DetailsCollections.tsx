import { Flex, Image, Skeleton, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import TextSeparator from './TextSeparator';

type Props = {
  // should be string, will be fixed on the back-end
  collections: Array<string>;
  isLoading?: boolean;
}

const DetailsCollections = ({ collections, isLoading }: Props) => {
  const separatorColor = useColorModeValue('gray.200', 'gray.700');
  const imgUrl = 'https://i.seadn.io/gae/_BYA3bhx1ebgDr3QsuQuh2OMSznmS_TkwJhikCtCVMh4RUcpn2gnJmmOHHA28gy0mKP50flV31iXsDBUr_zjBaXNJA?auto=format&dpr=1&w=64 64w';

  return (
    <>
      { collections.map((collection, index) => {
        return (
          <Flex key={ index }>
            <Skeleton isLoaded={ !isLoading }>
              <Image
                boxSize={ 6 }
                borderRadius="sm"
                alt={ collection }
                src={ imgUrl }
              />
            </Skeleton>
            <Skeleton isLoaded={ !isLoading } ml={ 2 }>
              <Text>{ collection }</Text>
            </Skeleton>
            { index !== 1 && <TextSeparator color={ separatorColor }/> }
          </Flex>
        );
      }) }
    </>
  );
};

export default DetailsCollections;
