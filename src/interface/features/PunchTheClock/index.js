/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose'
import { reduxForm, change } from 'redux-form'
/* ------------------------- Internal Dependencies -------------------------- */
import { createValidator, required } from 'logic/forms/validation'
import Form from './form'

// Ethers
import ethers from 'assimilation/store/ethers/actions'
import EthersContractInformation from 'assimilation/components/ethers/EthersContractInformation'
import { fromEthers } from 'assimilation/store/selectors'

// uPort
import { fromUport } from 'assimilation/store/selectors'
import { uPortSendTransactionRequest } from 'assimilation/store/actions'

// Contract | MeetupEvent
import {MeetupEvent} from 'contracts'
import {PunchTheClock} from 'contracts'
/* ---------------------------- Module Package ------------------------------ */

/*-* State Management *-*/
const ContractAttendeesListStatus = withState(
  'attendeeListScan',
  'attendeeListScanToggle',
  true
)
const AttendeeScan = withState(
  'entityScan',
  'entityScanToggle',
  true
)

/**
 * Identity Loaded
 * The decentralized identity has successfully logged in.
 */
const IdentityLoaded = withState(
  'identityLoaded',
  'identityLoadToggle',
  false
)

/**
 * Identity Scan
 * Scan the PunchTheClock smart contract for logged in decentralized identity 
 */
const IdentityScan = withState(
  'identityScan',
  'identityScanToggle',
  false
)

/**
 * Registered Identity Scan
 * Scan the PunchTheClock smart contract for logged in decentralized identity 
 */
const RegisteredEntityScan = withState(
  'registeredEntityScan',
  'registeredEntityScanToggle',
  false
)

const EntityList = withState(
  'entityList',
  'entityListAdd',
  []
)

/*-* Recompose *-*/
const QueryLifecycle = lifecycle(
{
  componentDidMount()
  {

    this.props.contractCreate(this.props.ethAbi)
    
  },
  componentDidUpdate(prevProps)
  {
    if(this.props.identityCredentialsRequestStatus && !this.props.identityLoaded) {
      this.props.dispatch(change("FormPunchTheClock", "nameDisplay", this.props.identityCredentialsRequest.name))
      this.props.identityLoadToggle(toggle=>!toggle)
    }

    /**
     * Identity Login | Display Information
     */
    if(this.props.contractCreateRequest && this.props.identityCredentialsRequestStatus && !this.props.identityLoaded) {
      this.props.getEntityData(this.props.identityCredentialsRequest.addressDecoded.address) // Request users Profile Information using 
      this.props.identityScanToggle(toggle=>!toggle)
    }

    /**
     * Scan for Registrants | Scan Blockchain for Attendee address list
     */
    if(this.props.contractCreateRequest && !this.props.registeredEntityScan) {
      this.props.getRegisteredList()
      this.props.registeredEntityScanToggle(toggle=>!toggle)
    }
    
    /**
     * Scan for Registrants Information | Scan Blockchain for Attendee address list
     */
    if(
      this.props.contractCreateRequest 
      && this.props.entityScan 
      && this.props.registeredEntityRequestStatus 
      && this.props.registeredEntityRequest[0]){
        if(this.props.registeredEntityRequest[0]){
          this.props.registeredEntityRequest.map(address=>{
            this.props.getEntityData(address)
          })
        }
      this.props.entityScanToggle(toggle=>!toggle)
    }

  }

})

/*-* Redux *-*/
const mapStateToProps = (state, props) => {
  return {
    // uPort
    identityCredentialsRequest: fromUport.getDeltaData(state, `credentials`),
    identityCredentialsRequestStatus: fromUport.getDeltaStatus(state, `credentials`),


    // Ethers
    contractCreateRequest: fromEthers.getDeltaStatus(state,  `contract|${props.contractName}|${props.contractAddress}|create`),
    
    // Scan for Registrants
    registeredEntityRequest: fromEthers.getDeltaData(state, `contract|${props.contractName}|${props.contractAddress}|entityList`),
    registeredEntityRequestStatus: fromEthers.getDeltaStatus(state, `contract|${props.contractName}|${props.contractAddress}|entityList`),

    // Entity List
    entityList: fromEthers.getStartingData(state, `contract|item|${props.contractName}|${props.contractAddress}|`),
  
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
      ethAbi: PunchTheClock.abi,
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
   * Attendees List
   * Scan the MeetupEvent Smart Contract for registered attendees
   */
  getRegisteredList: ()=>dispatch(ethers.contractCall('REQUEST')(
    {
      contractName: props.contractName,
      contractFunction: 'getRegisteredAddresses'
    },
    {
      delta: `contract|${props.contractName}|${props.contractAddress}|entityList`,
      network: 'rinkeby'
    }
  )),

  /**
   * Get Entity Data
   */
  getEntityData: (address)=>dispatch(ethers.contractCall('REQUEST')(
    {
      contractName: props.contractName,
      contractFunction: 'getEntityData',
      contractParams: [
        address
      ]
    },
    {
      delta:`contract|item|${props.contractName}|${props.contractAddress}|${address}`,
      network: 'rinkeby'
    }
  )),
  register: (name)=>dispatch(uPortSendTransactionRequest({
    payload: {
      contractABI: PunchTheClock.abi,
      contractAddress: props.contractAddress,
      contractFunction: "register",
    },
    metadata: {
      delta: 'contract|transaction|registerEntity'
    }
  })),
  arrival: (name)=>dispatch(uPortSendTransactionRequest({
    payload: {
      contractABI: PunchTheClock.abi,
      contractAddress: props.contractAddress,
      contractFunction: "arrive",
    },
    metadata: {
      delta: 'contract|transaction|arrive'
    }
  })),
})


/* ----------------------------- Redux Form -------------------------------- */
/*-- Event Handlers ---*/
const onSubmit = (data, dispatch, props) => new Promise((resolve, reject) => {
  
})
.catch(err=>console.log(err))

const validate = createValidator({
  'nameDisplay': required,
})

const config = {
  form: 'FormPunchTheClock',
  fields: [
    'nameDisplay',
  ],
  destroyOnUnmount: true,
  onSubmit,
  validate
}

/* ----------------------------- Export -------------------------------- */
const FormConfiguration = reduxForm(config)
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  FormConfiguration,
  ContractAttendeesListStatus,
  AttendeeScan,
  IdentityLoaded,
  IdentityScan,
  RegisteredEntityScan,
  QueryLifecycle,
)(Form);