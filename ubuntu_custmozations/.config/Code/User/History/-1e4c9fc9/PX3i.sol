// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2 <0.9.0;

contract EscrowUnsafe {
    
    event DepositReceived(bytes32 indexed escrowID, address indexed depositor, address beneficiary, address approver, uint amount );
    event Approved(bytes32 indexed escrowID, uint timestamp);
    event Terminated(bytes32 indexed escrowID, uint timestamp);
    event ContractEmptied(uint indexed timestamp, uint balance);

    uint nonce;

    address owner; //to make it ownable:

    struct escrow {
        uint amount;
        address depositor;
        address beneficiary;
        address approver;
        bool approved;
        bool active;
    }

    mapping (bytes32 => escrow) escrowRegistry;

    constructor(string memory _greetings) { //only to record deployer to make it ownable.
        owner = msg.sender;
    }
    
    function  deposit(address _beneficiary, address _approver) external payable {
        address _depositor = msg.sender;
        uint _amount = msg.value;
        bytes32 _escrowID = keccak256(abi.encodePacked(nonce,_depositor));
        escrowRegistry[_escrowID].amount = _amount;
        escrowRegistry[_escrowID].depositor = _depositor;
        escrowRegistry[_escrowID].beneficiary = _beneficiary;
        escrowRegistry[_escrowID].approver = _approver;
        escrowRegistry[_escrowID].active = true;
        nonce += 1;
        emit DepositReceived(_escrowID, _depositor, _beneficiary, _approver, _amount);
    }

    function approve(bytes32 _escrowID) external;
    
    function withdrawFunds(bytes32 _escrowID) external;

    function cancelEscrow(bytes32 _escrowID) external;
    /*
     * Utility functions this function would never be in this kind of contract. 
     * This is here to avoid getting funds stuck in contract while testing.
     */

}
