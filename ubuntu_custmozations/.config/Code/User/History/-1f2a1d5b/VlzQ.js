async function main() {
// specify contract
const FirstContract = await ethers.getContractFactory("Token");

//this is what we need to interact with the smart contract.
const myFirstContract = await FirstContract.deploy();

//deploy the contract
await myFirstContract.deployed();

//give user confirmation that contract is deployed
console.log("Contract deployed to:", myFirstContract.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {s
    console.error(error);
    process.exit(1);
});