let PunchTheClock = artifacts.require('contracts/PunchTheClock.sol');
let MintableToken = artifacts.require('contracts/eip20/MintableToken.sol');

const assertFail = require("./helpers/assertFail");
const increaseTime = require('./helpers/increaseTime');

contract('PunchTheClock', function(accounts) {

    let punch;
    let tkn;

    let name = "Stefan";

    let timeMin = 3600;
    let timeMax = 7200;

    const tokenAmount = 10;
    const tokenName = "Punch Clock Token";
    const symbol = "PNC";
    const decimals = 18;

    beforeEach(async () => {

        tkn = await MintableToken.new(tokenAmount, tokenName, decimals, symbol, {from: accounts[0]});
        punch = await PunchTheClock.new(accounts[0], name, timeMin, timeMax, tkn.address, {from: accounts[0]});

        await tkn.setPunchClock(punch.address, {from: accounts[0]});

        await punch.register({from: accounts[1]});
        await punch.adminApprove(accounts[1], {from: accounts[0]});
        await punch.adminNameEntity(accounts[1], "cool_person", {from: accounts[0]});

    });

    it("Can't punch in too early or too late", async function() {

        var block = web3.eth.blockNumber;

        await punch.arrive({from: accounts[1]});

        await assertFail(async function() {
            await punch.depart({from: accounts[1]});
        });

        var timeStamp = web3.eth.getBlock(block).timestamp;

        await increaseTime.increaseTimeTo(timeStamp + increaseTime.duration.seconds(10000));

        await assertFail(async function() {
            await punch.depart({from: accounts[1]});
        });
      
    });

    it("Get tokens for participating", async function() {

        var block = web3.eth.blockNumber;

        await punch.arrive({from: accounts[1]});

        var timeStamp = web3.eth.getBlock(block).timestamp;
        
        await increaseTime.increaseTimeTo(timeStamp + increaseTime.duration.seconds(4000));

        await punch.depart({from: accounts[1]});

        assert.equal(5, await tkn.balanceOf(accounts[1]));
              
    });

});