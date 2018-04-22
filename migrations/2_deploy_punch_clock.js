const PunchTheClock = artifacts.require('./PunchTheClock.sol');
const deploy = true
module.exports = !deploy ? null : (deployer) => {
  const contractName = "TheParlor"
  const timeMin = 24*3600 / 3  // 24hrs divided by 3 =  8 hour minimum => incentivized to work hard
  const timeMax = 24*3600 / 2  // 24hrs divided by 2 =  12 hour maximum => incentivized to work smart
  deployer.deploy(PunchTheClock , contractName,  timeMin,  timeMax);
};
