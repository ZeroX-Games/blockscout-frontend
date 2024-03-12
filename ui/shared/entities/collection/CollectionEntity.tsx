import type { As } from '@chakra-ui/react';
import { Flex, Skeleton, Tooltip, chakra, useColorModeValue, Box, VStack } from '@chakra-ui/react';
import _omit from 'lodash/omit';
import React from 'react';

import type { CollectionParam } from 'types/api/collectionParams';

import { route } from 'nextjs-routes';

import { useAddressHighlightContext } from 'lib/contexts/addressHighlight';
import * as EntityBase from 'ui/shared/entities/base/components';

import { getIconProps } from '../base/utils';

type LinkProps = EntityBase.LinkBaseProps & Pick<EntityProps, 'collection'>;

const Link = chakra((props: LinkProps) => {
  const defaultHref = route({ pathname: '/address/[hash]', query: { ...props.query, hash: props.collection.name } });

  return (
    <EntityBase.Link
      { ...props }
      href={ props.href ?? defaultHref }
    >
      { props.children }
    </EntityBase.Link>
  );
});

type IconProps = Pick<EntityProps, 'collection' | 'isLoading' | 'iconSize' | 'noIcon' | 'isSafeAddress'> & {
  asProp?: As;
};

const Icon = (props: IconProps) => {
  if (props.noIcon) {
    return null;
  }

  const styles = {
    ...getIconProps(props.iconSize),
    marginRight: 0,
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

  return (
    <Tooltip label="Collection">
      <Flex marginRight={ styles.marginRight }>
        <EntityBase.Icon
          { ...props }
          name="collection"
          borderRadius={ 0 }
        />
      </Flex>
    </Tooltip>
  );
};

type ContentProps = Omit<EntityBase.ContentBaseProps, 'text'> & Pick<EntityProps, 'collection'>;

const Content = chakra((props: ContentProps) => {
  if (props.collection.name || props.collection.collectionId) {
    const text = 'Axie Infinity';
    const hash = props.collection.collectionId;
    const label = (
      <VStack gap={ 0 } py={ 1 } color="inherit">
        <Box fontWeight={ 600 } whiteSpace="pre-wrap" wordBreak="break-word">{ text }</Box>
        <Box whiteSpace="pre-wrap" wordBreak="break-word">{ hash }</Box>
      </VStack>
    );

    return (
      <Tooltip label={ label } maxW="100vw">
        <Skeleton isLoaded={ !props.isLoading } overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" as="span">
          { text }
        </Skeleton>
      </Tooltip>
    );
  }
  return (
    <EntityBase.Content
      { ...props }
      text={ props.collection.name || 'GTA V' + props.collection.collectionId }
    />
  );
});

type CopyProps = Omit<EntityBase.CopyBaseProps, 'text'> & Pick<EntityProps, 'collection'> &Pick<EntityProps, 'iconSize'>;

const Copy = (props: CopyProps) => {
  const styles = {
    ...getIconProps(props.iconSize),
    marginLeft: 1,
  };
  return (
    <Flex marginLeft={ styles.marginLeft }>
      <EntityBase.Copy
        { ...props }
        text="Axie Infinity"
      />
    </Flex>
  );
};

const Container = EntityBase.Container;

export interface EntityProps extends EntityBase.EntityBaseProps {
  collection: CollectionParam;
  isSafeAddress?: boolean;
}

const CollectionEntry = (props: EntityProps) => {
  const linkProps = _omit(props, [ 'className' ]);
  const partsProps = _omit(props, [ 'className', 'onClick' ]);

  const context = useAddressHighlightContext();
  const highlightedBgColor = useColorModeValue('blue.50', 'blue.900');
  const highlightedBorderColor = useColorModeValue('blue.200', 'blue.600');

  return (
    <Container
      className={ props.className }
      data-hash={ props.collection.collectionId }
      onMouseEnter={ context?.onMouseEnter }
      onMouseLeave={ context?.onMouseLeave }
      position="relative"
      _before={ !props.isLoading && context?.highlightedAddress === props.collection.collectionId ? {
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

export default React.memo(chakra(CollectionEntry));

export {
  Container,
  Link,
  Icon,
  Content,
  Copy,
};
