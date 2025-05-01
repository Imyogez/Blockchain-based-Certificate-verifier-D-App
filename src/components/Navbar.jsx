import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const checkAdmin = async (address) => {
      const adminAddress = '0x10E130F782b961eC76eDbE793E8014f166E33C91';
      if (address.toLowerCase() === adminAddress.toLowerCase()) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const signerAddress = await signer.getAddress();
          setAccount(signerAddress);
          setIsConnected(true);
          await checkAdmin(signerAddress);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('Ethereum wallet is not connected.');
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        setAccount(signerAddress);
        setIsConnected(true);
        const adminAddress = '0x10E130F782b961eC76eDbE793E8014f166E33C91';
        if (signerAddress.toLowerCase() === adminAddress.toLowerCase()) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('User rejected the request or another error occurred:', error);
      }
    } else {
      console.error('MetaMask is not installed.');
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-teal-500 to-blue-500 shadow-md sm:px-6 lg:px-8">
      <div className="flex items-center">
        <a href="/" className="text-lg font-semibold text-white hover:text-gray-200 transition duration-300">
          Home
        </a>
      </div>

      <div className="flex items-center space-x-4">
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Connect to MetaMask
          </button>
        ) : (
          <span className="px-4 py-2 text-sm text-white bg-gray-800 rounded-md">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        )}

     
          <a
            href="/issueCertificate"
            className="px-4 py-2 text-white bg-green-700 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
          >
            Issue Certificate
          </a>
      
      </div>
    </nav>
  );
};

export default Navbar;
