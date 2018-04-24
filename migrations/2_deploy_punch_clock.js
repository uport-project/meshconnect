const PunchTheClock = artifacts.require('./PunchTheClock.sol');
const MintableToken = artifacts.require('contracts/eip20/MintableToken.sol');
const deploy = true

module.exports = async function(deployer, network, accounts) {

  const contractName = "TheParlor"
  const timeMin = 24*3600 / 3  // 24hrs divided by 3 =  8 hour minimum => incentivized to work hard
  const timeMax = 24*3600 / 2  // 24hrs divided by 2 =  12 hour maximum => incentivized to work smart

  const tokenName = "Punch Clock Token";
  const initialAmount = 1000;
  const decimals = 18;
  const symbol = "PNC"

  await deployer.deploy(MintableToken, initialAmount, tokenName, decimals, symbol, {from: accounts[0]});
  await deployer.deploy(PunchTheClock , contractName,  timeMin,  timeMax, MintableToken.address, {from: accounts[0]});
  await web3.eth.contract(MintableToken.abi).at(MintableToken.address)
    .setPunchClock(PunchTheClock.address, {from: accounts[0]});

};
