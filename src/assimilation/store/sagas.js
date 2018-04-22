import ethers from 'assimilation/store/ethers/sagas'
import uport from 'assimilation/store/uport/sagas'
export default [
  ethers(),
  uport()
]