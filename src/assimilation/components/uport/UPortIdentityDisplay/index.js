/* ------------------------- External Dependencies -------------------------- */
import React from 'react';
// import idx from './idx'

import {
  Flex, Box, 
  Heading, Image, Paragraph, Link, Span, Button,
  BackgroundImage, BackgroundGradient
} from 'atomic'
import UPortIdentityCard from 'assimilation/components/uport/UPortIdentityCard'
import UPortIdentityBlockchain from 'assimilation/components/uport/UPortIdentityBlockchain'
import UPortAvatar from 'assimilation/components/uport/UPortAvatar'
import UPortAvatarMenu from 'assimilation/components/uport/UPortAvatarMenu'
import UPortIdentityAccount from 'assimilation/components/uport/UPortIdentityAccount'
/* ---------------------------- Module Package ------------------------------ */
export default props => props.status
? 
  !props.display 
  ? <UPortAvatar {...props}/>
  : {
    avatar: <UPortAvatar {...props}/>, 
    avatarMenu: <UPortAvatarMenu {...props}/>, 
    card: <UPortIdentityCard {...props}/>, 
    cardBlockchain: <UPortIdentityBlockchain {...props}/>, 
    cardAdvanced: <UPortAvatar {...props}/>, 
    cardAccount: <UPortIdentityAccount {...props}/>, 

  }[props.display] || "Select Component"

: !props.uPortGetCredentialsRequest 
  ? 
  <div>Login Disabled</div>
  :
  <Button 
    w={1}
    py={15}
    onClick={()=>props.uPortGetCredentialsRequest()} 
    {...props.styledButton} >
    {
      props.text ? props.text : 'ΞID Login'
    }
  </Button>