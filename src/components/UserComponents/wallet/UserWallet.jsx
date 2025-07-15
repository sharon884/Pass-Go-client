import React, { useEffect, useState } from 'react';
import { fetchUserWallet } from '../../../services/user/userWalletServices';
import TransactionTable from '../../ui/TransactionTable';

const UserWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const res = await fetchUserWallet();
        setWallet(res.data.wallet);
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error("Failed to fetch wallet", err);
      }
    };
    loadWallet();
  }, []);


  {wallet ? (
  <div className="bg-white shadow p-4 rounded mb-4">
    <p className="text-lg">Balance: ₹{wallet.balance}</p>
  </div>
) : (
  <div className="text-gray-500">Loading wallet info...</div>
)}

{transactions.length > 0 ? (
  <TransactionTable transactions={transactions} />
) : (
  <p className="text-gray-500 mt-4">No transactions found.</p>
)}


  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">My Wallet</h1>
      {wallet && (
        <div className="bg-white shadow p-4 rounded mb-4">
          <p className="text-lg">Balance: ₹{wallet.balance}</p>
        </div>
      )}
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default UserWallet;
