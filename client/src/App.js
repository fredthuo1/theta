import React, { useState, useEffect } from 'react';
import ConnectWallet from './components/ConnectWallet';
import UploadVideo from './pages/UploadVideo';
import VideoList from './pages/VideoList';
import UserProfile from './pages/UserProfile';
import NFTMarketplace from './pages/NFTMarketplace';
import Web3 from 'web3';

const App = () => {
    const [account, setAccount] = useState('');

    useEffect(() => {
        const loadWeb3 = async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
            }
        };
        loadWeb3();
    }, []);

    return (
        <div>
            <h1>Decentralized Video Platform</h1>
            <ConnectWallet />
            {account && <UserProfile address={account} />}
            <UploadVideo />
            <VideoList />
            <NFTMarketplace />
        </div>
    );
};

export default App;
