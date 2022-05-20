// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2 <0.9.0;

contract AttackContract{
    address owner;

    owner = msg.sender;
}