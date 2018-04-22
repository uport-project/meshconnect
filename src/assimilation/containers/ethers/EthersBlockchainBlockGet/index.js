/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose'
/* ------------------------- Internal Dependencies -------------------------- */
import EthersBlockchainBlockCard from 'assimilation/components/ethers/EthersBlockchainBlockCard'
import { fromEthers } from 'assimilation/store/selectors'
import { ethersBlockchainGetBlockRequest } from 'assimilation/store/actions'
import ethers from 'assimilation/store/ethers/actions'
/* ---------------------------- Module Package ------------------------------ */
/*-* Recompose *-*/
const queryLifecycle = lifecycle(
{
  componentDidMount()
  {
    if(!this.props.blockNumber) return null 
    this.props.ethersBlockchainGetBlockRequest({
      payload: {
        block: this.props.blockNumber,
      },
      metadata: {
        delta: `BlockchainBlockGet|${this.props.blockNumber}`
      }
    })
  },
  componentDidUpdate(prevProps)
  {
    if (this.props.blockNumber != prevProps.blockNumber) {
      if(!this.props.blockNumber) return null 
      this.props.ethersBlockchainGetBlockRequest({
        payload: {
          block: this.props.blockNumber,
        },
        metadata: {
          delta: `BlockchainBlockGet|${this.props.delta}`
        }
      })
    }
  }
})

/*-* Redux *-*/
const mapStateToProps = (state, props) => ({
    data: props.blockNumber ? fromEthers.getDeltaData(state, `BlockchainBlockGet|${props.blockNumber}`) : fromEthers.getDeltaData(state, `BlockchainBlockGet|${props.delta}`),
    blockNumber: props.blockNumber ? props.blockNumber : fromEthers.getDeltaData(state, 'BlockchainBlockNumber')
  }
)

const mapDispatchToProps = (dispatch, props) => ({
  ethersBlockchainGetBlockRequest: (settings)=>dispatch(ethersBlockchainGetBlockRequest(settings)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  queryLifecycle,
)(EthersBlockchainBlockCard);