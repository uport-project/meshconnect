/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { Field } from 'redux-form'
import idx from './idx'
/* ------------------------- Internal Dependencies -------------------------- */
// atoms
import StyleFieldDefault from 'static/style/StyleFieldDefault'
import SVG from 'atoms/SVG'
import Box from 'atoms/Box'
import Flex from 'atoms/Flex'
import Button from 'atoms/Button'
import Heading from 'atoms/Heading'
import Paragraph from 'atoms/Paragraph'
import Span from 'atoms/Span'
import List from 'atoms/List'
import Form from 'molecules/Form'
import ReduxField from 'organisms/ReduxField'

import UportCredentialsRequest from 'assimilation/containers/uport/UPortCredentialsRequest'
/* ---------------------------- Form Component ------------------------------ */
export default ({ handleSubmit, isSubmitting, styled, ...props}) =>
<Box w={1}>
  <Box py={25}>
      <Button 
        onClick={props.register}
        mt={25}
        gradient={!props.identityStatus ? 'cherry' : 'blue'} w={1} py={15} >
        Register
      </Button>
    </Box>
    <Heading f={[4,5]} mt={25} ta="center" >
      Registered ΞID<Span f={3} >'s</Span>
    </Heading>
    <Flex direction="column" >
      {
        !props.registeredEntityRequestStatus &&
        !idx(props, _=>_.registeredEntityRequest[1]) // TODO(@kamescg): Dirty way to check if data is in array format. Could be done better.
        ? null : 
      props.registeredEntityRequest.map((address, i)=>
      !idx(props, _=>_.entityList[i]) ? null :
      <Box bg="grayLight" boxShadow={0} color="charcoal" ta="left" mb={10} p={15} >
        <Heading f={[3,4]} color="purple" >
          <Span py={10} >{ idx(props, _=>_.entityList[i][0])}</Span>
        </Heading>
        <Span py={10} >{address}</Span>
        <Paragraph f={[1]}>
          <Span py={10} >Approved: { `${props.entityList[i][1]}`}</Span><br/>
          <Span py={10} >Active: { `${props.entityList[i][2]}`}</Span><br/>
        </Paragraph>
        <Box>
          <Paragraph f={[1]}>
            <Span py={10} >Arrived At: { 
              idx(props, _=>_.entityList[i][3])
              ? props.entityList[i][3].toNumber()
              : null
              }</Span>
          </Paragraph>
          <Paragraph f={[1]}>
            <Span py={10} >Departed At: { 
              idx(props, _=>_.entityList[i][4])
              ? props.entityList[i][4].toNumber()
              : null
              }</Span>
          </Paragraph>
        </Box>
        <Box>
          <Paragraph f={[1]}>
            <Span py={10} >Arrivals: { 
              idx(props, _=>_.entityList[i][5])
              ? props.entityList[i][5].toNumber()
              : null
              }</Span>
          </Paragraph>
          <Paragraph f={[1]}>
            <Span py={10} >Departures: { 
              idx(props, _=>_.entityList[i][6])
              ? props.entityList[i][6].toNumber()
              : null
              }</Span>
          </Paragraph>
        </Box>
      </Box>
      )}
    </Flex>
</Box>