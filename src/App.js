import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './Constant/constant';
import Login from './Components/Login';
import Finished from './Components/Finished';
import Connected from './Components/Connected';
import Register from './Components/Register';
import Help from './Components/Help'; // Import the Help component
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [canVote, setCanVote] = useState(true);
  const [registered, setRegistered] = useState(false); // State to track registration
  const [showHelp, setShowHelp] = useState(false); // State to control Help component visibility


  // Google Analytics integration
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-FLSP4DJVD5'); // Replace with your actual Measurement ID
    }
  }, []);

  
  async function vote() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

      const tx = await contractInstance.vote(number);
      await tx.wait();
      checkCanVote();
    } catch (error) {
      console.error('Error while voting:', error);
    }
  }

  async function checkCanVote() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const voteStatus = await contractInstance.voters(await signer.getAddress());
      setCanVote(voteStatus);
    } catch (error) {
      console.error('Error while checking voting status:', error);
    }
  }

  async function getCandidates() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const candidatesList = await contractInstance.getAllVotesOfCandiates();
      const formattedCandidates = candidatesList.map((candidate, index) => {
        return {
          index: index,
          name: candidate.name,
          voteCount: candidate.voteCount.toNumber(),
        };
      });
      setCandidates(formattedCandidates);
    } catch (error) {
      console.error('Error while getting candidates:', error);
    }
  }

  async function getCurrentStatus() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const status = await contractInstance.getVotingStatus();
      console.log(status);
      setVotingStatus(status);
    } catch (error) {
      console.error('Error while getting voting status:', error);
    }
  }

  async function getRemainingTime() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const time = await contractInstance.getRemainingTime();
      setRemainingTime(parseInt(time, 16));
    } catch (error) {
      console.error('Error while getting remaining time:', error);
    }
  }

  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      checkCanVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }, [account]);

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setAccount(address);
        console.log('Metamask Connected:', address);
        setIsConnected(true);
        checkCanVote();
      } catch (error) {
        console.error('Error while connecting to Metamask:', error);
      }
    } else {
      console.error('Metamask is not detected in the browser');
    }
  }
  

  async function handleRegistration(name, age) {
    try {
      // Here you can handle the registration logic, if needed
      // For simplicity, let's just console.log the name and age for now
      console.log('Name:', name);
      console.log('Age:', age);

      // Assuming registration is successful, update the state to show login
      setRegistered(true);
    } catch (error) {
      console.error('Error while handling registration:', error);
    }
  }

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  useEffect(() => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [handleAccountsChanged]);

  function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  return (
    <div className="App">
      {/* Show Help button only if user is registered and on the Connected page */}
      {(registered && isConnected) && (
        <button className="help-button" onClick={toggleHelp}>
          Documentation & Help
        </button>
      )}

      {/* Show Help component if the state is true */}
      {showHelp && <Help />}

      {/* Show appropriate component based on voting status */}
      {votingStatus ? (
        isConnected ? (
          <Connected
            account={account}
            candidates={candidates}
            remainingTime={remainingTime}
            number={number}
            handleNumberChange={handleNumberChange}
            voteFunction={vote}
            showButton={canVote}
          />
        ) : (
          <div>
            {registered ? (
              // Show login page after successful registration
              <Login
                connectWallet={connectToMetamask}
                showHelpButton={showHelp}
                toggleHelp={toggleHelp}
              />
            ) : (
              // Show registration page
              <Register handleRegistration={handleRegistration} />
            )}
          </div>
        )
      ) : (
        <Finished />
      )}
    </div>
  );
}

export default App;