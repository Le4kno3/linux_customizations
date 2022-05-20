pragma solidity ^0.8.0;

contract first{
    
    //this state stores balance of the contract.
    uint balance;

    //contructor will initialize balance
    constructor (){
        balance = 0;
    }

    //set balance
    function setBalance(uint _balance) public view {
        balance = _balance;
    }
}