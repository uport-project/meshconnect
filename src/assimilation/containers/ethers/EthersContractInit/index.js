/* ------------------------- External Dependencies -------------------------- */
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose'
/* ------------------------- Internal Dependencies -------------------------- */
import EthersContractInformation from 'assimilation/components/ethers/EthersContractInformation'
import { fromEthers } from 'assimilation/store/selectors'
import ethers from 'assimilation/store/ethers/actions'
/* ---------------------------- Module Package ------------------------------ */
/*-* Recompose *-*/
const QueryLifecycle = lifecycle(
{
  componentDidMount()
  {
    if(!this.props.ethAbi) return null 
    this.props.contractCreate(this.props.ethAbi)
  },
  componentDidUpdate(prevProps)
  {
    

  }
})

/*-* Redux *-*/
const mapStateToProps = (state, props) => ({
    status: props.ethName ? fromEthers.getDeltaStatus(state, props.delta) : fromEthers.getDeltaData(state, props.delta),
    data: props.ethName ? fromEthers.getDeltaData(state, props.delta) : fromEthers.getDeltaData(state, props.delta),
  }
)

const mapDispatchToProps = (dispatch, props) => ({
  contractCreate: (ensName)=>dispatch(ethers.contractCreate('REQUEST')(
    {
      contractName: props.contractName,
      ethAddress: props.ethAddress,
      ethAbi: props.ethAbi
    },
    {
      delta: props.delta,
      network: {
        provider: 'infura',
        chain: props.chain || 'rinkeby',
      }
    }
    )),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  QueryLifecycle,
)(EthersContractInformation);