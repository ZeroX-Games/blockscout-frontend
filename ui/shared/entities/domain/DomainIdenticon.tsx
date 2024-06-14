import { Box, Image } from '@chakra-ui/react';
// import dynamic from 'next/dynamic';
import React from 'react';

// import config from 'configs/app';
// import IdenticonGithub from 'ui/shared/IdenticonGithub';

// interface IconProps {
//   hash: string;
//   size: number;
// }

interface IconImageProps {
  src: string;
  size: number;
  name: string;
}

// const Icon = dynamic(
//   async() => {
//     switch (config.UI.views.address.identiconType) {
//       case 'github': {
//         // eslint-disable-next-line react/display-name
//         return (props: IconProps) => <IdenticonGithub size={ props.size } seed={ props.hash }/>;
//       }
//
//       case 'blockie': {
//         const { blo } = (await import('blo'));
//
//         // eslint-disable-next-line react/display-name
//         return (props: IconProps) => {
//           const data = blo(props.hash as `0x${ string }`, props.size);
//           return (
//             <Image
//               src={ data }
//               alt={ `Identicon for ${ props.hash }}` }
//             />
//           );
//         };
//       }
//
//       case 'jazzicon': {
//         const Jazzicon = await import('react-jazzicon');
//
//         // eslint-disable-next-line react/display-name
//         return (props: IconProps) => {
//           return (
//             <Jazzicon.default
//               diameter={ props.size }
//               seed={ Jazzicon.jsNumberForAddress(props.hash) }
//             />
//           );
//         };
//       }
//
//       case 'gradient_avatar': {
//         const GradientAvatar = (await import('gradient-avatar')).default;
//
//         // eslint-disable-next-line react/display-name
//         return (props: IconProps) => {
//           const svg = GradientAvatar(props.hash, props.size);
//           return <div dangerouslySetInnerHTML={{ __html: svg }}/>;
//         };
//       }
//
//       default: {
//         return () => null;
//       }
//     }
//   }, {
//     ssr: false,
//   });

type Props = IconImageProps;

const DomainIdenticon = ({ size, src, name }: Props) => {
  return (
    <Box boxSize={ `${ size }px` }
      borderRadius="5PX"
      overflow="hidden"
    >
      { /*<Icon size={ size } hash={ hash }/>*/ }
      <Image
        src={ src }
        alt={ `Identicon for ${ name }}` }
        w="auto"
        h="100%"
      />
    </Box>
  );
};

export default React.memo(DomainIdenticon);