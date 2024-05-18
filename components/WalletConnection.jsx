// src/components/WalletConnection.jsx
import React, { useState } from 'react';
import TonWeb from 'tonweb'; // Убедитесь, что вы установили tonweb библиотеку

const WalletConnection = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      const provider = new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'); // URL для подключения к TON
      const tonweb = new TonWeb(provider);

      // Логика подключения к Ton Keeper
      const response = await tonweb.provider.send('ton_connect', []);
      if (response.error) {
        throw new Error(response.error.message);
      }
      setAccount(response.result);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected as: {account}</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Ton Keeper Wallet</button>
      )}
    </div>
  );
};

export default WalletConnection;
