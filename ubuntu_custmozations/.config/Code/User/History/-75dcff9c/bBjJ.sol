pragma solidity = 0.9.0

contract MyFristContract {
    
    uint256 number;

    constructor() public {
        number = 0;
    }

    function setNumber(uint256 _num) public {
        number = _num;
    }

    function getNumber() public view returns (string memory){
        return number;
    }
}