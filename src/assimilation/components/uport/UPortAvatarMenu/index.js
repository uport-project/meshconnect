/* ------------------------- External Dependencies -------------------------- */
import idx from './idx'
import React from 'react';
import {
  Flex, Box, 
  Heading, Paragraph,
  BackgroundImage
} from 'atomic'
import DialogOpen from 'containers/dialog/DialogOpen'
import { PopoverPure } from 'containers'
/* ---------------------------- Module Package ------------------------------ */
const Body = props => 
<Box w={[1,1,675]} boxShadow={2} hover={{boxShadow: 3}}  br={10} {...props.styled} >
  <Flex direction={['column', 'row']} >
    <Box w={[1,1,0.45]} gradient='blue' color='white' p={[10,20]} bs={1} >
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
        <Heading level={[3]} f={[3,4]}>
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
    </Box>
    <Box w={[1,1,0.7]} bg='white' color='charcoal'p={[10,15]} bs={1}>
        <Box h={[300, 450]}>
          <Heading f={[4]} color="blue" >
            Biography
          </Heading>
          <Paragraph f={[1]}>
            {idx(props, _=>_.data.identityBiography)}
          </Paragraph>
        </Box>
    </Box>
  </Flex>
</Box>


export default props => props.status && !props.data.avatar ? null :
<Flex align="center" {...props.styled} >
  <PopoverPure delta='MenuIdentityMenu' body={Body} {...props} >
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
  </PopoverPure>
  <Heading level={[3]} f={[3]} m={0} >
    {idx(props, _=>_.data.name)}
  </Heading>
</Flex>