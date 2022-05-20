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
        amount = ethers.utils.parseUnits("10000", 18); //total tokens = 100 tokens
        deployer = steve.address //"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" //address of owner
        root = "0x02446fb530b6910eeb393d46bc62ab36ddca2c8028366c87507ff3091172d6d1" //taken any has just for filling parameter.
    
        console.log("Halborn Token Contract is deployed by Steve.\n")
        const MyHalbornToken = await ethers.getContractFactory('HalbornToken', steve);
        myHalbornToken = await MyHalbornToken.deploy(label, symobol, amount, deployer, root);
        await myHalbornToken.deployed();

    });

    // describe("Steve sends 100 Tokens to Takshil.", function () {
    //     beforeEach(async function() {
    //         //steve sent takshil 100 tokens
    //         tmp = ethers.utils.parseUnits("100", 18);
    //         await myHalbornToken.connect(steve).transfer(takshil.address, tmp);
    //     });

    //     it('Check if Takshil has received 100 Tokens', async function () {
    //         tmp = ethers.utils.parseUnits("100", 18);
    //         expect((await myHalbornToken.balanceOf(takshil.address)).toString()).to.equal(tmp);
    //     });
    // });

    // describe("Takshil timelocked 100 tokens", function () {
    //     beforeEach(async function() {
    //         //steve sent takshil 100 tokens
    //         tmp = ethers.utils.parseUnits("100", 18);
    //         await myHalbornToken.connect(steve).transfer(takshil.address, tmp);

    //         //Takshil timelocked 100 tokens
    //         tmp = ethers.utils.parseUnits("100", 18);
    //         let nowTime = (await provider.getBlock()).timestamp
    //         let vestTime = nowTime + 200; //adding 200 to adjust the processing delay in this testing environment, so that vestTime > block.timestamp 
    //         let cliffTime = nowTime + 15768000 + 200;   //after 6 months (in seconds) cliffTime is reached.
    //         let disbursementPeriod = 31536000;  // 1 year (in seconds)
    //         console.log("Set amountLocked: ",tmp.toString())
    //         console.log("Set vestTime: ",vestTime)
    //         console.log("Set cliffTime: ",cliffTime)
    //         console.log("Set disbursementPeriod: ",disbursementPeriod)
    //         await myHalbornToken.connect(takshil).newTimeLock(tmp, vestTime, cliffTime, disbursementPeriod);
    //     });

    //     it('Check if Takshil has 0 transferable Tokens at this time.', async function () {
    //         tmp = ethers.utils.parseUnits("0", 18);
    //         expect((await myHalbornToken.calcMaxTransferrable(takshil.address)).toString()).to.equal(tmp);
    //     });
    // });

    // describe("After six months, Takshil check his unlocked tokens.", function () {
    //     beforeEach(async function() {
    //         //steve sent takshil 100 tokens
    //         tmp = ethers.utils.parseUnits("100", 18);
    //         await myHalbornToken.connect(steve).transfer(takshil.address, tmp);

    //         //Takshil timelocked 100 tokens
    //         tmp = ethers.utils.parseUnits("100", 18);
    //         let nowTime = (await provider.getBlock()).timestamp
    //         let vestTime = nowTime + 200; //adding 200 to adjust the processing delay in this testing environment, so that vestTime > block.timestamp 
    //         let cliffTime = nowTime + 15768000 + 200;   //after 6 months (in seconds) cliffTime is reached.
    //         let disbursementPeriod = 31536000;  // 1 year (in seconds)
    //         console.log("Set amountLocked: ",tmp.toString())
    //         console.log("Set vestTime: ",vestTime)
    //         console.log("Set cliffTime: ",cliffTime)
    //         console.log("Set disbursementPeriod: ",disbursementPeriod)
    //         await myHalbornToken.connect(takshil).newTimeLock(tmp, vestTime, cliffTime, disbursementPeriod);

    //         //sleep for 6 months (15778800)
    //         console.log("\nSleep for 6 months (15778800).........\n")
    //         await network.provider.send("evm_increaseTime", [15778800]);
    //         await network.provider.send("evm_mine")
    //     });

    //     it('Check if Takshil has atleast 50 Tokens (vesting owned after 6 months)', async function () {
    //         tmp = ethers.utils.parseUnits("50", 18);
    //         expect((await myHalbornToken.balanceUnlocked(takshil.address)).toString()).to.be.above(tmp);
        
    //     });
    // });

    describe("Could Takshil transfer these unlocked tokens to Bob.", function () {
        beforeEach(async function() {
            //steve sent takshil 100 tokens
            tmp = ethers.utils.parseUnits("100", 18);
            await myHalbornToken.connect(steve).transfer(takshil.address, tmp);

            //Takshil timelocked 100 tokens
            tmp = ethers.utils.parseUnits("100", 18);
            nowTime = (await provider.getBlock()).timestamp;
            let vestTime = nowTime + 200; //adding 200 to adjust the processing delay in this testing environment, so that vestTime > block.timestamp 
            let cliffTime = nowTime + 15768000 + 200;   //after 6 months (in seconds) cliffTime is reached.
            let disbursementPeriod = 31536000;  // 1 year (in seconds)
            console.log("Set amountLocked: ",tmp.toString())
            console.log("Set vestTime: ",vestTime)
            console.log("Set cliffTime: ",cliffTime)
            console.log("Set disbursementPeriod: ",disbursementPeriod)
            await myHalbornToken.connect(takshil).newTimeLock(tmp, vestTime, cliffTime, disbursementPeriod);

            //sleep for 6 months (15778800)
            console.log("\nSleep for 6 months (15778800).........\n")
            await network.provider.send("evm_increaseTime", [15778800]);
            await network.provider.send("evm_mine");

            //send 30 Tokens to Bob
            console.log("Transferable balance tokens that Takshil has: ", (await myHalbornToken.calcMaxTransferrable(takshil.address)).toString())
            tmp = ethers.utils.parseUnits("30", 18);
            await myHalbornToken.connect(takshil).transfer(bob.address, tmp);
        });

        it('Check if Bob has received 30 Tokens', async function () {
            tmp = ethers.utils.parseUnits("30", 18);
            expect((await myHalbornToken.balanceOf(bob.address)).toString()).to.equal(tmp);
            console.log("Updated balance tokens of Bob: ", (await myHalbornToken.balanceOf(bob.address)).toString());
            
            //reset sleep time
            console.log("\nReset Sleep Time to prepare for further testing.........\n")
            newTime = (await provider.getBlock()).timestamp - 15778800;
            await network.provider.send("evm_setNextBlockTimestamp", [newTime]);
            await network.provider.send("evm_mine");
        });
    });
    
});