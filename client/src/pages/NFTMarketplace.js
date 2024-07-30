import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import VideoNFT from '../contracts/VideoNFT.json';

const NFTMarketplace = () => {
    const [nfts, setNfts] = useState([]);
    const [account, setAccount] = useState('');

    useEffect(() => {
        const loadBlockchainData = async () => {
            const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            const networkId = await web3.eth.net.getId();
            const networkData = VideoNFT.networks[networkId];
            if (networkData) {
                const contract = new web3.eth.Contract(VideoNFT.abi, networkData.address);
                const totalSupply = await contract.methods.totalSupply().call();
                let nfts = [];
                for (let i = 1; i <= totalSupply; i++) {
                    const nft = await contract.methods.tokens(i).call();
                    nfts.push(nft);
                }
                setNfts(nfts);
            } else {
                alert('Smart contract not deployed to detected network.');
            }
        };

        loadBlockchainData();
    }, []);

    return (
        <div>
            <h2>NFT Marketplace</h2>
            <p>Account: {account}</p>
            <ul>
                {nfts.map((nft, index) => (
                    <li key={index}>
                        <p>{nft.name}</p>
                        <video width="300" controls>
                            <source src={`https://ipfs.infura.io/ipfs/${nft.uri}`} type="video/mp4" />
                            Your browser does not support the video tag.
            </video>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NFTMarketplace;
