/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { Field } from 'redux-form'

/* ------------------------- Internal Dependencies -------------------------- */
import { Block } from 'particles'
import { Flex, Box, Button, Heading, HorizontalRule, ReduxField } from 'atomic'
import Paragraph from 'atoms/Paragraph'
import Form from 'molecules/Form'
import WalletDisplay from 'assimilation/components/ethers/EthersWalletDisplay'
/* ---------------------------- Form Component ------------------------------ */
Block.defaultProps = {is: 'form'}
export default ({ handleSubmit, isSubmitting, styled, ...props}) => (
  
<Form {...styled}>
  <Flex align='center' >
    <Box w={[1,1,0.7]} >
      <Heading level={[3]} f={[4,5]} color='blue' >
        Restore Wallet from Seed Phrase
      </Heading>
    </Box>
  </Flex>
  <HorizontalRule bi='colorWheel' bs={1} w={[1]} />
  <Paragraph f={[1]}>
    The 15 word phrase is similar to a debit card pin. Excepts, it's much longer.
  </Paragraph>
  <Box>
    <Field name="mnemonicPhrase" placeholder="Mnemonic (15 Word Phrase)" component={ReduxField} type="text" />
  </Box>
  <Box mt={10} >
    <Button type="submit" onClick={handleSubmit} gradient='cherry'w={1} >Submit</Button>
  </Box>
  {
    !props.data ? null :
    <WalletDisplay data={props.data}/>
  }
</Form>
)