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
    
}