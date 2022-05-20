// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2 <0.9.0;

import {Escow} from "./interface/EscrowInterface.sol";

contract AttackContract{
    address owner;

    Escrow escrow;
    uint deposit;
    byptes32 escrowID;



    owner = msg.sender;
}