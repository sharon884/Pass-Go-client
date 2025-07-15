import React from 'react';

const TransactionTable = ({ transactions }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(txn => (
            <tr key={txn._id} className="border-t">
              <td className="p-2">{new Date(txn.createdAt).toLocaleString()}</td>
              <td className="p-2 capitalize">{txn.type.replace("_", " ")}</td>
              <td className="p-2">₹{txn.amount}</td>
              <td className="p-2">{txn.status}</td>
              <td className="p-2">{txn.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
