/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
/* ------------------------- Internal Dependencies -------------------------- */
import { Button } from 'atomic'
/* ------------------------------- Component -------------------------------- */
const LoginButton = ({ ...props }) => 
!(props.identity && props.identity.address) 
? null 
: <Button onClick={()=>props.identityLogin(props.identity)} {...props} {...props.styled}>
    {props.children}
  </Button>

LoginButton.defaultProps = {
  f: [0],
  fw: [300],
  py: [5, 7],
  px: [8, 10],
}

/* ---------------------------- Export Package ------------------------------ */
export default LoginButton