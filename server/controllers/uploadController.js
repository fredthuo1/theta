var Web3 = require('web3');
const contract = require('@truffle/contract');
const VideoNFTArtifact = require('../../contracts/build/contracts/VideoNFT.json');
const { create } = require('ipfs-http-client');
const mongoose = require('mongoose');
const FormData = require('form-data');
const axios = require('axios');

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmMjk0NGVmZC0wOTZlLTRhZWQtOTk2OC03NTc3MWYyN2QxNjEiLCJlbWFpbCI6InRodW9mcmVkMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2I4ZDc0ZDE4OTk5MDVlZGQyMjUiLCJzY29wZWRLZXlTZWNyZXQiOiJkNTFmZjI5YjVjOWJmZTg1ZjdkNjQyYTZiZGI4NzNlNDlkN2UzZTI4OWJiNjY0NWUyMzhmOTcwYTNhMjJlYWVkIiwiZXhwIjoxNzUzMzM3NDE2fQ.7H7icmHhULffBt1VSiVPKCC-AvZ2XdM1RnIb8WcW0Ig';
const projectId = 'YOUR_INFURA_PROJECT_ID';
const projectSecret = 'YOUR_INFURA_PROJECT_SECRET';
const auth = 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: { authorization: auth },
});

var web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));

const VideoNFT = contract(VideoNFTArtifact);
VideoNFT.setProvider(web3.currentProvider);

const videoSchema = new mongoose.Schema({
    ipfsHash: String,
    metadata: Object,
});

const Video = mongoose.model('Video', videoSchema);

exports.uploadVideo = async (req, res) => {
    try {
        const { file } = req;
        if (!file) {
            console.log('No file uploaded');
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        console.log('Uploading file to IPFS via Pinata...');

        const formData = new FormData();
        formData.append('file', file.buffer, file.originalname);
        const pinataMetadata = JSON.stringify({ name: file.originalname });
        formData.append('pinataMetadata', pinataMetadata);
        const pinataOptions = JSON.stringify({ cidVersion: 0 });
        formData.append('pinataOptions', pinataOptions);

        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                Authorization: `Bearer ${JWT}`,
            },
        });

        const ipfsHash = response.data.IpfsHash;
        console.log('File added to IPFS:', ipfsHash);

        const metadata = { name: file.originalname, description: 'Video uploaded', hash: ipfsHash };
        const db = req.app.locals.db;
        const videosCollection = db.collection('videos');
        await videosCollection.insertOne({ ipfsHash, metadata });

        console.log('Minting NFT...');
        const accounts = await web3.eth.getAccounts();
        const instance = await VideoNFT.deployed();
        const result = await instance.createToken(ipfsHash, { from: accounts[0] });

        res.json({ success: true, ipfsHash, transaction: result });
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};