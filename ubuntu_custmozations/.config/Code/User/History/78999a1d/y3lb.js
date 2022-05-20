const { expect } = require("chai");
const { ethers } = require("hardhat");
const chai = require("chai");
const ethers_lib = require("ethers");
chai.use(require('chai-bignumber')(ethers.BigNumber));

//using mocha "describe" + label that we are testing our contract.
describe("Contract: Token contract", function () {
    //Write test cases below
    let Token;
    let myToken;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let val1 = 0
    let val2 = 0
    let ownerBalance = 0
    // let addr1Balance = 0
    // let addr2Balance = 0

    //beforeEach automation
    beforeEach(
        async function(){
            //getSigners gives test accounts.
            const [owner,addr1,addr2] = await ethers.getSigners();

            //prints the owner
            console.log("Signers Object: ", owner);

            //specify contract, to be used in instance creation.
            const Token = await ethers.getContractFactory("Token");

            //this is what we need to interact with the smart contract.
            const myToken = await Token.deploy();

        }
    )

    //Test Case 1:
    it("1. Deployment should assign the total supply of tokens to the owner",
        async function(){

            //specify contract, to be used in instance creation.
            const Token = await ethers.getContractFactory("Token");

            //this is what we need to interact with the smart contract.
            const myToken = await Token.deploy();

            //get balance of owner, by calling "balanceOf()" function of the contract
            ownerBalance = await myToken.balanceOf(owner.address);

            console.log("Owner Address:", owner.address);

            expect(await myToken.totalSupply()).to.eql(ownerBalance);
        }
    );

    //Test Case 2:
    it("2. Should transfer tokens between accounts",
        async function(){

            //transfer 10 tokens from owner to addr1
            await myToken.transfer(addr1.address, 10)
            val1 = await myToken.balanceOf(addr1.address)
            val2 = ethers_lib.BigNumber.from(10);
            expect(val1).to.eql(val2);  //verify transfer
            
            //Transfer 5 tokens from addr1 to addr2. As we are not owner, we need special call.
            await myToken.connect(addr1).transfer(addr2.address,5)
            val1 = await myToken.balanceOf(addr2.address)
            val2 = ethers_lib.BigNumber.from(5);
            expect(val1).to.eql(val2);  //verify transfer
        }
    );    

});