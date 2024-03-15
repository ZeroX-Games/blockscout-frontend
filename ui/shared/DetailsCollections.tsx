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

  return (
    <>
      { collections.map((collection, index) => {
        let imgUrl = '';
        if (collection === 'Meebit') {
          imgUrl = 'https://i.seadn.io/gcs/files/2d036c8c2bed042a1588622c3173677f.png?auto=format&dpr=1&w=64 64w';
        } else {
          imgUrl = 'https://i.seadn.io/gae/' +
            'oJmaHkYOBEoqOWxvSf6B2tTjZaymNCnhrimYEzYYRIu_aogqgTs9PGKn0fyubCJ4D0qDQLGxujFRw3RsreGJhWPpl4HW-BKcxHnpjGY?auto=format&dpr=1&w=64 64w';
        }
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
