pragma solidity = 0.8.13

contract MyFristContract {
    uint number;

    constructor() public {
        number = 0;
    }

    function setNumber(uint _num) public {
        number = _num;
    }

    function getNumber() public view returns (uint){
        return number;
    }
}