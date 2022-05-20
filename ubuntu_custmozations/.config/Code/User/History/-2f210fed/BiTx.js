//for interacting with smart contract.
// steve, takshil, bob

function scientificToDecimals(i){
  var str='';
  do{
    let a = i%10;
    i=Math.trunc(i/10);
    str = a+str;
  }while(i>0)
  return str;
 }

task("get-balance", "Reads the number")
  .addParam("contract", "The contract")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract
    const MyHalbornToken = await ethers.getContractFactory("HalbornToken")
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

// We require a provider to query the network
    // let provider = ethers.getDefaultProvider();
    let provider = ethers.getDefaultProvider();

    let privateKey1 = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    const steve = new ethers.Wallet(privateKey1, provider);

    let privateKey2 = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
    const takshil = new ethers.Wallet(privateKey2, provider);

    let privateKey3 = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
    const bob = new ethers.Wallet(privateKey3, provider);
    
    //we were doing all the transaction from steve account now.
    let myHalbornToken_steve = await new ethers.Contract(contractAddr, MyHalbornToken.interface, steve)
    // let myHalbornToken_steve = await new ethers.Contract(contractAddr, MyHalbornToken.interface, steve)

    // let steve_balance = BigInt(await myHalbornToken_steve.balanceOf(steve.address)).toString()
    // let takshil_balance = BigInt(await myHalbornToken_steve.balanceOf(takshil.address)).toString()
    // let bob_balance = BigInt(await myHalbornToken_steve.balanceOf(bob.address)).toString()
    
    //state when contract is deployed.
    // console.log("Step 1: When the project is initialized.================")
    // console.log("Address of Steve: ", steve.address);
    // console.log("Balance of Steve: ", steve_balance);
    // console.log("Address of Takshil: ", takshil.address);
    // console.log("Balance of Takshil: ", takshil_balance);
    // console.log("Address of Bob: ", bob.address);
    // console.log("Balance of Bob: ", bob_balance);

    // console.log("=========================")
    // console.log(signer)
    // console.log("=========================")
    // console.log(takshil)
    
    //steve sends 100 tokens to takshil
    //we were doing all the transaction from steve account until now.
    // let someamount = scientificToDecimals(100 * 10 ** 18);
    // console.log("somemount: ", someamount);
    // await myHalbornToken_steve.transfer(takshil.address, someamount);
    // takshil_balance = BigInt(await myHalbornToken_steve.balanceOf(takshil.address)).toString()
    // console.log("100 tokens were transfered from steve to takshil")
    // console.log("Balance of Takshil: ", takshil_balance);

    //we were doing all the transaction from steve account now.
    // let myHalbornToken_takshil = await new ethers.Contract(contractAddr, MyHalbornToken.interface, takshil)

    // //takshil sends 40 tokens to bob
    // let someamount = scientificToDecimals(40 * 10 ** 18);
    // console.log("somemount: ", someamount);
    // await myHalbornToken.approve(takshil.address, someamount);
    // await myHalbornToken.transferFrom(takshil.address, someamount);
    // await steve.transfer(takshil.address, someamount)


  });

module.exports = {};