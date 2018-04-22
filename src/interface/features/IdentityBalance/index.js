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
import {MeetupEvent} from 'contracts'
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
    if(this.props.identityStatus && !this.props.identityLoaded) {
      this.props.getBalance(this.props.identityData.addressDecoded.address)
      this.props.identityLoadToggle(toggle=>!toggle)
    }
  },
  componentDidUpdate(prevProps)
  {

    if(this.props.identityStatus && !this.props.identityLoaded) {
      this.props.getBalance(this.props.identityData.addressDecoded.address)
      this.props.identityLoadToggle(toggle=>!toggle)
    }
    
  }
})

/*-* Redux *-*/
const mapStateToProps = (state, props) => {
  return {
    identityData: fromUport.getDeltaData(state, `credentials`),
    identityStatus: fromUport.getDeltaStatus(state, `credentials`),
    accountBalance: fromEthers.getDeltaData(state,  'account|balance'),
    accountBalanceStatus: fromEthers.getDeltaStatus(state,  'account|balance'),
  }
}


const mapDispatchToProps = (dispatch, props) => ({
  getBalance: (address)=>dispatch(ethers.accountBalance('REQUEST')(
    address,
    {
      delta:'account|balance',
      network: {
        provider: 'infura',
        chain: props.chain || 'rinkeby',
      }
    }
  )),
  
})

/* ----------------------------- Export -------------------------------- */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  IdentityLoaded,
  QueryLifecycle,
)(Component);