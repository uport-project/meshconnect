/* ------------------------- External Dependencies -------------------------- */
import idx from './idx'
import React from 'react';

import { 
  Box, 
  Heading, Paragraph,
  HorizontalRule
} from 'atomic'
import EthersContractMethods from '../EthersContractMethods'

/* ---------------------------- Module Package ------------------------------ */
export default props =>
<Box boxShadow={2} p={15} {...props.styled} >
  <Heading f={[4]} color='blue' >
    {props.ethName || props.delta }
  </Heading>
  <Paragraph fw='300'><strong>network:</strong> {idx(props, _=>_.data.provider.name)}</Paragraph>
  <Paragraph fw='300'> {idx(props, _=>_.data.address)}</Paragraph>
  <HorizontalRule bi='colorWheel' />
  {props.transactions}
  {
   idx(props, _=>_.data.interface.abi) ? props.data.interface.abi.map(ethInterface => <EthersContractMethods {...ethInterface} /> ) : null
  }
</Box>
