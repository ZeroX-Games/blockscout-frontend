import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, HStack, Image, Tag, Text, VStack } from '@chakra-ui/react';
import { ResponsiveRadar } from '@nivo/radar';
import React from 'react';

import { radarData } from './assets/radarData';
import GameAssetBarChart from './charts/GameAssetUpdateBarChart';
type RightDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
};

const GameAssetRadarChart = () => {
  return (
    <ResponsiveRadar
      data={ radarData }
      keys={ [ 'Meebit414#1' ] }
      curve="basisClosed"
      indexBy="attribute"
      valueFormat=">-.2f"
      borderColor={{ from: 'color' }}
      margin={{ top: 40, right: 70, bottom: 40, left: 80 }}
      gridLabelOffset={ 18 }
      gridShape="linear"
      enableDots={ false }
      colors={{ scheme: 'pink_yellowGreen' }}
      blendMode="normal"
      motionConfig="wobbly"
      theme={
        {
          grid: {
            line: {
              stroke: '#869faa',
              strokeWidth: 2,
            },
          },
          text: {
            fontSize: 15,
            fontWeight: 600,
            fill: '#bcbcbc',
          },
          tooltip: {
            basic: {
              backgroundColor: '#000',
            },
            container: {
              backgroundColor: '#000',
            },
          },
        }
      }
    />
  );
};

const GameAssetUpdateDrawer = ({ onClose, isOpen }: RightDrawerProps) => {
  return (
    <Drawer placement="right" onClose={ onClose } isOpen={ isOpen } size="xl">
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px" py={ 6 }>
          <HStack gap={ 8 } alignItems="end">
            <Heading size="xl" lineHeight="42px">Meebit404#1</Heading>
            <Heading size="md" color="text_secondary">NFT Dancer</Heading>
          </HStack>
        </DrawerHeader>
        <DrawerBody p={ 4 }>
          <VStack>
            <HStack w="full" alignItems="flex-start" gap={ 6 } overflow="hidden">
              <Image src="https://i.seadn.io/gcs/files/763e240d1b4834e8aed7b9a5e9526286.png?auto=format&dpr=1&w=128 128w"
                alt="#Utility" style={{ borderRadius: 20 }} boxSize="400px"/>
              <VStack gap={ 2 } alignItems="flex-start" flex="1">
                <Text fontSize="x-large" fontWeight={ 600 }>Meebit404</Text>
                <Text fontSize="md" fontWeight={ 400 } color="text_secondary">
                  Meebit404 is a NFT Dancer. It is a unique NFT that can be used in the game. It has a unique set of abilities and stats.
                </Text>
                <Box mt={ 2 }><Tag mr={ 2 }>ERC-20</Tag><Tag mr={ 2 }>ERC-721</Tag><Tag mr={ 2 }>ERC-404</Tag></Box>
                <Flex height="260px" width="full">
                  <GameAssetRadarChart/>
                </Flex>
              </VStack>
            </HStack>
            <HStack>
              <Box width="740px" height="440px">
                <GameAssetBarChart/>
              </Box>
            </HStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default GameAssetUpdateDrawer;
