/* ------------------------- External Dependencies -------------------------- */
import React from 'react';
import Button from 'atoms/Button'
/* ---------------------------- Module Package ------------------------------ */
export default props =>
<Button 
  w={1}
  py={15}
  onClick={()=>props.sendTransactionRequest()} 
  {...props.styledButton} >
  {
    props.text ? props.text : 'Send Request'
  }
</Button>
