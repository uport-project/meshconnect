/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { Field } from 'redux-form'

/* ------------------------- Internal Dependencies -------------------------- */
import StyleFieldDefault from 'static/style/StyleFieldDefault'
import Box from 'atoms/Box'
import Flex from 'atoms/Flex'
import Button from 'atoms/Button'
import Heading from 'atoms/Heading'
import Span from 'atoms/Span'
import Form from 'molecules/Form'
import ReduxField from 'organisms/ReduxField'
import ens from 'logic/forms/normalize/ens'
/* ---------------------------- Form Component ------------------------------ */
export default ({ handleSubmit, isSubmitting, styled, ...props}) =>
<Form {...styled} w={1}>
  <Flex align='center' mh={50} >
  {
  !(props.data && props.status) ? null :
    <Heading f={[4]} color={props.color} fw='500' >
      <Span fw="700">Wallet Address:</Span> {props.data}
    </Heading>
  }
  {
    (!props.data && props.status) ? 
    <Heading f={[3]} color={props.color} fw='300' >
      Unable To Locate Wallet
    </Heading>
    :null
  }
  </Flex>
  <Box >
    <Field name="ethEnsName" 
      placeholder="Ethereum Name System (Enter Name)" 
      component={ReduxField} type="text" 
      {...StyleFieldDefault} h={50}
      normalize={ens}
     />
  </Box>
  <Box mt={10} >
    <Button type="submit" onClick={handleSubmit} gradient='cherry'w={1} py={20} >Locate Address</Button>
  </Box>
</Form>
