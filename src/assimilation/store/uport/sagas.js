/* ------------------------- External Dependencies -------------------------- */
import { put, takeEvery } from 'redux-saga/effects';
import { SimpleSigner } from 'uport-connect'
import mnid, {decode} from 'mnid'
/* ------------------------- Internal Dependencies -------------------------- */
import eventManager from 'assimilation/store/events'
import uPortConnection, {uPortWeb3} from 'services/uPort';
import ethers from 'ethers'
import {MeetupEvent} from 'contracts'
import { dialogOpen } from 'store/departments/actions'
import {
  UPORT_GET_WEB3_REQUEST,
  UPORT_GET_PROVIDER_REQUEST,
  UPORT_GET_CREDENTIALS_REQUEST,
  UPORT_GET_ADDRESS_REQUEST,
  UPORT_GET_ATTEST_CREDENTIALS_REQUEST,
  UPORT_INIT_CONTRACT_REQUEST,
  UPORT_SEND_TRANSACTION_REQUEST,
  UPORT_ADD_APP_PARAMETERS_REQUEST,
} from './actions'
import {
  uPortGetWeb3Success,
  uPortGetWeb3Failure,
  uPortGetProviderSuccess,
  uPortGetProviderFailure,
  uPortGetCredentialsSuccess,
  uPortGetCredentialsFailure,
  uPortGetAddressSuccess,
  uPortGetAddressFailure,
  uPortGetAttestCredentialsSuccess,
  uPortGetAttestCredentialsFailure,
  uPortInitContractSuccess,
  uPortInitContractFailure,
  uPortSendTransactionSuccess,
  uPortSendTransactionFailure,
  uPortAddAppParametersSuccess,
  uPortAddAppParametersFailure,
} from './actions'
/*---*--- Get Web3 ---*---*/
function* getWeb3({payload, metadata}) {
  try {

    yield put(uPortGetWeb3Success({
      payload: {}, 
      metadata
    }))
  } catch(e) {
    yield put(uPortGetWeb3Failure({payload: e, metadata}))
  }
}


/*---*--- Get Provider ---*---*/
function* getProvider({payload, metadata}) {
  try {

    yield put(uPortGetProviderSuccess({
      payload: {}, 
      metadata
    }))
  } catch(e) {
    yield put(uPortGetProviderFailure({payload: e, metadata}))
  }
}
/*---*--- Get Credentials ---*---*/
function* getCredentials({payload, metadata}) {
  try {
    const requestedCredentials = payload
    const credentials = yield uPortConnection.requestCredentials(requestedCredentials)
    yield eventManager(metadata)
    const mnidDecoded = decode(credentials.address)
    yield put(uPortGetCredentialsSuccess({
      payload: {
        ...credentials,
        addressDecoded: mnidDecoded
      }, 
      metadata
    }))
  } catch(e) {
    yield put(uPortGetCredentialsFailure({payload: e, metadata}))
  }
}


/*---*--- Get Address ---*---*/
function* getAddress({payload, metadata}) {
  try {
    const { uriHandler } = payload
    const address = yield uPortConnection.requestAddress(uriHandler)
    yield put(uPortGetAddressSuccess({
      payload: address, 
      metadata
    }))
  } catch(e) {
    yield put(uPortGetAddressFailure({payload: e, metadata}))
  }
}


/*---*--- Get Attest Credentials ---*---*/
function* getAttestCredentials({payload, metadata}) {
  try {
    const {credentials, uriHandler } = payload
    yield uPortConnection.attestCredentials(credentials, uriHandler)
    yield put(uPortGetAttestCredentialsSuccess({
      payload: payload.claim, 
      metadata
    }))
  } catch(e) {
    yield put(uPortGetAttestCredentialsFailure({payload: e, metadata}))
  }
}


/*---*--- Init Contract ---*---*/
function* initContract({payload, metadata}) {
  try {
    const { abi } = payload
    const { delta } = metadata
    const uPortContractObject = yield uPortConnection.contract(abi)
    window.uport.contracts[delta] = uPortContractObject
    yield put(uPortInitContractSuccess({
      payload: {}, 
      metadata
    }))
  } catch(e) {
    yield put(uPortInitContractFailure({payload: e, metadata}))
  }
}


/*---*--- Contract Callback ---*---*/
function* sendTransaction({payload, metadata}) {
  try {
    const { contractABI, contractAddress, contractFunction, contractParams } = payload

    const contractInstance = uPortConnection.contract(contractABI)
    const contract = contractInstance.at(contractAddress)
    const response = contractParams 
      ? yield contract[contractFunction](...contractParams) 
      : yield contract[contractFunction]()

    yield put(uPortSendTransactionSuccess({
      payload: response, 
      metadata
    }))
  } catch(e) {
    console.log(e)
    yield put(uPortSendTransactionFailure({payload: e, metadata}))
  }
}

/*---*--- Send Transaction ---*---*/
function* sendTransactionNew({payload, metadata}) {
  try {
    const { contractABI, contractAddress, contractFunction } = payload
    const provider = ethers.providers.getDefaultProvider('rinkeby')
    const contractEthers = new uPortWeb3.eth.Contract("0x03f41ad7789956fc512f601c15cef1e222adc280", MeetupEvent.abi);

    // const contractInstance = uPortConnection.contract(contractABI)
    // const contract = contractInstance.at('0x03f41ad7789956fc512f601c15cef1e222adc280')
    // const contractStatus = yield contract.rsvpMe("buidl",);

    var callData = contractEthers.rsvpMe.getData('Kames');
    const txobject = {
      to: '0x03f41ad7789956fc512f601c15cef1e222adc280',
      value: '0.1',
      function: callData,
      appName: 'Eidenai',
    }

    const contractStatus = yield uPortConnection.sendTransaction(txobject).then(txID => {

    })

    yield put(uPortSendTransactionSuccess({
      payload: contractStatus, 
      metadata
    }))
  } catch(e) {
    console.log(e)
    yield put(uPortSendTransactionFailure({payload: e, metadata}))
  }
}


/*---*--- Add App Parameters ---*---*/
function* addAppParameters({payload, metadata}) {
  try {

    yield put(uPortAddAppParametersSuccess({
      payload: {}, 
      metadata
    }))
  } catch(e) {
    yield put(uPortAddAppParametersFailure({payload: e, metadata}))
  }
}

export default function* rxdbRootSaga() {
  yield [
   takeEvery(UPORT_GET_WEB3_REQUEST, getWeb3),
   takeEvery(UPORT_GET_PROVIDER_REQUEST, getProvider),
   takeEvery(UPORT_GET_CREDENTIALS_REQUEST, getCredentials),
   takeEvery(UPORT_GET_ADDRESS_REQUEST, getAddress),
   takeEvery(UPORT_GET_ATTEST_CREDENTIALS_REQUEST, getAttestCredentials),
   takeEvery(UPORT_INIT_CONTRACT_REQUEST, initContract),
   takeEvery(UPORT_SEND_TRANSACTION_REQUEST, sendTransaction),
   takeEvery(UPORT_ADD_APP_PARAMETERS_REQUEST, addAppParameters),
  ];
}