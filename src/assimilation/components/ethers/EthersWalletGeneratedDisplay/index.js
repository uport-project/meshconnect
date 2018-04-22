/* ------------------------- External Dependencies -------------------------- */
import idx from './idx'
import React from 'react';
import HorizontalRule from 'atoms/HorizontalRule'
import Box from 'atoms/Box'
import Flex from 'atoms/Flex'
import Button from 'atoms/Button'
import Heading from 'atoms/Heading'
import Paragraph from 'atoms/Paragraph'
/* ---------------------------- Module Package ------------------------------ */
export default props => !props.data ? null :
<Box>
  <Flex align='center' >
    <Box w={[1,1,0.7]} >
      <Heading level={[3]} f={[4,5]} color='blue' >
        Ethereum Wallet Generator
      </Heading>
    </Box>
    <Box w={[1,1,0.3]} >
      <Button gradient='cherry' onClick={()=>props.ethersWalletCreateRandomRequest()}>
        Randomly Generate Wallet
      </Button>
    </Box>
  </Flex>
  <HorizontalRule bi='colorWheel' bs={1} w={[1]} />
  <Box>
      <Heading level={[3]} f={[3]} color='blue' >
        <strong>Private Key:</strong> {idx(props, _=>_.data.privateKey)}
      </Heading>
    <Paragraph f={[1]}>
      <strong>Default Gas Limit:</strong> {idx(props, _=>_.data.defaultGasLimit)}
    </Paragraph>
    <Paragraph f={[1]}>
      <strong>Address:</strong> {idx(props, _=>_.data.address)}
    </Paragraph>
    <Paragraph f={[1]}>
      <strong>Mnemonic:</strong> {idx(props, _=>_.data.mnemonic)}
    </Paragraph>
  </Box>
</Box>