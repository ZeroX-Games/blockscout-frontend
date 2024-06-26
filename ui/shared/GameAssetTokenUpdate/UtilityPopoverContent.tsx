import { HStack, PopoverBody, PopoverContent, Text, VStack, Divider } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

import doge from './assets/doge.png';

const UtilityPopoverContent = ({ utilityName }: {utilityName: string}) => {
  return (
    <PopoverContent width="432px" top={ 2 } left={ -4 } zIndex={ 100 }>
      <PopoverBody p={ 4 }>
        <VStack spacing={ 1 } alignItems="start">
          { utilityName === 'Meebits' ? (
            <iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" className="w-full" frameBorder="0" height="100%"
              id="AssetMedia--frame" sandbox="allow-scripts"
              src="https://turnon.meebits.app/viewer/12977" style={{ minHeight: '400px', minWidth: '400px' }}></iframe>
          ) : <Image src={ doge } alt="meebit"/> }
          <Divider/>
          <HStack w="full" justifyContent="space-between" px={ 2 } py={ 4 }>
            <VStack alignItems="start">
              <Text fontSize="lg" fontWeight="md" color="gray.500">Name</Text>
              <Text fontSize="md" fontWeight="bold">AEB-XAX</Text>
            </VStack>
            <VStack alignItems="start">
              <Text fontSize="lg" fontWeight="md" color="gray.500">Owner</Text>
              <Text fontSize="md" fontWeight="bold">26b7e5</Text>
            </VStack>
          </HStack>
        </VStack>
      </PopoverBody>
    </PopoverContent>
  );
};

export default UtilityPopoverContent;
