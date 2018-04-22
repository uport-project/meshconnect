/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { Field } from 'redux-form'

/* ------------------------- Internal Dependencies -------------------------- */
// files
// atoms
import StyleFieldDefault from 'static/style/StyleFieldDefault'
import Box from 'atoms/Box'
import Button from 'atoms/Button'
import Form from 'molecules/Form'
import ReduxField from 'organisms/ReduxField'
import ens from 'logic/forms/normalize/ens'

import EthersBlockchainBlockTransactions from 'assimilation/components/ethers/EthersBlockchainBlockTransactions'

/* ---------------------------- Form Component ------------------------------ */
export default ({ handleSubmit, isSubmitting, styled, ...props}) =>
<Box w={1}>
  <Form {...styled} w={1}>
    <Box >
      <Field name="ethBlockNumber" 
        placeholder="Block Number" 
        component={ReduxField} type="text" 
        {...StyleFieldDefault} h={50}
        normalize={ens}
      />
      <Field name="countBackwards" 
        placeholder="Scan Count (Reverse) " 
        component={ReduxField} type="text" 
        {...StyleFieldDefault} h={50}
        normalize={ens}
      />
    </Box>
    <Box mt={10} >
      <Button type="submit" onClick={handleSubmit} gradient='cherry'w={1} py={20} >Scan Blockchain</Button>
    </Box>
  </Form>
  <Box>
    {!(props.blocks) ? null :props.blocks.map(props=> <EthersBlockchainBlockTransactions {...props}/> )}
  </Box>
</Box>