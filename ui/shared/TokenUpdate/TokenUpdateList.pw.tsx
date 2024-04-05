import { Box } from '@chakra-ui/react';
import { test, expect, devices } from '@playwright/experimental-ct-react';
import React from 'react';

import * as tokenTransferMock from 'mocks/tokens/tokenTransfer';
import TestApp from 'playwright/TestApp';

import TokenTransferList from './TokenUpdateList';

test.use({ viewport: devices['iPhone 13 Pro'].viewport });

const data = [
  {
    ...tokenTransferMock.erc20,
    to: {
      ...tokenTransferMock.erc20.to,
      hash: tokenTransferMock.erc721.to.hash,
    },
  },
  tokenTransferMock.erc721,
  tokenTransferMock.erc1155A,
  tokenTransferMock.erc1155B,
  tokenTransferMock.erc1155C,
  tokenTransferMock.erc1155D,
];

test('without tx info', async({ mount }) => {
  // TODO: fix type. TokenTransfer is not compatible with MatrixEntry
  const matrixEntry = data as any;
  const component = await mount(
    <TestApp>
      <Box h={{ base: '134px', lg: 6 }}/>
      <TokenTransferList
        data={ matrixEntry }
        showTxInfo={ false }
      />
    </TestApp>,
  );

  await expect(component).toHaveScreenshot();
});

test('with tx info', async({ mount }) => {
  // TODO: fix type. TokenTransfer is not compatible with MatrixEntry
  const matrixEntry = data as any;
  const component = await mount(
    <TestApp>
      <Box h={{ base: '134px', lg: 6 }}/>
      <TokenTransferList
        data={ matrixEntry }
        showTxInfo={ true }
      />
    </TestApp>,
  );

  await expect(component).toHaveScreenshot();
});
