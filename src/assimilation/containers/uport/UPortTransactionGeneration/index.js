/* ------------------------- External Dependencies -------------------------- */
import { connect } from 'react-redux';
/* ------------------------- Internal Dependencies -------------------------- */
import { fromUport } from 'assimilation/store/selectors'
import { uPortGetCredentialsRequest } from 'assimilation/store/actions'
import UPortLoginAvatar from 'assimilation/components/uport/UPortLoginAvatar'
/* ---------------------------- Module Package ------------------------------ */

/*-* Redux *-*/
const mapStateToProps = (state, props) => ({
    data: fromUport.getDeltaData(state, `credentials`),
    status: fromUport.getDeltaStatus(state, `credentials`)
  }
)

const mapDispatchToProps = (dispatch, props) => ({
  uPortGetCredentialsRequest: ()=>dispatch(uPortGetCredentialsRequest({
    payload: {
      requested: ['name', 'firebase', 'email', 'phone', 'avatar'],
      notifications: true
    },
    metadata: {
      delta: 'credentials'
    }
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(UPortLoginAvatar);