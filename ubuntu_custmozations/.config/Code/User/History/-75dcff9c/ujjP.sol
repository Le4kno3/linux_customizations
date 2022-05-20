//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract MyFirstContract {
    
    uint256 number;

    constructor(string memory _greetings) {
        number = 0;
    }

    function setNumber(uint256 _num) public {
        number = _num;
    }

    function getNumber() public view returns (uint256){
        return number;
    }
}