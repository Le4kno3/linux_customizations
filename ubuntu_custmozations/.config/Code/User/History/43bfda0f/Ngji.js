const {expect} = require("chai");
const { ethers } = require("ethers");
// const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Token contract", function () {
    //define test
    //this test is just to validate contructor.
    it("Deployment should assing the total supply of the owner", async function(){
        
        
        const [owner] = await ethers.getSigners();  //using signer we can access accounts

        console.log("Signers object:", owner);

        //create an instance of our contract
        const Token = await ethers.getContractFactory("Token");  //getContractFactory to create instance of contract.
        
        //this contract will be deployed internal to hardhat environment not a actual blockchain.
        const hardhatToken = await Token.deploy();

        //get owners balance = 10000
        const ownerBalance = await hardhatToken.balanceOf(owner.addr);

        console.log("Owner Address: ", owner.address);

        //check if totalSupply == owner's balance == 10000
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});