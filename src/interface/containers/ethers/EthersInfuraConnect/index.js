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
    this.props.ethersNewProviderInfuraRequest({})
  },

})


/*---*--- Redux ---*---*/
const mapDispatchToProps = (dispatch, props) => ({
  ethersNewProviderInfuraRequest: settings => dispatch(ethers.providerInfura('REQUEST')(
    {
      network: {
        provider: 'infura',
        chain: props.chain || 'rinkeby',
      }
    },
    {
      delta: `provider|infura`
    }
    )),
})


export default compose(
  connect(null, mapDispatchToProps),
  QueryLifecycle,
)(Component);
