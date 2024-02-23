import type { As } from '@chakra-ui/react';
import { Flex, Skeleton, Tooltip, chakra, useColorModeValue } from '@chakra-ui/react';
import _omit from 'lodash/omit';
import React from 'react';

import type { DomainParam } from 'types/api/domainParams';

import { route } from 'nextjs-routes';

import { useAddressHighlightContext } from 'lib/contexts/addressHighlight';
import * as EntityBase from 'ui/shared/entities/base/components';

import { getIconProps } from '../base/utils';
import DomainIdenticon from './DomainIdenticon';

type LinkProps = EntityBase.LinkBaseProps & Pick<EntityProps, 'domain'>;

const Link = chakra((props: LinkProps) => {
  const defaultHref = route({ pathname: '/address/[hash]', query: { ...props.query, hash: props.domain.hash } });

  return (
    <EntityBase.Link
      { ...props }
      href={ props.href ?? defaultHref }
    >
      { props.children }
    </EntityBase.Link>
  );
});

type IconProps = Pick<EntityProps, 'domain' | 'isLoading' | 'iconSize' | 'noIcon' | 'isSafeAddress'> & {
  asProp?: As;
  start?: boolean;
};

const Icon = (props: IconProps) => {
  if (props.noIcon) {
    return null;
  }

  const styles = {
    ...getIconProps(props.iconSize),
    marginRight: 2,
  };

  if (props.isLoading) {
    return <Skeleton { ...styles } borderRadius="full" flexShrink={ 0 }/>;
  }

  // if (props.address.is_contract) {
  //   if (props.isSafeAddress) {
  //     return (
  //       <EntityBase.Icon
  //         { ...props }
  //         name="brands/safe"
  //       />
  //     );
  //   }
  //
  //   if (props.address.is_verified) {
  //     return (
  //       <Tooltip label="Verified contract">
  //         <span>
  //           <EntityBase.Icon
  //             { ...props }
  //             name="contract_verified"
  //             color="green.500"
  //             borderRadius={ 0 }
  //           />
  //         </span>
  //       </Tooltip>
  //     );
  //   }
  //
  //   return (
  //     <Tooltip label="Contract">
  //       <span>
  //         <EntityBase.Icon
  //           { ...props }
  //           name="contract"
  //           borderRadius={ 0 }
  //         />
  //       </span>
  //     </Tooltip>
  //   );
  // }

  let imgUrl;
  if (props.start) {
    // domain
    imgUrl = 'https://axieinfinity.com/images/branding/axie-infinity-logo.png';
  } else {
    //collection
    imgUrl = 'https://i.seadn.io/gae/_BYA3bhx1ebgDr3QsuQuh2OMSznmS_TkwJhikCtCVMh4RUcpn2gnJmmOHHA28gy0mKP50flV31iXsDBUr_zjBaXNJA?auto=format&dpr=1&w=64 64w';
  }

  return (
    <Tooltip label={ props.domain.implementation_name }>
      <Flex marginRight={ styles.marginRight }>
        <DomainIdenticon
          size={ props.iconSize === 'lg' ? 40 : 30 }
          src={ imgUrl }
          name="Axie Infinity"
        />
      </Flex>
    </Tooltip>
  );
};

type ContentProps = Omit<EntityBase.ContentBaseProps, 'text'> & Pick<EntityProps, 'domain'>;

const Content = chakra((props: ContentProps) => {
  // if (props.domain.name || props.domain.ens_domain_name) {
  //   const text = props.domain.ens_domain_name || props.domain.name;
  //   // const text = 'GTA V';
  //   const label = (
  //     <VStack gap={ 0 } py={ 1 } color="inherit">
  //       <Box fontWeight={ 600 } whiteSpace="pre-wrap" wordBreak="break-word">{ text }</Box>
  //       <Box whiteSpace="pre-wrap" wordBreak="break-word">{ props.domain.hash }</Box>
  //     </VStack>
  //   );
  //
  //   return (
  //     <Tooltip label={ label } maxW="100vw">
  //       <Skeleton isLoaded={ !props.isLoading } overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" as="span">
  //         { text }
  //       </Skeleton>
  //     </Tooltip>
  //   );
  // }
  const text = 'Axie Infinity';
  return (
    <EntityBase.Content
      { ...props }
      // text={ props.domain.hash }
      text={ text }
    />
  );
});

type CopyProps = Omit<EntityBase.CopyBaseProps, 'text'> & Pick<EntityProps, 'domain'>;

const Copy = (props: CopyProps) => {
  return (
    <EntityBase.Copy
      { ...props }
      text={ props.domain.hash }
    />
  );
};

const Container = EntityBase.Container;

export interface EntityProps extends EntityBase.EntityBaseProps {
  domain: Pick<DomainParam, 'hash' | 'name' | 'is_contract' | 'is_verified' | 'implementation_name' | 'ens_domain_name'>;
  isSafeAddress?: boolean;
  start?: boolean;
}

const DomainEntry = (props: EntityProps) => {
  const linkProps = _omit(props, [ 'className' ]);
  const partsProps = _omit(props, [ 'className', 'onClick' ]);

  const context = useAddressHighlightContext();
  const highlightedBgColor = useColorModeValue('blue.50', 'blue.900');
  const highlightedBorderColor = useColorModeValue('blue.200', 'blue.600');

  return (
    <Container
      className={ props.className }
      data-hash={ props.domain.hash }
      onMouseEnter={ context?.onMouseEnter }
      onMouseLeave={ context?.onMouseLeave }
      position="relative"
      _before={ !props.isLoading && context?.highlightedAddress === props.domain.hash ? {
        content: `" "`,
        position: 'absolute',
        py: 1,
        pl: 1,
        pr: props.noCopy ? 2 : 0,
        top: '-5px',
        left: '-5px',
        width: `100%`,
        height: '100%',
        borderRadius: 'base',
        borderColor: highlightedBorderColor,
        borderWidth: '1px',
        borderStyle: 'dashed',
        bgColor: highlightedBgColor,
        zIndex: -1,
      } : undefined }
    >
      <Icon { ...partsProps }/>
      <Link { ...linkProps }>
        <Content { ...partsProps }/>
      </Link>
      <Copy { ...partsProps }/>
    </Container>
  );
};

export default React.memo(chakra(DomainEntry));

export {
  Container,
  Link,
  Icon,
  Content,
  Copy,
};
