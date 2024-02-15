import { Skeleton, chakra, Image, HStack } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type {
  UpdateInterpretationSummary,
  UpdateInterpretationVariable,
  UpdateInterpretationVariableString,
} from 'types/api/updateInterpretation';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import * as mixpanel from 'lib/mixpanel/index';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import EnsEntity from 'ui/shared/entities/ens/EnsEntity';
import TokenEntity from 'ui/shared/entities/token/TokenEntity';
import IconSvg from 'ui/shared/IconSvg';

// import { extractVariables, getStringChunks, fillStringVariables, NATIVE_COIN_SYMBOL_VAR_NAME } from './utils';

type Props = {
  summary?: UpdateInterpretationSummary;
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

const UpdateInterpretation = ({ summary, isLoading, className }: Props) => {
  // if (!summary) {
  //   return null;
  // }
  let amount; let collection; let domain;
  if (!summary) {
    amount = '1453';
    collection = {
      name: 'Azuki',
      // eslint-disable-next-line max-len
      imgUrl: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=48 48w',
    };
    domain = {
      name: 'GTA V',
      imgUrl: 'https://i.pinimg.com/564x/72/b6/08/72b608e2d9760300ca8773481a7a509a.jpg',
    };
  } else {
    amount = summary.amount;
    collection = {
      name: summary.collection.name,
      imgUrl: summary.collection.imgUrl,
    };
    domain = {
      name: summary.domain.name,
      imgUrl: summary.domain.imgUrl,
    };
  }
  // const intermediateResult = fillStringVariables(template, variables);
  // const intermediateResult = ``;
  // const variablesNames = extractVariables(intermediateResult);
  // const chunks = getStringChunks(intermediateResult);

  return (
    <Skeleton isLoaded={ !isLoading } className={ className } fontWeight={ 500 } whiteSpace="pre-wrap" >
      <HStack>
        <IconSvg name="lightning" boxSize={ 5 } color="text_secondary" mr={ 2 } verticalAlign="text-top"/>
        { /*{ chunks.map((chunk, index) => {*/ }
        { /*  return (*/ }
        { /*    <chakra.span key={ chunk + index }>*/ }
        { /*      <chakra.span color="text_secondary">{ chunk.trim() + (chunk.trim() && variablesNames[index] ? ' ' : '') }</chakra.span>*/ }
        { /*      { index < variablesNames.length && (*/ }
        { /*        variablesNames[index] === NATIVE_COIN_SYMBOL_VAR_NAME ?*/ }
        { /*          <chakra.span>{ currencyUnits.ether + ' ' }</chakra.span> :*/ }
        { /*          <TxInterpretationElementByType variable={ variables[variablesNames[index]] as NonStringTxInterpretationVariable }/>*/ }
        { /*      ) }*/ }
        { /*    </chakra.span>*/ }
        { /*  );*/ }
        { /*}) }*/ }
        <chakra.span color="text_secondary">Update</chakra.span>
        <chakra.span>{ amount }</chakra.span>
        <ImageRrapper src={ collection.imgUrl } alt={ collection.name }/>
        <chakra.span>{ collection.name }</chakra.span>
        <chakra.span color="text_secondary">in</chakra.span>
        <ImageRrapper src={ domain.imgUrl } alt={ domain.name }/>
        <chakra.span>{ domain.name }</chakra.span>
      </HStack>
    </Skeleton>
  );
};

export default chakra(UpdateInterpretation);
