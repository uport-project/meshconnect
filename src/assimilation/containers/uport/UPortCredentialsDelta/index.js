/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { connect } from 'react-redux';
/* ------------------------- Internal Dependencies -------------------------- */
import { fromUport } from 'assimilation/store/selectors'
import { uPortGetCredentialsRequest } from 'assimilation/store/actions'
import UPortCardSimple from 'assimilation/components/uport/UPortCardSimple'
/* ---------------------------- Module Package ------------------------------ */
const mapStateToProps = (state, props) => ({
    data: fromUport.getDeltaData(state, `credentials`),
    status: fromUport.getDeltaStatus(state, `credentials`)
  }
)

export default connect(mapStateToProps)(UPortCardSimple);