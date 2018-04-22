/* ------------------------- External Dependencies -------------------------- */
import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose'
import uuid from 'uuid/v1'
/* ------------------------- Internal Dependencies -------------------------- */
import { fromUport } from 'assimilation/store/selectors'
import { uPortGetCredentialsRequest, uPortGetAttestCredentialsRequest } from 'assimilation/store/actions'
import UPortIdentityDisplay from 'assimilation/components/uport/UPortIdentityDisplay'
import { authLoginWithIdentity } from 'store/departments/actions'
/* ---------------------------- Module Package ------------------------------ */
const QuestKey1 = withState(
  'questKey1',
  'questKey1Toggle',
  true
)
const QuestKey2 = withState(
  'questKey2',
  'questKey2Toggle',
  true
)

const QuestKey3 = withState(
  'questKey3',
  'questKey3Toggle',
  true
)



/*-* Recompose *-*/
const QueryLifecycle = lifecycle(
  {
    componentDidMount()
    {

    },
    componentDidUpdate(prevProps)
    {
    
      if(this.props.status) {
        // if YES questKey INIT authLogin
        if(this.props.identity.questKey) {
          this.props.identityLogin(this.props.identity)
        }
        // if NO questKey INIT new QuestKey
        if(!this.props.identity.questKey && this.props.questKey1) {
          this.props.questKeyInit(this.props.identity.address)
          this.props.questKey1Toggle(toggle=>!toggle)
        }

        if(this.props.questKeyStatus && this.props.questKey2) {
          this.props.questKeyRequest()
          this.props.questKey2Toggle(toggle=>!toggle)
        }

        // if YES questKeyRequest init authLogin
        if(this.props.credentialsQuestKeyStatus && this.props.questKey3) {
          this.props.identityLogin({ 
            ...this.props.identity,
            questKey:this.props.credentialsQuestKey.questKey
          })
          this.props.questKey3Toggle(toggle=>!toggle)
        }
      }
  
    }
  })

/*-* Redux *-*/
const mapStateToProps = (state, props) => ({
    identity: fromUport.getDeltaData(state, `credentials`),
    status: fromUport.getDeltaStatus(state, `credentials`),
    questKey: fromUport.getDeltaData(state, 'attest|questKey'),
    questKeyStatus: fromUport.getDeltaStatus(state, 'attest|questKey'),
    credentialsQuestKey: fromUport.getDeltaData(state, 'credentials|questKey'),
    credentialsQuestKeyStatus: fromUport.getDeltaStatus(state, 'credentials|questKey'),
  }
)

const mapDispatchToProps = (dispatch, props) => ({
  identityLogin: (uid) => dispatch(authLoginWithIdentity({
    payload: uid
  })),
  uPortGetCredentialsRequest: ()=>dispatch(uPortGetCredentialsRequest({
    payload: {
      requested: ['questKey', 'name', 'email', 'phone', 'country', 'avatar'],
      notifications: true
    },
    metadata: {
      delta: 'credentials',
      dialog: 'ViewDialogWelcome'
    }
  })),
  questKeyRequest: ()=>dispatch(uPortGetCredentialsRequest({
    payload: {
      requested: ['questKey'],
    },
    metadata: {
      delta: 'credentials|questKey',
    }
  })),
  questKeyInit: (address)=>dispatch(uPortGetAttestCredentialsRequest({
    payload: {
      credentials: {
        sub: address,
        claim: {
          questKey: uuid(),
        },
      }
    }, 
    metadata: 
    {
      delta: 'attest|questKey'
    } 
  }
))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  QuestKey1,
  QuestKey2,
  QuestKey3,
  QueryLifecycle,
)(UPortIdentityDisplay);