/* ------------------------- External Dependencies -------------------------- */
import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose'
import { reduxForm } from 'redux-form'
/* ------------------------- Internal Dependencies -------------------------- */
import { createValidator, required } from 'logic/forms/validation'
import { fromEthers } from 'assimilation/store/selectors'
import ethers from 'assimilation/store/ethers/actions'
import Form from './form'

// Depreacted Store Department Request Style | fix this @kamescg
import { databaseWriteRequest } from 'store/departments/actions'
/* ---------------------------- Module Package ------------------------------ */

/*-* State Management *-*/
const BlockFetchLifecyle = withState(
  'blockRun',
  'blockRunToggle',
  true
)
const TransactionFetchLifecyle = withState(
  'transactionRun',
  'transactionRunToggle',
  true
)

const TransactionList = withState(
  'transactionList',
  'transactionListAdd',
  []
)

/*-* Recompose *-*/
const QueryLifecycle = lifecycle(
{
  componentDidMount()
  {

    this.props.blockchainBlockNumber()
    if(this.props.blockNumber && this.props.blockRun) {
      this.props.blockchainBlock(this.props.blockNumber)
      this.props.blockRunToggle(toggle=>!toggle)
    }
    this.props.contractCreate(this.props.ethAbi)
    this.props.blockchainBlockNumber()
    if(this.props.ethAddress) {
      this.props.accountTransactionCount(this.props.ethAddress)
    }
  },
  componentDidUpdate(prevProps)
  {
    if(this.props.submitting === true) {
      this.props.reset()
      this.props.blockRunToggle(toggle=>!toggle)
      if(this.props.transactionRun === false) this.props.transactionRunToggle(toggle=>!toggle)
    }

    // Update Multiple Blocks
    if(this.props.blocksAllCalled !== prevProps.blocksAllCalled ) {
      if(this.props.transactionList[this.props.blocksAllCalled] ) this.props.transactionListAdd(n=>[...n,   ])

      this.props.blocksAllCalled.map(block=> {
        if( block.data.number && !(this.props.transactionList.indexOf(block.data.number) > -1) ) {
          block.data.transactions.map(tx=>{
            this.props.blockchainTransaction(tx)
          })
          this.props.transactionListAdd(n=>[...n, block.data.number])
        }

      })
      this.props.blockRunToggle(toggle=>!toggle)
      this.props.transactionRunToggle(toggle=>!toggle)
    }
    
    /**
     * Transaction Update
     * @desc Watch for new trasactions added to the list. If a new transaction is filtered,
     * we're going to send a "write" request to Firebase Realtime Database
     */
    if (this.props.transactions !== prevProps.transactions) {
      this.props.databaseWriteRequest(this.props.transactions)
    }

  }
})

/*-* Redux *-*/
const mapStateToProps = (state, props) => {
  if(props.blocksAllCalled && props.blocksAllCalled.length > 1) console.log(props.blocksAllCalled)
  return {
    status: props.ensName ? fromEthers.getDeltaStatus(state, props.delta) : fromEthers.getDeltaData(state, props.delta),
    data: props.ensName ? fromEthers.getDeltaData(state, props.delta) : fromEthers.getDeltaData(state, props.delta),
    dataBlock: fromEthers.getDeltaData(state, `block`),
    dataBlockStatus: fromEthers.getDeltaStatus(state, `block`),
    latestBlock: fromEthers.getDeltaStatus(state, `blockLastestNumber`),
    txCount: fromEthers.getDeltaData(state, 'transactionCount'),
    txData: fromEthers.getDeltaData(state, 'transaction|'),
    transactions: fromEthers.getFilter(state, 'to', '0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef'),
    blocksAllCalled: fromEthers.getStarting(state, 'block'),
  }
}


const mapDispatchToProps = (dispatch, props) => ({
  // Firebase Database
  databaseWriteRequest: (tx)=>dispatch(databaseWriteRequest({
    payload: tx,
    metadata: {
      delta: 'addTx',
      entity: 'mutate',
      branch: [
        'request'
      ],
      writeType: 'patch'
    },
  })),
  // Blockchain
  blockchainBlockNumber: ()=>dispatch(ethers.blockchainBlockNumber('REQUEST')(
    null,
    {
      delta: 'latestBlock'
    }
  )),
  blockchainBlock: (blockNumber)=>dispatch(ethers.blockchainBlock('REQUEST')(
    blockNumber,
    {
      delta: `block`
    }
  )),
  blockchainTransaction: (txHash)=>dispatch(ethers.blockchainTransaction('REQUEST')(
    txHash,
    {
      delta: `${txHash}`
    }
  )),
  accountTransactionCount: (address)=>dispatch(ethers.accountTransactionCount('REQUEST')(
    address,
    {
      delta: 'transactionCount'
    }
  )),
  contractCreate: (ensName)=>dispatch(ethers.contractCreate('REQUEST')(
    {
      ethAddress: props.ethAddress,
      ethAbi: props.ethAbi
    },
    {
      delta: props.delta
    }
    )),
})


/* ----------------------------- Redux Form -------------------------------- */
/*-- Event Handlers ---*/
const onSubmit = (data, dispatch, props) => new Promise((resolve, reject) => {
  const blockEnd = data.ethBlockNumber - data.countBackwards
  if(!data.countBackwards) return null
  for (var index = data.ethBlockNumber; index !== blockEnd; index--) {
    dispatch(ethers.blockchainBlock('REQUEST')(
      Number(index),
      {
        delta: `block|${index}`
      }
    ))
  }
})

const validate = createValidator({
  'ethBlockNumber': required,
  'countBackwards': required
})

const config = {
  form: 'FormEnsScan',
  fields: [
    'ethBlockNumber',
    'countBackwards',
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
  BlockFetchLifecyle,
  TransactionList,
  TransactionFetchLifecyle,
  QueryLifecycle,
)(Form);