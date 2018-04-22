/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import idx from './idx'
/* ------------------------- Internal Dependencies -------------------------- */
import Span from 'atoms/Span'
/* ---------------------------- Component ------------------------------ */
export default props => !props.accountBalanceStatus ? null :<Span w={1}>{idx(props, _=>_.accountBalance)}</Span>