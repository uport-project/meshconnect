/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
/* ------------------------- Internal Dependencies -------------------------- */
import {
  Box, Container, Flex,  Button,
  Heading, Paragraph,
  BackgroundGradient
} from 'atomic'

import PunchTheClock from 'features/PunchTheClock'
/* ------------------------------- Component -------------------------------- */
export default props =>
<Box align='center' justify='center'>
  <Container w={[520]} py={50}>
    <PunchTheClock
      contractAddress="0x565b6d77edac2edd9551177620e6f1185dc5feac"
      contractName="PunchTheClock"
      />
  </Container>
</Box>