const { expect } = require("chai");
const { ethers, network } = require("hardhat");

let tmp;
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
let provider = ethers.getDefaultProvider();
let newTime;
let nowTime;

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

        it('check if Steve is the current signer', async function () {
            console.log("Martin's address: ", martin.address)
            await myHalbornToken.connect(steve).setSigner(martin.address);
        });
    });

});