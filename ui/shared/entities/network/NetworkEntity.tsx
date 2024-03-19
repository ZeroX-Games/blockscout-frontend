import type { As } from '@chakra-ui/react';
import { Box, Flex, Skeleton, Tooltip, chakra, VStack, useColorModeValue } from '@chakra-ui/react';
import _omit from 'lodash/omit';
import React from 'react';

import { route } from 'nextjs-routes';

import { useAddressHighlightContext } from 'lib/contexts/addressHighlight';
import { DOMAIN_CHAIN_TYPES } from 'lib/domain/domainChainTypes';
import * as EntityBase from 'ui/shared/entities/base/components';

import { getIconProps } from '../base/utils';

type LinkProps = EntityBase.LinkBaseProps & Pick<EntityProps, 'chainId'>;

const Link = chakra((props: LinkProps) => {
  const name = DOMAIN_CHAIN_TYPES[`${ props.chainId }`].icon;
  const defaultHref = route({ pathname: '/network/[name]', query: { ...props.query, name: name } });

  return (
    <EntityBase.Link
      { ...props }
      href={ props.href ?? defaultHref }
    >
      { props.children }
    </EntityBase.Link>
  );
});

type IconProps = Pick<EntityProps, 'chainId' | 'isLoading' | 'iconSize' | 'noIcon' | 'isSafeAddress'> & {
  asProp?: As;
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
  const iconName = DOMAIN_CHAIN_TYPES[`${ props.chainId }`].icon;

  return (
    <Tooltip label={ iconName }>
      <Flex >
        { /*<AddressIdenticon*/ }
        { /*  size={ props.iconSize === 'lg' ? 30 : 20 }*/ }
        { /*  hash={ props.address.hash }*/ }
        { /*/>*/ }
        <EntityBase.Icon
          { ...props }
          name={ iconName }
          color="green.500"
          borderRadius={ 0 }
        />
      </Flex>
    </Tooltip>
  );
};

type ContentProps = Omit<EntityBase.ContentBaseProps, 'text'> & Pick<EntityProps, 'chainId' | 'txHash'>;

const Content = chakra((props: ContentProps) => {
  if (props.chainId) {
    const network = DOMAIN_CHAIN_TYPES[`${ props.chainId }`];
    const name = network.title;
    const hash = props.txHash;
    const label = (
      <VStack gap={ 0 } py={ 1 } color="inherit">
        <Box fontWeight={ 600 } whiteSpace="pre-wrap" wordBreak="break-word">{ name }</Box>
        <Box whiteSpace="pre-wrap" wordBreak="break-word">{ hash }</Box>
      </VStack>
    );

    return (
      <Tooltip label={ label } maxW="100vw">
        <Skeleton isLoaded={ !props.isLoading } overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" as="span">
          { name }
        </Skeleton>
      </Tooltip>
    );
  }

  return (
    <EntityBase.Content
      { ...props }
      text="unknown"
    />
  );
});

type CopyProps = Omit<EntityBase.CopyBaseProps, 'text'> & Pick<EntityProps, 'txHash'>;

const Copy = (props: CopyProps) => {
  return (
    <EntityBase.Copy
      { ...props }
      text={ props.txHash }
    />
  );
};

const Container = EntityBase.Container;

export interface EntityProps extends EntityBase.EntityBaseProps {
  chainId: number;
  txHash: string;
  isSafeAddress?: boolean;
}

const NetworkEntry = (props: EntityProps) => {
  const linkProps = _omit(props, [ 'className' ]);
  const partsProps = _omit(props, [ 'className', 'onClick' ]);

  const context = useAddressHighlightContext();
  const highlightedBgColor = useColorModeValue('blue.50', 'blue.900');
  const highlightedBorderColor = useColorModeValue('blue.200', 'blue.600');

  return (
    <Container
      className={ props.className }
      data-hash={ props.txHash }
      onMouseEnter={ context?.onMouseEnter }
      onMouseLeave={ context?.onMouseLeave }
      position="relative"
      _before={ !props.isLoading && context?.highlightedAddress === String(props.chainId) ? {
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

export default React.memo(chakra(NetworkEntry));

export {
  Container,
  Link,
  Icon,
  Content,
  Copy,
};
