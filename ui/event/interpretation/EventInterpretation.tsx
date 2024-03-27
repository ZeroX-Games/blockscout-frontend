import { Skeleton, chakra, Image, HStack } from '@chakra-ui/react';
import React from 'react';

import type { EventDetail } from 'types/api/event';

import IconSvg from 'ui/shared/IconSvg';
import LinkExternal from 'ui/shared/LinkExternal';

// import { extractVariables, getStringChunks, fillStringVariables, NATIVE_COIN_SYMBOL_VAR_NAME } from './utils';

type Props = {
  eventDetail: EventDetail;
  isLoading?: boolean;
  className?: string;
}

const ImageRrapper = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <chakra.span
      flexShrink={ 0 }
      borderRadius="sm"
    >
      <Image src={ src } alt={ alt } boxSize={ 8 } verticalAlign="text-top" borderRadius="sm"/>
    </chakra.span>
  );
};

const EventInterpretation = ({ eventDetail, isLoading, className }: Props) => {
  // if (!summary) {
  //   return null;
  // }
  const application = {
    name: eventDetail.application_details.name,
    applicationID: eventDetail.application_details.applicationID,
    imgUrl: eventDetail.application_details.details.appLogoUrl,
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
          src={ application.imgUrl }
          alt={ application.name }/>
        <LinkExternal href="http://localhost:5173">
          <chakra.span>{ application.name }</chakra.span>
        </LinkExternal>
      </HStack>
    </Skeleton>
  );
};

export default chakra(EventInterpretation);
