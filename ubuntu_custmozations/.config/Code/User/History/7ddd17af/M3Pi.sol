// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;



contract demo {
  //define a state variable
  uint number;

  //setting the state variable
  function set(uint _number) public {
    number = _number;
  }

  //getting the value of state variable
  function get() public view returns(uint){
    return number;
  }
}
