/* ------------------------- External Dependencies -------------------------- */
import _ from 'lodash'
import React from 'react';
import {
  branch,
  compose,
  lifecycle,
  withProps,
  withState,
  withStateHandlers,
  renderComponent
} from 'recompose'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import filterKeys from 'filter-keys'

/* ------------------------- Internal Dependencies -------------------------- */
import { SpinnerSquares } from 'atomic'
import { createValidator, required } from 'logic/forms/validation'

/*--- Redux Store ---*/
import { fromEthers } from 'assimilation/store/selectors'
import ethers from 'assimilation/store/ethers/actions'
import { ethersWalletCreateFromMenemonicRequest } from 'assimilation/store/actions'
/* ------------------------ Initialize Dependencies ------------------------- */
import FormRender from 'forms/ethers/EthersWalletGenerateBrainCard'
import FormRender from './render'

/* --------------------------- Component Entry ------------------------------ */
/*-- Event Handlers ---*/
const onSubmit = (data, dispatch, props) => new Promise((resolve, reject) => {
  const submission = {}
  submission.address = _.pickBy(data, (value, key)=> key.startsWith("address"));
  dispatch(ethersWalletCreateFromMenemonicRequest(
    {
      payload: data.mnemonicPhrase, 
      metadata: {
        delta: 'WalletMnemonicGenerateRequest'
      }
    }
  ))
})

/*---*--- Lifecylce Methods ---*---*/
const QueryLifecycle = lifecycle({
  /*--- Component Mount ---*/
  componentDidMount() {

  },

  /*--- Component Update ---*/
  componentDidUpdate(prevProps) {
    if(this.props.submitting === true) {
      this.props.reset()
    }
  }
})

const StateHandlers = withStateHandlers(
    ({ mnemonic = ''}) => ({
      mnemonic
    }),
    {
      setMnemonic: () => (value) => ({
        mnemonic:value,
      }),
    }
  )

/* ----------------------------- Form Validation -------------------------------- */
const validate = createValidator({

})
const config = {
  form: 'EthersWalletGenerateMnemonic',
  fields: [
    'nameEvent',
    'nameEventAlias',
  ],
  destroyOnUnmount: true,
  onSubmit,
  validate
}

const mapStateToProps = (state, props) => ({
    data: fromEthers.getDeltaData(state, 'WalletMnemonicGenerateRequest')
  }
)

const mapDispatchToProps = (dispatch, props) => ({
  ethersWalletCreateFromMenemonicRequest: ()=>dispatch(ethers.walletGenerateMenomonic('REQUEST')(
    null,
    {
      delta: 'WalletMnemonicGenerateRequest'
    }
    
    )),
})
const spinnerWhileLoading = (test) => branch(test,renderComponent(()=><SpinnerSquares gradient='cherry' />))

const FormRedux = props => <FormRender { ...props} />
const FormConfiguration = reduxForm(config)
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  spinnerWhileLoading(
    (props) => !props ? true : false
  ),
  FormConfiguration,
  QueryLifecycle,
  StateHandlers,
)(FormRedux);
