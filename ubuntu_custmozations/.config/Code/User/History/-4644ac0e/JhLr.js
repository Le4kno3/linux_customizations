
const label = "HalbornToken"
const symobol = "HAL"
const amount = (10000 * 10 ** 18).toLocaleString('fullwide', {useGrouping:false}) //total tokens = 100 tokens + convert scientific (1e+22) form to digits form for big numbers
const deployer = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" //address of owner
const root = "0x02446fb530b6910eeb393d46bc62ab36ddca2c8028366c87507ff3091172d6d1" //any hash value of type byte32

//convert scientific (1e+22) form to digits form for big numbers.
// amount = myNumb.toLocaleString('fullwide', {useGrouping:false}) )

async function main() {
    // creating a new instance of the solidity contract.
    const HalbornToken = await ethers.getContractFactory("HalbornToken");
    
    //this is what we need to interact with the smart contract.
    const myHalbornToken = await HalbornToken.deploy(label, symobol, amount, deployer, root);
  
    //deploy the contract
    await myHalbornToken.deployed();
  
    //give user confirmation that contract is deployed
    console.log("Contract deployed to:", myHalbornToken.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  