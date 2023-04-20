import React from 'react';

const CreditorTable = ({ creditors }) => {
  return (
    <div className="bg-white w-96 h-96 p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Creditor List</h1>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-2 text-left font-medium text-gray-700">
              Creditor Name
            </th>
            <th className="px-4 py-2 text-right font-medium text-gray-700">
              Amount Owned
            </th>
          </tr>
        </thead>
        <tbody>
          {creditors?.map((creditor) => (
            <tr key={creditor.id} className="border-b border-gray-200">
              <td className="px-4 py-2 text-left text-gray-700">
                {creditor.name}
              </td>
              <td className="px-4 py-2 text-right text-gray-700">
                {creditor.amount_owned}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditorTable;
