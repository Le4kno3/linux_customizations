pragma solidity ^0.8.0;

contract FirstContract{
    
    //this state stores balance of the contract.
    uint balance;

    //contructor will initialize balance
    constructor (){
        balance = 0;
    }

    //set balance
    function setBalance(uint _balance) public {
        balance = _balance;
    }

    //get balance
    function getBalance() public view returns (uint) {
        return balance;
    }
}