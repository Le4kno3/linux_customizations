// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;



contract HelloWorld {
  uint number;

  function set(uint _number) public {
    number = _number;
  }
  function get() public view returns(uint){
    return number;
  }
}
