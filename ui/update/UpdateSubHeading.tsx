import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { UPDATE_INTERPRETATION } from 'stubs/updateInterpretation';
import AccountActionsMenu from 'ui/shared/AccountActionsMenu/AccountActionsMenu';
import NetworkExplorers from 'ui/shared/NetworkExplorers';
// import { TX_ACTIONS_BLOCK_ID } from 'ui/tx/details/txDetailsActions/TxDetailsActionsWrapper';
import UpdateInterpretation from 'ui/update/interpretation/UpdateInterpretation';

type Props = {
  hash?: string;
  hasTag: boolean;
}

const UpdateSubHeading = ({ hash, hasTag }: Props) => {
  const hasInterpretationFeature = config.features.txInterpretation.isEnabled;

  const updateInterpretationQuery = useApiQuery('update_interpretation', {
    pathParams: { hash },
    queryOptions: {
      enabled: Boolean(hash) && hasInterpretationFeature,
      placeholderData: UPDATE_INTERPRETATION,
    },
  });

  // const hasInterpretation = hasInterpretationFeature &&
  //   (txInterpretationQuery.isPlaceholderData || Boolean(txInterpretationQuery.data?.data.summaries.length));
  return (
    <Box display={{ base: 'block', lg: 'flex' }} alignItems="center" w="100%">
      <Flex mr={{ base: 0, lg: 6 }} flexWrap="wrap" alignItems="center">
        <UpdateInterpretation
          summary={ updateInterpretationQuery.data?.data.summaries[0] }
          isLoading={ updateInterpretationQuery.isPlaceholderData } // TODO: loading state
          fontSize="lg"
        />
        { /*{ !txInterpretationQuery.isPlaceholderData && txInterpretationQuery.data?.data.summaries &&
          txInterpretationQuery.data?.data.summaries.length > 1 &&*/ }
        { /*  <Link ml={ 3 } href={ `#${ TX_ACTIONS_BLOCK_ID }` }>all actions</Link> }*/ }
      </Flex>
      { /*{ !hasInterpretation && <TxEntity hash={ hash } noLink noCopy={ false } fontWeight={ 500 } mr={{ base: 0, lg: 2 }} fontFamily="heading"/> }*/ }
      <Flex alignItems="center" justifyContent={{ base: 'start', lg: 'space-between' }} flexGrow={ 1 }>
        { !hasTag && <AccountActionsMenu mr={ 3 } mt={{ base: 3, lg: 0 }}/> }
        <NetworkExplorers type="tx" pathParam={ hash } ml={{ base: 0, lg: 'auto' }} mt={{ base: 3, lg: 0 }}/>
      </Flex>
    </Box>
  );
};

export default UpdateSubHeading;
