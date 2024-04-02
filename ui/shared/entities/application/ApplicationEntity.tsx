import type { As } from '@chakra-ui/react';
import { Flex, Skeleton, Tooltip, chakra, useColorModeValue, Box, VStack } from '@chakra-ui/react';
import _omit from 'lodash/omit';
import React from 'react';

import type { ApplicationParam } from 'types/api/applicationParams';

import { route } from 'nextjs-routes';

import { useAddressHighlightContext } from 'lib/contexts/addressHighlight';
import * as EntityBase from 'ui/shared/entities/base/components';

import { getIconProps } from '../base/utils';

type LinkProps = EntityBase.LinkBaseProps & Pick<EntityProps, 'application'>;

const Link = chakra((props: LinkProps) => {
  const defaultHref = route({ pathname: '/address/[hash]', query: { ...props.query, hash: props.application.name } });

  return (
    <EntityBase.Link
      { ...props }
      href={ props.href ?? defaultHref }
    >
      { props.children }
    </EntityBase.Link>
  );
});

type IconProps = Pick<EntityProps, 'application' | 'isLoading' | 'iconSize' | 'noIcon' | 'isSafeAddress'> & {
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
    <Tooltip label="Application">
      <Flex marginRight={ styles.marginRight }>
        <EntityBase.Icon
          { ...props }
          name="apps"
          borderRadius={ 0 }
        />
      </Flex>
    </Tooltip>
  );
};

type ContentProps = Omit<EntityBase.ContentBaseProps, 'text'> & Pick<EntityProps, 'application'>;

const Content = chakra((props: ContentProps) => {
  if (props.application.name || props.application.applicationID) {
    const hash = props.application.hash || props.application.applicationID;
    const label = (
      <VStack gap={ 0 } py={ 1 } color="inherit">
        <Box fontWeight={ 600 } whiteSpace="pre-wrap" wordBreak="break-word">{ props.application.name }</Box>
        <Box whiteSpace="pre-wrap" wordBreak="break-word">{ hash }</Box>
      </VStack>
    );

    return (
      <Tooltip label={ label } maxW="100vw">
        <Skeleton isLoaded={ !props.isLoading } overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" as="span">
          { props.application.name }
        </Skeleton>
      </Tooltip>
    );
  }
  return (
    <EntityBase.Content
      { ...props }
      text={ props.application.name }
    />
  );
});

type CopyProps = Omit<EntityBase.CopyBaseProps, 'text'> & Pick<EntityProps, 'application'> &Pick<EntityProps, 'iconSize'>;

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
  application: ApplicationParam;
  isSafeAddress?: boolean;
}

const ApplicationEntry = (props: EntityProps) => {
  const linkProps = _omit(props, [ 'className' ]);
  const partsProps = _omit(props, [ 'className', 'onClick' ]);

  const context = useAddressHighlightContext();
  const highlightedBgColor = useColorModeValue('blue.50', 'blue.900');
  const highlightedBorderColor = useColorModeValue('blue.200', 'blue.600');

  return (
    <Container
      className={ props.className }
      data-hash={ props.application.applicationID }
      onMouseEnter={ context?.onMouseEnter }
      onMouseLeave={ context?.onMouseLeave }
      position="relative"
      _before={ !props.isLoading && context?.highlightedAddress === props.application.applicationID ? {
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

export default React.memo(chakra(ApplicationEntry));

export {
  Container,
  Link,
  Icon,
  Content,
  Copy,
};
