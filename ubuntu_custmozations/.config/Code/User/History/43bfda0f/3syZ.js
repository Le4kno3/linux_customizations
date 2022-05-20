const {expect} = require("chai");
const { ethers } = require("ethers");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Token contract", function () {
    //define test

    it("Deployment should assing the total supply of the owner", async function(){
        
        
        const [owner] = await ethers.getSigners();  //using signer we can access accounts

        console.log("Signers object:", owner);
        const Token = await ethers.getContractFactory("Token")  //getContractFactory to create instance of contract.
        
        const hardhatToken = await Token.deploy();
    })
});