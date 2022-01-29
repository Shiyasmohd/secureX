var Securex = artifacts.require("./Securex.sol");

module.exports = function(deployer) {
  deployer.deploy(Securex);
};
