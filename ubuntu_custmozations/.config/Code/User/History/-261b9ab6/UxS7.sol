pragma solidity ^0.8.0;
    
address constant steve = 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266;
address constant takshil = 0x70997970c51812dc3a010c7d01b50e0d17dc79c8;
address constant bob = 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc;

//helper functions
function getAllBalance() public view {
    console.log("Balance of Steve: ", balanceOf(steve));
    console.log("Balance of Takshil: ", balanceOf(takshil));
    console.log("Balance of Bob: ", balanceOf(bob));
}