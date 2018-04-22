/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { Field } from 'redux-form'

/* ------------------------- Internal Dependencies -------------------------- */
// files
// atoms
import StyleFieldDefault from 'static/style/StyleFieldDefault'
import Box from 'atoms/Box'
import Flex from 'atoms/Flex'
import Button from 'atoms/Button'
import Heading from 'atoms/Heading'
import Paragraph from 'atoms/Paragraph'
import Span from 'atoms/Span'
import Form from 'molecules/Form'
import ReduxField from 'organisms/ReduxField'
import ens from 'logic/forms/normalize/ens'
/* ---------------------------- Form Component ------------------------------ */
export default ({ handleSubmit, isSubmitting, styled, ...props}) =>
<Box w={1}>

  <Flex
    direction='column'
    justify='center'
    ta='center'
    w={1}
 >
    <Heading level={[3]} f={[5]} fw='300' mr={15} >
      Discover Blocks
    </Heading>
    <Paragraph f={[1]}>
      Scan Ethereum Blocks to locate ENS activity
    </Paragraph>
    <Box h={100} ofy='scroll' >

    {
    !(props.transactions) ? null :props.transactions.map(i=> 
      <Heading level={[6]} f={[1]} key={i} >
        {i}
      </Heading> ) 
    }
    </Box>
  </Flex>

  <Form {...styled}
w={1}>
  <Flex align='center' justify='center' mh={50} >
  
  {
    (!props.data && props.status) ? 
    <Heading level={[3]} f={[3]} ta='center' fw='300' >
      Unable To Locate Wallet
    </Heading>
    :null
  }
  </Flex>
  <Heading level={[3]} f={[3,4]} ta='center' my={20} >
    Searh Blocks to find <Span fw='300'>latest ENS Activity.</Span>
  </Heading>
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
    <Button type="submit" onClick={handleSubmit} gradient='cherry'w={1} py={20} >Locate Address</Button>
  </Box>
</Form>
</Box>