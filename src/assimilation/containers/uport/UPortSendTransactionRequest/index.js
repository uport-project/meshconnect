/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose'
/* ------------------------- Internal Dependencies -------------------------- */
import { fromUport } from 'assimilation/store/selectors'
import { uPortSendTransactionRequest } from 'assimilation/store/actions'
import UPortSendTransaction from 'assimilation/components/uport/UPortSendTransaction'
import {MeetupEvent} from 'contracts'
/* ---------------------------- Module Package ------------------------------ */
/*-* Redux *-*/
const mapStateToProps = (state, props) => ({
    data: fromUport.getDeltaData(state, `credentials`),
    status: fromUport.getDeltaStatus(state, `credentials`)
  }
)

const mapDispatchToProps = (dispatch, props) => ({
  sendTransactionRequest: ()=>dispatch(uPortSendTransactionRequest({
    payload: {
      contractABI: MeetupEvent.abi,
      contractAddress: '0x03f41ad7789956fc512f601c15cef1e222adc280',
      contractFunction: "getAttendeeAddresses"
    },
    metadata: {
      delta: 'contract|transaction'
    }
  })),
})


export default connect(mapStateToProps, mapDispatchToProps)(UPortSendTransaction);