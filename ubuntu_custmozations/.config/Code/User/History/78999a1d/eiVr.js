const { expect } = require("chai");
const { ethers } = require("hardhat");

//using mocha "describe" + label that we are testing our contract.
describe("Contract: Token contract", function () {
    //Write test cases below

    //Test Case 1:
    it("1. Deployment should assign the total supply of tokens to the owner",
        async function(){
            const [owner] = await ethers.getSigners();

            console.log("Signers Object: ", owner);

            //specify contract, to be used in instance creation.
            const Token = await ethers.getContractFactory("Token");

            //this is what we need to interact with the smart contract.
            const myToken = await Token.deploy();

            //get balance of owner, by calling "balanceOf()" function of the contract
            const ownerBalance = await myToken.balanceOf(owner.address);

            console.log("Owner Address:", owner.address);

            expect(await myToken.totalSupply()).to.eql(ownerBalance);
            // expect(await myToken.totalSupply()).to.eql(10000); //wrong testing due to mismatch type.
            // expect(await myToken.totalSupply()).to.deep.equal(ownerBalance);
        }
    );

    //Test Case 2:
    it("2. Should transfer tokens between accounts",
        async function(){
            //getSigners gives test accounts.
            const [owner,addr1,addr2] = await ethers.getSigners();

            console.log("Signers Object: ", owner);

            //specify contract, to be used in instance creation.
            const Token = await ethers.getContractFactory("Token");

            //this is what we need to interact with the smart contract.
            const myToken = await Token.deploy();

            //transfer 10 tokens from owner to addr1
            await myToken.transfer(addr1.address, 10)

            let val1 = await myToken.balanceOf(addr1.address)
            let val2 = 10
            expect(val1).to.eql(val2);
        }
    );    

});