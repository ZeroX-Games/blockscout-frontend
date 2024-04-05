import { Box } from '@chakra-ui/react';
import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';

import * as tokenTransferMock from 'mocks/tokens/tokenTransfer';
import TestApp from 'playwright/TestApp';

import TokenTransferTable from './TokenUpdateTable';

test('without tx info', async({ mount }) => {
  // TODO: fix type. TokenTransfer is not compatible with MatrixEntry
  const matrixEntry = tokenTransferMock.mixTokens.items as any;
  const component = await mount(
    <TestApp>
      <Box h={{ base: '134px', lg: 6 }}/>
      <TokenTransferTable
        attributes={ [] } // TODO: added here just to make typescript happy. But should fix actual props type of TokenTransferTable
        data={ matrixEntry }
        top={ 0 }
        showTxInfo={ false }
      />
    </TestApp>,
  );

  await expect(component).toHaveScreenshot();
});

test('with tx info', async({ mount }) => {
  // TODO: fix type. TokenTransfer is not compatible with MatrixEntry
  const matrixEntry = tokenTransferMock.mixTokens.items as any;
  const component = await mount(
    <TestApp>
      <Box h={{ base: '134px', lg: 6 }}/>
      <TokenTransferTable
        attributes={ [] } // TODO: added here just to make typescript happy. But should fix actual props type of TokenTransferTable
        data={ matrixEntry }
        top={ 0 }
        showTxInfo={ true }
      />
    </TestApp>,
  );

  await expect(component).toHaveScreenshot();
});
