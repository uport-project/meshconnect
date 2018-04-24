pragma solidity ^0.4.17;

import "contracts/eip20/EIP20.sol";
import "contracts/utils/Ownable.sol";
import "contracts/utils/SafeMath.sol";


/**
 * @title Mintable token
 * @dev Simple ERC20 Token example, with mintable token creation
 * @dev Issue: * https://github.com/OpenZeppelin/zeppelin-solidity/issues/120
 * Based on code by TokenMarketNet: https://github.com/TokenMarketNet/ico/blob/master/contracts/MintableToken.sol
 */
contract MintableToken is EIP20, Ownable {

  using SafeMath for uint256;

  event Mint(address indexed to, uint256 amount);
  event MintFinished();
  event ChangedPunchClock(address indexed _punch);

  bool public mintingFinished = false;
  address _punchClock;

  modifier onlyPunchClock {

    require(_punchClock == msg.sender);
    _;

  }

  modifier canMint() {
    require(!mintingFinished);
    _;
  }

  function MintableToken(uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol) EIP20(_initialAmount, _tokenName, _decimalUnits, _tokenSymbol) {

          owner = msg.sender;

  }

  function setPunchClock(address _punch) public onlyOwner {

    _punchClock = _punch;
    ChangedPunchClock(_punch);

  }

  /**
   * @dev Function to mint tokens
   * @param _to The address that will receive the minted tokens.
   * @param _amount The amount of tokens to mint.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(address _to, uint256 _amount) onlyPunchClock canMint public returns (bool) {
    totalSupply = totalSupply.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    Mint(_to, _amount);
    Transfer(address(0), _to, _amount);
    return true;
  }

  /**
   * @dev Function to stop minting new tokens.
   * @return True if the operation was successful.
   */
  function finishMinting() onlyOwner canMint public returns (bool) {
    mintingFinished = true;
    MintFinished();
    return true;
  }
}
