require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts:["0x619ce0489a1f71b43d71053a8e046d81a6f91198a69d75d77a1ddaec2c717065"] // Ensure this matches your Ganache setup
      // If you want to use specific accounts from Ganache, add their private keys here
      // accounts: ["0x...", "0x..."]
    }
  }
};
