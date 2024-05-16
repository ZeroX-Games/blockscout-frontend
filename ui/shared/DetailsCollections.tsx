import { Flex, Heading, Image, Skeleton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import TextSeparator from './TextSeparator';

type Props = {
  // should be string, will be fixed on the back-end
  collections: Array<string>;
  isLoading?: boolean;
}

const DetailsCollections = ({ collections, isLoading }: Props) => {
  const separatorColor = useColorModeValue('gray.200', 'gray.700');
  const meebitImg = 'https://i.seadn.io/gcs/files/2d036c8c2bed042a1588622c3173677f.png?auto=format&dpr=1&w=128 128w';
  const dogeImg =
    // eslint-disable-next-line max-len
    'https://i.seadn.io/gae/ElvjC_ZgTNta6T0cHuqXCJleTBU17in2yriPnojIHcOjXjyGGZ_R4299LUT8h_cYQ5KZCz0yUa3gL5HTQStFdb-BXA5R-N-rVTJUCEA?auto=format&dpr=1&w=128 128w';
  return (
    <Flex gap={ 4 }>
      { collections.map((collection, index) => {
        return (
          <Flex key={ index } alignItems="center" gap={ 2 }>
            <Skeleton isLoaded={ !isLoading }>
              <Image
                boxSize={ 16 }
                borderRadius="md"
                alt={ collection }
                src={ collection === 'Meebits' ? meebitImg : dogeImg }
              />
            </Skeleton>
            <Skeleton isLoaded={ !isLoading } ml={ 2 }>
              <Heading fontWeight="500" fontSize="2xl">{ collection }</Heading>
            </Skeleton>
            { index !== 1 && <TextSeparator color={ separatorColor }/> }
          </Flex>
        );
      }) }
    </Flex>
  );
};

export default DetailsCollections;
