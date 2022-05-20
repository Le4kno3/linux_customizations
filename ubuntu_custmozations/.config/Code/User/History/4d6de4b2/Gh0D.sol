//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract FirstContract{
    
    //this state stores balance of the contract.
    uint256 balance;

    //contructor will initialize balance
    constructor () {
        balance = 0;
    }

    //set balance
    function setBalance(uint256 _balance) public {
        balance = _balance;
    }

    //get balance
    function getBalance() public view returns (uint256) {
        return balance;
    }
}