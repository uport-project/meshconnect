/* ------------------------- External Dependencies -------------------------- */
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
/* ------------------------- Internal Dependencies -------------------------- */
import Component from './component'

/*---*--- Ethers :: Assimilation ---*---*/
import ethers from 'assimilation/store/ethers/actions'
/* ------------------------------- Container -------------------------------- */
/*---*--- Lifecylce Methods ---*---*/
const QueryLifecycle = lifecycle(
{
  /*--- Did Mount :: Component ---*/
  componentDidMount()
  {

    const payload = {
      url: '127.0.0.1:7545',
      network: 'homestead',
    }

    this.props.ethersNewProviderJsonRpcRequest({
      payload
    })

  },

  /*--- Did Update :: Component ---*/
  componentDidUpdate(prevProps)
  {

  }

})


/*---*--- Redux ---*---*/
const mapStateToProps = (state, props) => ({

})

const mapDispatchToProps = (dispatch, props) => ({
  ethersNewProviderJsonRpcRequest: settings => dispatch(ethers.providerJsonRpc('REQUEST')(
    {
      url: 'http://127.0.0.1:7545/',
      network: 'homestead',
    },
    {
      delta: `provider|json`
    }
    )),
})


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  QueryLifecycle,
)(Component);
