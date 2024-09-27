import { useState } from "react";
import "./App.css";
import { ethers } from "ethers";

function App() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);

  // Function to connect/disconnect the wallet
  async function connectWallet() {
    if (!connected) {
      // Connect the wallet using ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);
    } else {
      // Disconnect the wallet
      window.ethereum.selectedAddress = null;
      setConnected(false);
      setWalletAddress("");
    }
  }

  async function switchNetwork(chainId: number) {
    if (!window.ethereum) {
      console.error("No crypto wallet found");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toBeHex(chainId) }],
      });

      // Update current chain ID state
      setCurrentChainId(chainId);
    } catch (err: any) {
      if (err.code === 4902) {
        console.error(
          "This network is not available in your metamask, please add it manually"
        );
      } else {
        console.error(err);
      }
    }
  }

  return (
    <div className="app">
      <div className="main">
        <div className="content">
          <button className="btn" onClick={connectWallet}>
            {connected ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
          <h3>Address</h3>
          <h4 className="wal-add">{walletAddress}</h4>
          {connected && (
            <div>
              <h3>Switch Network</h3>
              <button onClick={() => switchNetwork(4202)}>
                Lisk sepolia chain
              </button>
              <button onClick={() => switchNetwork(8453)}>Base Chain</button>
              <button onClick={() => switchNetwork(11155111)}>
                Sepolia Chain
              </button>
              <p>Current Chain ID: {currentChainId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
