import { Box, Grid, Skeleton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import type { MatrixEntry } from 'types/api/event';

import TruncatedValue from 'ui/shared/TruncatedValue';

interface Props {
  data: Array<MatrixEntry>;
  isLoading?: boolean;
}

const HeaderItem = ({ children, isLoading }: { children: React.ReactNode; isLoading?: boolean }) => {
  return (
    <Skeleton
      fontWeight={ 600 }
      pb={ 3 }
      pt={ 2 }
      display="inline-block"
      width="fit-content"
      height="fit-content"
      isLoaded={ !isLoading }
    >
      { children }
    </Skeleton>
  );
};

// row: [ '#7352', 10, 0, 1, 20, 1, 0 ]
const Row = ({ row, isLoading, header }: any & { isLoading?: boolean }) => {
  // const content = (() => {
  //
  // });
  return (
    <>
      <Skeleton isLoaded={ !isLoading } p={ 2 }>
        <TruncatedValue value={ header } isLoading={ isLoading } fontWeight={ 600 }/>
      </Skeleton>
      { row.map((item: any, index: any) => {
        let color; let value;
        if (isNaN(item)) {
          value = item;
        } else if (item > 0) {
          color = 'green.400';
          value = `+${ item }`;
        } else if (item < 0) {
          color = 'red.400';
          value = item;
        } else {
          value = '-';
        }
        return (
          <Skeleton isLoaded={ !isLoading } key={ index } p={ 2 }>
            <TruncatedValue value={ value } isLoading={ isLoading } fontWeight={ 600 } color={ color }/>
          </Skeleton>
        );
      }) }
    </>
  );
};

const LogUpdatedTokenDataTable = ({ data, isLoading }: Props) => {
  // create 100 random name, stored in an array
  const attributes = Array.from({ length: 100 }, () => Math.random().toString(36).substring(7));

  // const bgColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
  const gridTemplateColumnsBase = `120px repeat(${ data[0].delta.length }, 75px)`;
  // const gridTemplateColumnsLg = `80px repeat(${ data.attributes.length }, minmax(0, 1fr)`;
  const selector = `&>:nth-of-type(${ data[0].delta.length + 1 }n - ${ data[0].delta.length })`;
  return (
    <Box overflowX="scroll">
      <Grid
        gridTemplateColumns={ gridTemplateColumnsBase }
        fontSize="sm"
        lineHeight={ 5 }
        backgroundColor={ useColorModeValue('#F5F5F5', '#2D333F') }
        p={ 4 }
        pl={ 0 }
        mt={ 2 }
        w="85%"
        columnGap={ 0 }
        rowGap={ 0 }
        borderRadius="md"
        justifyItems="center"
        overflowX="auto"
        sx={{
          [selector]: {
            // backgroundColor: '#2D333F',
            backgroundColor: useColorModeValue('#F5F5F5', '#2D333F'),
            position: 'sticky',
            left: '0',
            width: '100%',
            height: '100%',
            marginLeft: '-16px',
            paddingLeft: '16px',
          },
        }}
      >
        <HeaderItem isLoading={ isLoading }>Token ID</HeaderItem>
        { attributes.map((att: any) => {
          return <HeaderItem key={ att } isLoading={ isLoading }>{ att }</HeaderItem>;
        }) }
        { data.map((row: MatrixEntry, index: any) => {
          return <Row key={ index } row={ row.delta } header={ `#${ row.token_id }` } isLoading={ isLoading }/>;
        }) }
      </Grid>
    </Box>
  );
};

export default LogUpdatedTokenDataTable;
