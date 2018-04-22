/* ------------------------- External Dependencies -------------------------- */
import idx from './idx'
import React from 'react';
import Button from 'atoms/Button'
import {
  Flex, Box, Container,
  Heading, Image, Paragraph, Link, Span, 
  BackgroundImage, BackgroundGradient
} from 'atomic'
/* ---------------------------- Module Package ------------------------------ */
export default props => props.status && !props.data ? null :
<Flex align='center' justify='center' color="charcoal" >
    <Container bg="white" boxShadow={2} br={20} mt={50} w={[220]} ta="center" >
      <Box
        borderRadius={9999999}
        bc="white"
        b="2px solid #FFF"
        boxShadow={2}
        of="hidden"
        mt={-50}
        ml="auto"
        mr="auto"
        h={100}
        w={100}
      >
        <BackgroundImage 
          src={idx(props, _=>_.data.avatar.uri)}
        />
      </Box>
      <Box
        p={15}
        ta="center"
      >
        <Heading level={[3]} f={[3,4]} color="purple" >
          {idx(props, _=>_.data.name)}
        </Heading>
        <Paragraph f={[1]}>
          {idx(props, _=>_.data.email)}
        </Paragraph>
        <Paragraph f={[1]}>
          {idx(props, _=>_.data.phone)}
        </Paragraph>
        <Paragraph f={[1]}>
          {idx(props, _=>_.data.location)}
        </Paragraph>
      </Box>
    </Container>
</Flex>