pragma solidity >=0.5.0 <0.9.0;

//this is not an ERC token, it is a simple token.

contract Token{
    string public name="HardHat Token";
    string public symbol="HHT";
    uint public totalSupply=10000;

    address public owner;

    mapping(address=>uint) balances;

    constructor(){
        //initially the owner will have all tokens/supply.
        balances[msg.sender]=totalSupply;
        owner=msg.sender;
    }

    function transfer(address to, uint amount) external {
        require(balances[msg.sender]>=amount, "Not engouh tokens");
        balances[msg.sender]=balances[msg.sender] - amount;
        balances[to]+=amount;
    }

    function balanceOf(address account) external view returns(uint){
        return balances[account];
    }
}