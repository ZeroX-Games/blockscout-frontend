import { Skeleton, chakra, Image, HStack } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { EventDetail } from 'types/api/event';
import type {
  UpdateInterpretationVariable,
  UpdateInterpretationVariableString,
} from 'types/api/updateInterpretation';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import * as mixpanel from 'lib/mixpanel';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import EnsEntity from 'ui/shared/entities/ens/EnsEntity';
import TokenEntity from 'ui/shared/entities/token/TokenEntity';
import IconSvg from 'ui/shared/IconSvg';
import LinkExternal from 'ui/shared/LinkExternal';

// import { extractVariables, getStringChunks, fillStringVariables, NATIVE_COIN_SYMBOL_VAR_NAME } from './utils';

type Props = {
  eventDetail?: EventDetail;
  isLoading?: boolean;
  className?: string;
}

type NonStringTxInterpretationVariable = Exclude<UpdateInterpretationVariable, UpdateInterpretationVariableString>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UpdateInterpretationElementByType = ({ variable }: { variable?: NonStringTxInterpretationVariable }) => {
  const onAddressClick = React.useCallback(() => {
    mixpanel.logEvent(mixpanel.EventTypes.TX_INTERPRETATION_INTERACTION, { Type: 'Address click' });
  }, []);

  const onTokenClick = React.useCallback(() => {
    mixpanel.logEvent(mixpanel.EventTypes.TX_INTERPRETATION_INTERACTION, { Type: 'Token click' });
  }, []);

  const onDomainClick = React.useCallback(() => {
    mixpanel.logEvent(mixpanel.EventTypes.TX_INTERPRETATION_INTERACTION, { Type: 'Domain click' });
  }, []);

  if (!variable) {
    return null;
  }

  const { type, value } = variable;
  switch (type) {
    case 'address': {
      return (
        <chakra.span display="inline-block" verticalAlign="top" _notFirst={{ marginLeft: 1 }}>
          <AddressEntity
            address={ value }
            truncation="constant"
            onClick={ onAddressClick }
            whiteSpace="initial"
          />
        </chakra.span>
      );
    }
    case 'token':
      return (
        <chakra.span display="inline-block" verticalAlign="top" _notFirst={{ marginLeft: 1 }}>
          <TokenEntity
            token={ value }
            onlySymbol
            noCopy
            width="fit-content"
            _notFirst={{ marginLeft: 1 }}
            mr={ 2 }
            whiteSpace="initial"
            onClick={ onTokenClick }
          />
        </chakra.span>
      );
    case 'domain': {
      if (config.features.nameService.isEnabled) {
        return (
          <chakra.span display="inline-block" verticalAlign="top" _notFirst={{ marginLeft: 1 }}>
            <EnsEntity
              name={ value }
              width="fit-content"
              _notFirst={{ marginLeft: 1 }}
              whiteSpace="initial"
              onClick={ onDomainClick }
            />
          </chakra.span>
        );
      }
      return <chakra.span color="text_secondary" whiteSpace="pre">{ value + ' ' }</chakra.span>;
    }
    case 'currency': {
      let numberString = '';
      if (BigNumber(value).isLessThan(0.1)) {
        numberString = BigNumber(value).toPrecision(2);
      } else if (BigNumber(value).isLessThan(10000)) {
        numberString = BigNumber(value).dp(2).toFormat();
      } else if (BigNumber(value).isLessThan(1000000)) {
        numberString = BigNumber(value).dividedBy(1000).toFormat(2) + 'K';
      } else {
        numberString = BigNumber(value).dividedBy(1000000).toFormat(2) + 'M';
      }
      return <chakra.span>{ numberString + ' ' }</chakra.span>;
    }
    case 'timestamp': {
      return <chakra.span color="text_secondary" whiteSpace="pre">{ dayjs(Number(value) * 1000).format('MMM DD YYYY') }</chakra.span>;
    }
  }
};

const ImageRrapper = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <chakra.span
      flexShrink={ 0 }
      borderRadius="sm"
    >
      <Image src={ src } alt={ alt } boxSize={ 5 } verticalAlign="text-top" borderRadius="sm"/>
    </chakra.span>
  );
};

const EventInterpretation = ({ eventDetail, isLoading, className }: Props) => {
  // if (!summary) {
  //   return null;
  // }
  const domain = {
    name: eventDetail?.domain_details.name,
    domainId: eventDetail?.domain_details.domainId,
    imgUrl: 'https://axieinfinity.com/images/branding/axie-infinity-logo.png',
  };

  const amount = eventDetail?.numberOfUpdates;
  // const intermediateResult = fillStringVariables(template, variables);
  // const intermediateResult = ``;
  // const variablesNames = extractVariables(intermediateResult);
  // const chunks = getStringChunks(intermediateResult);

  return (
    <Skeleton isLoaded={ !isLoading } className={ className } fontWeight={ 500 } whiteSpace="pre-wrap" >
      <HStack>
        <IconSvg name="lightning" boxSize={ 5 } color="text_secondary" mr={ 2 } verticalAlign="text-top"/>
        <chakra.span>{ amount }</chakra.span>
        <chakra.span color="text_secondary">Updates</chakra.span>
        { /*<ImageRrapper src={ collectionImgUrl } alt={ Object.keys(collection)[0] }/>*/ }
        { /*<chakra.span>{ Object.keys(collection)[0] }</chakra.span>*/ }
        <chakra.span color="text_secondary">in</chakra.span>
        <ImageRrapper
          src={ domain.imgUrl }
          alt={ domain.name ? domain.name : 'NFT Fighter' }/>
        <LinkExternal href="http://localhost:5173">
          <chakra.span>{ domain.name ? domain.name : 'NFT Fighter' }</chakra.span>
        </LinkExternal>
      </HStack>
    </Skeleton>
  );
};

export default chakra(EventInterpretation);
