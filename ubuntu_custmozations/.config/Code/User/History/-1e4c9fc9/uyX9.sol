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
    
    function  deposit(address _beneficiary, address _approver) external;

    function approve(bytes32 _escrowID) external;
    
    function withdrawFunds(bytes32 _escrowID) external;

    function cancelEscrow(bytes32 _escrowID) external;
    /*
     * Utility functions this function would never be in this kind of contract. 
     * This is here to avoid getting funds stuck in contract while testing.
     */

}
