const { expect } = require("chai");
const { ethers, network } = require("hardhat");

let label;
let symobol;
let amount;
let deployer;
let root;
let myHalbornToken;
let steve;
let takshil;
let bob;
let martin;


describe("HalbornToken Contract Testing", function () {
    beforeEach(async function() {

        [steve, takshil, bob, martin] = await ethers.getSigners();

        label = "HalbornToken"
        symobol = "HAL"
        amount = ethers.utils.parseUnits("10000", 18);
        deployer = steve.address
        root = "0x02446fb530b6910eeb393d46bc62ab36ddca2c8028366c87507ff3091172d6d1" 
    
        console.log("Halborn Token Contract is deployed by Steve.\n")
        const MyHalbornToken = await ethers.getContractFactory('HalbornToken', steve);
        myHalbornToken = await MyHalbornToken.deploy(label, symobol, amount, deployer, root);
        await myHalbornToken.deployed();

    });

    describe("Verify setSigner", function () {

        it('Check if Steve can set Takshil as signer.', async function () {
            console.log("\n - Steve is the current signer, as steve deployed the contract.\n")
            console.log("Takshil's address: ", takshil.address)
            await myHalbornToken.connect(steve).setSigner(takshil.address);
        });

        it('Check if Takshil can set himself as signer.', async function () {
            console.log("\n - Steve is the current signer, as steve deployed the contract.\n")
            console.log("Takshil's address: ", takshil.address)
            await myHalbornToken.connect(takshil).setSigner(takshil.address);
        });

    });

});


function mintTokensWithWhitelist(uint256 amount, bytes32 _root, bytes32[] memory _proof) public {
    bytes32 computedHash = keccak256(abi.encodePacked(msg.sender)); //hash of address to verify 
    
    
    for (uint i = 0; i < _proof.length; i++) {
        bytes32 proofElement = _proof[i];
        if (computedHash <= proofElement) {
          computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
        } else {
          computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
        }
      }
    
    require(computedHash == _root);
    
    _mint(msg.sender, amount);
}
// verify that that msg.sender is whitelisted or not.
//proof[] ? - rest of the elements.
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