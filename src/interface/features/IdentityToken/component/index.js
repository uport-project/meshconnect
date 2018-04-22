/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
/* ------------------------- Internal Dependencies -------------------------- */
import Span from 'atoms/Span'
/* ---------------------------- Component ------------------------------ */
export default props => !props.tokenBalanceStatus ? null : <Span>{props.tokenBalanceData.balance.toNumber()}</Span>