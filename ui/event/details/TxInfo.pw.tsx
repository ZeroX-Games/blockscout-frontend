import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';

import * as txMock from 'mocks/txs/tx';
import contextWithEnvs from 'playwright/fixtures/contextWithEnvs';
import TestApp from 'playwright/TestApp';
import * as configs from 'playwright/utils/configs';

import EventInfo from './EventInfo';

const hooksConfig = {
  router: {
    query: { hash: 1 },
  },
};

test('between addresses +@mobile +@dark-mode', async({ mount, page }) => {
  // TODO: fix type. Transaction is not compatible with EventDetails
  const eventDetails = txMock.base as any;
  const component = await mount(
    <TestApp>
      <EventInfo data={ eventDetails } isLoading={ false }/>
    </TestApp>,
    { hooksConfig },
  );

  await page.getByText('View details').click();

  await expect(component).toHaveScreenshot({
    mask: [ page.locator(configs.adsBannerSelector) ],
    maskColor: configs.maskColor,
  });
});

test('creating contact', async({ mount, page }) => {
  // TODO: fix type. Transaction is not compatible with EventDetails
  const eventDetails = txMock.withContractCreation as any;
  const component = await mount(
    <TestApp>
      <EventInfo data={ eventDetails } isLoading={ false }/>
    </TestApp>,
    { hooksConfig },
  );

  await expect(component).toHaveScreenshot({
    mask: [ page.locator(configs.adsBannerSelector) ],
    maskColor: configs.maskColor,
  });
});

test('with token transfer +@mobile', async({ mount, page }) => {
  // TODO: fix type. Transaction is not compatible with EventDetails
  const eventDetails = txMock.withTokenTransfer as any;
  const component = await mount(
    <TestApp>
      <EventInfo data={ eventDetails } isLoading={ false }/>
    </TestApp>,
    { hooksConfig },
  );

  await expect(component).toHaveScreenshot({
    mask: [ page.locator(configs.adsBannerSelector) ],
    maskColor: configs.maskColor,
  });
});

test('with decoded revert reason', async({ mount, page }) => {
  // TODO: fix type. Transaction is not compatible with EventDetails
  const eventDetails = txMock.withDecodedRevertReason as any;
  const component = await mount(
    <TestApp>
      <EventInfo data={ eventDetails } isLoading={ false }/>
    </TestApp>,
    { hooksConfig },
  );

  await expect(component).toHaveScreenshot({
    mask: [ page.locator(configs.adsBannerSelector) ],
    maskColor: configs.maskColor,
  });
});

test('with decoded raw reason', async({ mount, page }) => {
  // TODO: fix type. Transaction is not compatible with EventDetails
  const eventDetails = txMock.withRawRevertReason as any;
  const component = await mount(
    <TestApp>
      <EventInfo data={ eventDetails } isLoading={ false }/>
    </TestApp>,
    { hooksConfig },
  );

  await expect(component).toHaveScreenshot({
    mask: [ page.locator(configs.adsBannerSelector) ],
    maskColor: configs.maskColor,
  });
});

test('pending', async({ mount, page }) => {
  // TODO: fix type. Transaction is not compatible with EventDetails
  const eventDetails = txMock.pending as any;
  const component = await mount(
    <TestApp>
      <EventInfo data={ eventDetails } isLoading={ false }/>
    </TestApp>,
    { hooksConfig },
  );

  await page.getByText('View details').click();

  await expect(component).toHaveScreenshot({
    mask: [ page.locator(configs.adsBannerSelector) ],
    maskColor: configs.maskColor,
  });
});

test('with actions uniswap +@mobile +@dark-mode', async({ mount, page }) => {
  // TODO: fix type. Transaction is not compatible with EventDetails
  const eventDetails = txMock.withActionsUniswap as any;
  const component = await mount(
    <TestApp>
      <EventInfo data={ eventDetails } isLoading={ false }/>
    </TestApp>,
    { hooksConfig },
  );

  await expect(component).toHaveScreenshot({
    mask: [ page.locator(configs.adsBannerSelector) ],
    maskColor: configs.maskColor,
  });
});

const l2Test = test.extend({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: contextWithEnvs(configs.featureEnvs.optimisticRollup) as any,
});

l2Test('l2', async({ mount, page }) => {
  // TODO: fix type. Transaction is not compatible with EventDetails
  const eventDetails = txMock.l2tx as any;
  const component = await mount(
    <TestApp>
      <EventInfo data={ eventDetails } isLoading={ false }/>
    </TestApp>,
    { hooksConfig },
  );

  await expect(component).toHaveScreenshot({
    mask: [ page.locator(configs.adsBannerSelector) ],
    maskColor: configs.maskColor,
  });
});

const mainnetTest = test.extend({
  context: contextWithEnvs([
    { name: 'NEXT_PUBLIC_IS_TESTNET', value: 'false' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ]) as any,
});

mainnetTest('without testnet warning', async({ mount, page }) => {
  // TODO: fix type. Transaction is not compatible with EventDetails
  const eventDetails = txMock.l2tx as any;
  const component = await mount(
    <TestApp>
      <EventInfo data={ eventDetails } isLoading={ false }/>
    </TestApp>,
    { hooksConfig },
  );

  await expect(component).toHaveScreenshot({
    mask: [ page.locator(configs.adsBannerSelector) ],
    maskColor: configs.maskColor,
  });
});

const stabilityTest = test.extend({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: contextWithEnvs(configs.stabilityEnvs) as any,
});

stabilityTest('stability customization', async({ mount, page }) => {
  // TODO: fix type. Transaction is not compatible with EventDetails
  const eventDetails = txMock.stabilityTx as any;
  const component = await mount(
    <TestApp>
      <EventInfo data={ eventDetails } isLoading={ false }/>
    </TestApp>,
    { hooksConfig },
  );

  await expect(component).toHaveScreenshot({
    mask: [ page.locator(configs.adsBannerSelector) ],
    maskColor: configs.maskColor,
  });
});
