require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts:["0xb9eaefe4d6a765b19da67e354ad6b9aa055a02f76adbffeb5f53c701adf86210"] // Ensure this matches your Ganache setup
      // If you want to use specific accounts from Ganache, add their private keys here
      // accounts: ["0x...", "0x..."]
    }
  }
};
