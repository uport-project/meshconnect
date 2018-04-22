/* ------------------------- External Dependencies -------------------------- */
import { connect } from 'react-redux';

/* ------------------------- Internal Dependencies -------------------------- */
import Component from './component';

/* ------------------------ Initialize Dependencies ------------------------- */
import { fromUport } from 'assimilation/store/selectors'

/* ---------------------------- Module Package ------------------------------ */
import { authLoginWithIdentity } from 'store/departments/actions'

const mapStateToProps = (state) => ({
  identity: fromUport.getDeltaData(state, 'credentials')
})

const mapDispatchToProps = (dispatch, props) => ({
  identityLogin: data => dispatch(authLoginWithIdentity({
    payload: data
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Component);
