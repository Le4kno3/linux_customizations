// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2 <0.9.0;

import {Escrow} from "./interface/EscrowInterface.sol";

contract AttackContract{
    address owner;

    Escrow escrow;
    uint deposit;
    bytes32 escrowID;

    constructor() {
        owner = msg.sender;
    }

    function attack(bytes32 _escrowID, address _victim, uint _deposit) external{
        escrow = Escrow(_victim);
        escrow = _escrowID;
        desposit = _desposit;
        escrow.withdrawFunds(escrowID);
    }
    function(){

    }
    
}