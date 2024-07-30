const Web3 = require('web3');
const contract = require('@truffle/contract');
const VideoNFTArtifact = require('../build/contracts/VideoNFT.json');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const VideoNFT = contract(VideoNFTArtifact);
VideoNFT.setProvider(web3.currentProvider);

exports.mintNFT = async (req, res) => {
  const { tokenURI } = req.body;
  const accounts = await web3.eth.getAccounts();
  const instance = await VideoNFT.deployed();
  const result = await instance.createToken(tokenURI, { from: accounts[0] });
  res.send(result);
};
