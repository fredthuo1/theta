import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const ConnectWallet = () => {
    const [account, setAccount] = useState('');

    useEffect(() => {
        const loadWeb3 = async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
            } else {
                alert("Please install MetaMask to use this feature.");
            }
        };
        loadWeb3();
    }, []);

    return (
        <div>
            <button onClick={() => window.ethereum.enable()}>Connect Wallet</button>
            {account && <p>Connected account: {account}</p>}
        </div>
    );
};

export default ConnectWallet;
