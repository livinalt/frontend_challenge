import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      try {
        const accounts = await ethWallet.request({ method: "eth_accounts" });
        handleAccount(accounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);

      // once the wallet is set, we can get a reference to our deployed contract
      getATMContract();
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(
      contractAddress, atmABI, signer
    );

    setATM(atmContract);
  };

  const getBalance = async () => {
    try {
      if (atm) {
        const balance = await atm.getBalance();
        setBalance(balance.toNumber());
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const deposit = async () => {
    if (atm) {
      try {
        let tx = await atm.deposit(1);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error depositing:", error);
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      try {
        let tx = await atm.withdraw(1);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error withdrawing:", error);
      }
    }
  };

  const handleTransferAddressChange = (event) => {
    setTransferAddress(event.target.value);
  };

  const handleTransferAmountChange = (event) => {
    setTransferAmount(event.target.value);
  };

  const transfer = async () => {
    if (atm && transferAddress && transferAmount) {
      try {
        const amountInWei = ethers.utils.parseEther(transferAmount);
        
        // Use transfer method for safer transfer
        await atm.transferToContract(transferAddress, amountInWei);
        
        getBalance();
      } catch (error) {
        console.error("Error transferring funds:", error.message);
      }
    }
  };

  const initUser = () => {
    // Check to see if the user has Metamask
    if (!ethWallet) {
      return (
        <div>
          <p>Please install Metamask in order to use this ATM.</p>
        </div>
      );
    }

    // Check to see if the user is connected. If not, connect to their account
    if (!account) {
      return (
        <div>
          <button onClick={connectAccount}>
            Please connect your Metamask wallet
          </button>
        </div>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <div>
          <p>Your Account: {account}</p>
          <p>Your Balance: {balance} ETH</p>
        </div>
        
        <div>
          <button onClick={deposit}>
            Deposit 1 ETH
          </button>
        
          <button onClick={withdraw}>
            Withdraw 1 ETH
          </button>
        
        </div>
        <div>
          <h2>Transfer Funds</h2>
        
          <label>
            Transfer Address:
            <input
              type="text"
              value={transferAddress}
              onChange={handleTransferAddressChange}
            />
          </label>
        
          <label>
            Transfer Amount (ETH):
            <input
              type="text"
              value={transferAmount}
              onChange={handleTransferAmountChange}
            />
          </label>
          <button onClick={transfer}>
            Transfer
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);
  const styles = {
    main: {      
      margin: "0 auto",
      padding: "20px",
      textAlign: "center",           
    },
  };
  
  
  return (
    <main className="container">
    <header>
      <h1>Welcome to the Majorie Hub!</h1>
    </header>
    {initUser()}
    <style jsx>{`
      .container {
        text-align: center;
      }
  
      header {
        background-color: #0067ff;
        color: #dedede;
        padding: 10px;
        margin-bottom: 20px;
      }
  
      h1 {
        margin: 0;
      }
    `}
    </style>
    </main>
  )
    }