/* ------------------------- External Dependencies -------------------------- */
// import idx from './idx'
import React from 'react';
import Box from 'atoms/Box'
import Button from 'atoms/Button'
import Heading from 'atoms/Heading'
/* ---------------------------- Module Package ------------------------------ */
export default props => !props ? null :
<Box 
  ta='center'
  py={25}
>
  <Heading level={[3,4]} f={[3]}>
    Login To Reveal Action
  </Heading>
  {
  !props.status ? null : 
  <Button 
    onClick={()=>props.uPortGetAttestCredentialsRequest(props.data.address)} 
    gradient="cherry"
  >
    Request 100 PAK Tokens
  </Button>
  }
</Box>