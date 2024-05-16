import { chakra } from '@chakra-ui/react';
import _omit from 'lodash/omit';
import React from 'react';

import * as EntityBase from 'ui/shared/entities/base/components';

import { Icon, Link } from './Utils';

type ContentProps = Omit<EntityBase.ContentBaseProps, 'text'> & Pick<EntityHashProps, 'hash'>;

const Content = chakra((props: ContentProps) => {
  return (
    <EntityBase.Content
      { ...props }
      text={ props.hash }
      tailLength={ props.tailLength ?? 2 }
    />
  );
});

const Container = EntityBase.Container;

export interface EntityHashProps extends EntityBase.EntityBaseProps {
  number: number;
  hash: string;
}

const EventHashEntity = (props: EntityHashProps) => {
  const linkProps = _omit(props, [ 'className' ]);
  const partsProps = _omit(props, [ 'className', 'onClick' ]);

  return (
    <Container className={ props.className }>
      <Icon { ...partsProps }/>
      <Link { ...linkProps }>
        <Content { ...partsProps }/>
      </Link>
    </Container>
  );
};

export default React.memo(chakra(EventHashEntity));

export {
  Container,
  Content,
};
