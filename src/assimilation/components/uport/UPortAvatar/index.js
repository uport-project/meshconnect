/* ------------------------- External Dependencies -------------------------- */
import idx from './idx'
import React from 'react';
import {
  Flex, Box, 
  Heading,
  BackgroundImage
} from 'atomic'
/* ---------------------------- Module Package ------------------------------ */
export default props => props.status && !props.data.avatar ? null :
<Flex align="center" {...props.styled} >
  <Box
    borderRadius={9999999}
    bc="white"
    b="2px solid #FFF"
    boxShadow={2}
    mr={15}
    of="hidden"
    h={50}
    w={50}
  >
    <BackgroundImage 
      src={idx(props, _=>_.data.avatar.uri)}
    />
  </Box>
  <Heading level={[3]} f={[3]} m={0}>
    {idx(props, _=>_.data.name)}
  </Heading>
</Flex>