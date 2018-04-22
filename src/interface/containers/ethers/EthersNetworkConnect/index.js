/* ------------------------- External Dependencies -------------------------- */
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
/* ------------------------- Internal Dependencies -------------------------- */
import Component from './component'

/*---*--- Ethers :: Assimilation ---*---*/
import ethers from 'assimilation/store/ethers/actions'
import { fromEthers } from 'assimilation/store/selectors'
/* ------------------------------- Container -------------------------------- */
/*---*--- Lifecylce Methods ---*---*/
const QueryLifecycle = lifecycle(
{
  /*--- Did Mount :: Component ---*/
  componentDidMount()
  {
    switch (this.props.provider) {
      case 'infura':
          this.props.ethersNewProviderInfuraRequest(this.props)     
        break;
      case 'etherscan':
          this.props.ethersNewProviderEtherscanRequest(this.props)
        break;
    
      default:
        break;
    }
  },
  /*--- Did Update :: Component ---*/
  componentDidUpdate()
  {
    switch (this.props.provider) {
      case 'infura':
          this.props.ethersNewProviderInfuraRequest(this.props)     
        break;
      case 'etherscan':
          this.props.ethersNewProviderEtherscanRequest(this.props)
        break;
    
      default:
        break;
    }
  },

})


/*---*--- Redux ---*---*/
const mapStateToProps = (state, props) => ({
  provider: fromEthers.getDelta(state, 'provider'),
  chain: fromEthers.getDelta(state, 'chain'),
})


const mapDispatchToProps = (dispatch, props) => ({
  ethersNewProviderInfuraRequest: settings => dispatch(ethers.providerInfura('REQUEST')(
    {
      network: {
        provider: 'infura',
        chain: settings.chain || 'homestead',
      }
    },
    {
      delta: `provider|infura`
    }
  )),
  ethersNewProviderEtherscanRequest: settings => dispatch(ethers.providerEtherscan('REQUEST')(
    {
      network: {
        provider: 'etherscan',
        chain: settings.chain || 'homestead',
      }
    },
    {
      delta: `provider|etherscan`
    }
  )),
})


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  QueryLifecycle,
)(Component);
