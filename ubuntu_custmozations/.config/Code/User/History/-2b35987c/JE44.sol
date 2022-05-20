// SPDX-License-Identifier: UNLICENSED
/*


15/04/2022

Halborn ERC20 token contract

Flow:
1. Our CISO Steve will deploy the contract minting to his wallet 10000 Halborn Tokens
2. Steve will transfer 100 Halborn tokens to each employee
3. Gabi, our Director of Offensive Security Engineering, will ask to each of the employees to lock the tokens in the contract 
by calling the newTimeLock() function with the following parameters:
    a. timelockedTokens -> 100_000000000000000000 (The 100 tokens) - Amount of tokens that is locked.
    b. vestTime -> The vestTime will be the current block.timestamp (now)
    c. cliffTime -> The cliffTime should be 6 months. Means after 6 months employee can start using/trading his tokens.
    d. disbursementPeriod -> The disbursementPeriod should be 1 year - (now to now + disbursmentPeriod) during this time interval all your tokens will be vetted/given to you.

We can not wait to use these tokens but we always audit everything before a deployment
Maybe can you give us a hand with this task? 
Although... hacking a Halborn's hacker contract? Not gonna happen

*/

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract HalbornToken is ERC20{
    //functions that are not visible here are part of ERC20

    // 1. Initialization and pre-steps
    
    /// 1.1 token locking state variables for the particular address that we want to lock tokens.
    mapping(address => uint256) public disbursementPeriod;
    mapping(address => uint256) public vestTime;
    mapping(address => uint256) public cliffTime;
    mapping(address => uint256) public timelockedTokens;

    address private signer;
    bytes32 private root;   //merkle root

    event NewTokenLock(address tokenHolder, uint256 amountLocked, uint256 vestTime, uint256 cliffTime, uint256 period);

    // constructor call
    //name_ is sent to ERC20.name_, similarly the symbol_
    constructor(string memory name_, string memory symbol_, uint256 amount_, address deployer_, bytes32 _root) ERC20(name_, symbol_){
        _mint(deployer_, amount_);
        signer = deployer_;
        root = _root;
    }


    // 2. Timelock function
    function newTimeLock(uint256 timelockedTokens_, uint256 vestTime_, uint256 cliffTime_, uint256 disbursementPeriod_)
        public
    {
        uint nowTime = block.timestamp;
        console.log("block.timestamp", nowTime);

        require(timelockedTokens_ > 0, "Cannot timelock 0 tokens");
        

        //the requestor must have enough tokens for it to be invested to this contract.
        require(timelockedTokens_ <= balanceOf(msg.sender), "Cannot timelock more tokens than current balance");  
        
        // checks if the requestor has already invested in the contract, if yes then it is not allowed.
        require(balanceLocked(msg.sender) == 0, "Cannot timelock additional tokens while tokens already locked");
        
        // simple check
        require(disbursementPeriod_ > 0, "Cannot have disbursement period of 0");
        
        // simple check
        require(vestTime_ > nowTime, "vesting start must be in the future");
        
        // wrong logic, cliffTime must be less or equal vestTime, because after clifTime only vestTime starts.
        require(cliffTime_ >= vestTime_, "cliff must be at same time as vesting starts (or later)");

        // assignment to state variable
        disbursementPeriod[msg.sender] = disbursementPeriod_;
        
        // assignment to state variable
        vestTime[msg.sender] = vestTime_;
        
        // assignment to state variable
        cliffTime[msg.sender] = cliffTime_;
        
        // assignment to state variable
        timelockedTokens[msg.sender] = timelockedTokens_;
        
        // log or send message to the blockchain about the transaction
        emit NewTokenLock(msg.sender, timelockedTokens_, vestTime_, cliffTime_, disbursementPeriod_);
    }

    // 3. Query to get users details realted to timelock.
    
    /// 3.1 Calculates the amount of locked tokens for address `who`
    /// of locked tokens 
    function balanceLocked(address who) public view returns (uint256 amount){

        if(timelockedTokens[who] == 0){
            return 0;
        }
        if( vestTime[who] > block.timestamp || cliffTime[who] > block.timestamp){
            return timelockedTokens[who];
        }
        uint256 maxTokens = timelockedTokens[who] * (block.timestamp - vestTime[who]) / disbursementPeriod[who];
        if(maxTokens >= timelockedTokens[who]){
            return 0;
        }
        return timelockedTokens[who] - maxTokens;

    }


    /// 3.2 Calculates the maximum amount of transferrable tokens for address `who`
    /// @return Number of transferrable tokens 
    function calcMaxTransferrable(address who) public view returns (uint256)
    {
        if(timelockedTokens[who] == 0){
            return balanceOf(who);
        }
        uint256 maxTokens;
        if( vestTime[who] > block.timestamp || cliffTime[who] > block.timestamp){
            maxTokens = 0;
        } else {
            console.log("timelockedTokens[who]", timelockedTokens[who]);
            console.log("block.timestamp", block.timestamp);
            console.log("vestTime[who]", vestTime[who]);
            console.log("disbursementPeriod[who]", disbursementPeriod[who]);
            maxTokens = timelockedTokens[who] * (block.timestamp - vestTime[who]) / disbursementPeriod[who];
            console.log("maxTokens", maxTokens);
        }
        if (timelockedTokens[who] < maxTokens){
          return balanceOf(who);
        }
        return balanceOf(who) - timelockedTokens[who] + maxTokens;
    }
    /// Alias - for backwards compatibility of calcMaxTransferrable.
    function balanceUnlocked(address who) public view returns (uint256 amount){
        return calcMaxTransferrable(who);
    }    


    // 4. 
    /**
     * _beforeTokenTransfer is called before any transfer of tokens or minting or burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - New Tokens minted: when `from` is zero (no address is sending), `amount` tokens will be minted for `to`.
     * - Existing Tokens are Burnted: when `to` is zero (it means burning only, if you transfer any token to NULL address the tokens will be burned), `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     */
    
     // Checking if a user have enought for transfer.
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        
        // fetched the transferrable token on the "from" address.
        uint maxTokens = calcMaxTransferrable(from);

        // if "from" address has enought token then success, else throw error. If no error then good to go.
        if (from != address(0x0) && amount > maxTokens){
          revert("amount exceeds available unlocked tokens");
        }
    }


    // 5. MINTING TOKENS

    /// 5.1 Minting using Signatures-------------------------------------------------------------------
    /// @dev Sets a new signer account. Only the current signer can call this function
    function setSigner(address _newSigner) public {
        require (msg.sender != signer, "You are not the current signer");
        signer = _newSigner;
    }
    /// @dev Used in case we decide totalSupply must be increased
    //
    function mintTokensWithSignature(uint256 amount, bytes32 _r, bytes32 _s, uint8 _v) public {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 messageHash = keccak256(
            abi.encode(address(this), amount, msg.sender)
        );
        bytes32 hashToCheck = keccak256(abi.encodePacked(prefix, messageHash));
        require(signer == ecrecover(hashToCheck, _v, _r, _s), "Wrong signature");
        _mint(msg.sender, amount);
    }

    /// 5.2 Minting using Whitelist---------------------------------------------------------------------
    /// @dev Used only by whitelisted users. The MerkleRoot is set in the constructor
    // mint tokens - For whitelisted users
    function mintTokensWithWhitelist(uint256 amount, bytes32 _root, bytes32[] memory _proof) public {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(verify(leaf, _root, _proof), "You are not whitelisted.");
        _mint(msg.sender, amount);
    }
    // verify that that msg.sender is whitelisted or not.
    function verify(bytes32 leaf, bytes32 _root, bytes32[] memory proof) public view returns (bool) {
        bytes32 computedHash = leaf;
        for (uint i = 0; i < proof.length; i++) {
          bytes32 proofElement = proof[i];
          if (computedHash <= proofElement) {
            computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
          } else {
            computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
          }
        }
        return computedHash == _root;
    }

    //END
}