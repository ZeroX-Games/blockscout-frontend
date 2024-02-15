import { Box, Grid, Skeleton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import TruncatedValue from 'ui/shared/TruncatedValue';

interface Props {
  data: any;
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
const Row = ({ row, isLoading }: any & { isLoading?: boolean }) => {
  // const content = (() => {
  //
  // });
  return (
    <>
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
  // const bgColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
  const gridTemplateColumnsBase = `120px repeat(${ data.attributes.length }, 75px)`;
  // const gridTemplateColumnsLg = `80px repeat(${ data.attributes.length }, minmax(0, 1fr)`;
  const selector = `&>:nth-of-type(${ data.attributes.length + 1 }n - ${ data.attributes.length })`;
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
        <HeaderItem isLoading={ isLoading }>Name</HeaderItem>
        { data.attributes.map((att: any) => {
          return <HeaderItem key={ att } isLoading={ isLoading }>{ att }</HeaderItem>;
        }) }
        { data.values.map((row: any, index: any) => {
          return <Row key={ index } row={ row } isLoading={ isLoading }/>;
        }) }
      </Grid>
    </Box>
  );
};

export default LogUpdatedTokenDataTable;
