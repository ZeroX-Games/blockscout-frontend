import { chakra } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import * as EntityBase from '../base/components';
import type { EntityProps } from './EventEntity';

type LinkProps = EntityBase.LinkBaseProps & Pick<EntityProps, 'number'>;

const Link = chakra((props: LinkProps) => {
  const eventId = String(props.number);
  const defaultHref = route({ pathname: '/event/[event_id]', query: { event_id: eventId } });

  return (
    <EntityBase.Link
      { ...props }
      href={ props.href ?? defaultHref }
    >
      { props.children }
    </EntityBase.Link>
  );
});

type IconProps = Omit<EntityBase.IconBaseProps, 'name'> & {
  name?: EntityBase.IconBaseProps['name'];
};

const Icon = (props: IconProps) => {
  return (
    <EntityBase.Icon
      { ...props }
      name={ props.name ?? 'block_slim' }
    />
  );
};

export { Link, Icon };

export type { LinkProps, IconProps };
