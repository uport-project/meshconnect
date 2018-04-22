/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose'
import { reduxForm, change } from 'redux-form'
/* ------------------------- Internal Dependencies -------------------------- */
import { createValidator, required } from 'logic/forms/validation'
import Component from './component'

// Ethers
import ethers from 'assimilation/store/ethers/actions'
import EthersContractInformation from 'assimilation/components/ethers/EthersContractInformation'
import { fromEthers } from 'assimilation/store/selectors'

// uPort
import { fromUport } from 'assimilation/store/selectors'
import { uPortSendTransactionRequest } from 'assimilation/store/actions'

// Contract | MeetupEvent
import {ERC20} from 'contracts'
/* ---------------------------- Module Package ------------------------------ */

/*-* State Management *-*/
const IdentityLoaded = withState(
  'identityLoaded',
  'identityLoadToggle',
  false
)

/*-* Recompose *-*/
const QueryLifecycle = lifecycle(
{
  componentDidMount()
  {
    this.props.contractCreate(this.props.ethAbi)
    if(this.props.identityStatus && !this.props.identityLoaded) {
      this.props.getTokenBalance(this.props.identityData.addressDecoded.address)
      this.props.identityLoadToggle(toggle=>!toggle)
    }
  },
  componentDidUpdate(prevProps)
  {

    if(this.props.identityStatus && !this.props.identityLoaded) {
      this.props.getTokenBalance(this.props.identityData.addressDecoded.address)
      this.props.identityLoadToggle(toggle=>!toggle)
    }
    
  }
})

/*-* Redux *-*/
const mapStateToProps = (state, props) => {
  return {
    identityData: fromUport.getDeltaData(state, `credentials`),
    identityStatus: fromUport.getDeltaStatus(state, `credentials`),
    tokenBalanceStatus: fromEthers.getDeltaStatus(state,  `contract|${props.contractName}|${props.contractAddress}|balanceOf`),
    tokenBalanceData: fromEthers.getDeltaData(state,  `contract|${props.contractName}|${props.contractAddress}|balanceOf`),
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  /**
   * Contract Create
   * Initialize a contract via a Saga callback
   */
  contractCreate: ()=>dispatch(ethers.contractCreate('REQUEST')(
    {
      ethAddress: props.contractAddress,
      ethAbi: ERC20.abi,
      contractName: props.contractName
    },
    {
      delta: `contract|${props.contractName}|${props.contractAddress}|create`,
      network: {
        provider: 'infura',
        chain: props.chain || 'rinkeby',
      }
    }
  )),

  /**
   * Token Balance
   * Scan the MeetupEvent Smart Contract for registered attendees
   */
  getTokenBalance: (address)=>dispatch(ethers.contractCall('REQUEST')(
    {
      contractName: props.contractName,
      contractFunction: 'balanceOf',
      contractParams: [
        address
      ]
    },
    {
      delta: `contract|${props.contractName}|${props.contractAddress}|balanceOf`,
      network: 'rinkeby'
    }
  )),
})

/* ----------------------------- Export -------------------------------- */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  IdentityLoaded,
  QueryLifecycle,
)(Component);