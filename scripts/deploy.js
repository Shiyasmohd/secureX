async function main() {
    const securex = await ethers.getContractFactory("Securex");
 
    // Start deployment, returning a promise that resolves to a contract object
    const secure_x = await securex.deploy();   
    console.log("Contract deployed to address:", secure_x.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });