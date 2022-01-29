/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
 require("@nomiclabs/hardhat-ethers");
 
 const { API_URL, PRIVATE_KEY } = process.env;
 
 module.exports = {
    solidity: "0.7.3",
    defaultNetwork: "polygon_mumbai",

    paths: {
      sources: "./src/contracts",
      tests:"./test",
      artifacts:"./src/artifacts"
  
    },
    networks: {
       hardhat: {},
       polygon_mumbai: {
          url: API_URL,
          accounts: [`0x${PRIVATE_KEY}`]
       }
    },

 }