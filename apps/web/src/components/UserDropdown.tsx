import React, { useState, useContext } from 'react';

import { MyContext } from '../context/AppContext';

const UserDropdown = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [creditorData, setCreditorData] = useState([]);

  const { myState, setMyState } = useContext(MyContext);

  const creditors = myState.hyperCreditors; // Mock creditor data

  const handleUserSelect = (userId) => {
    console.log(myState, 'my stat in the compo');
    const user = myState.usersWithCreditors.find((user) => user.id === userId);
    setSelectedUser(user);
    setCreditorData([]); // Reset creditor data when user is changed
    console.log(user.userCreditors, 'RSDSDSDSDSD');

    setMyState((prevState) => ({
      ...prevState,
      creditors: user.userCreditors,
    }));
  };

  const handleCreditorSelect = (creditorId, amountOwned) => {
    const existingCreditor = creditorData.find(
      (creditor) => creditor.id === creditorId
    );
    if (existingCreditor) {
      // If creditor already exists, update the amount owned
      const updatedCreditor = {
        ...existingCreditor,
        amount_owned: amountOwned,
      };
      setCreditorData((prevCreditorData) =>
        prevCreditorData.map((creditor) =>
          creditor.id === creditorId ? updatedCreditor : creditor
        )
      );
    } else {
      // If creditor doesn't exist, add a new creditor
      const creditor = creditors.find((creditor) => creditor.id === creditorId);
      const newCreditor = { ...creditor, amount_owned: amountOwned };
      setCreditorData((prevCreditorData) => [...prevCreditorData, newCreditor]);
    }
  };

  const handleFormCompletion = () => {
    console.log('Form completed:', creditorData);
    setSelectedUser(null);
    setCreditorData([]);
  };

  return (
    <div>
      <h1>Select User</h1>
      <select
        value={selectedUser?.id || ''}
        onChange={(e) => handleUserSelect(parseInt(e.target.value))}
      >
        <option value="">Select a User</option>
        {myState.usersWithCreditors.map((user) => (
          <option key={user.id} value={user.id}>
            {user.first_name} {user.last_name}
          </option>
        ))}
      </select>

      {selectedUser && (
        <div>
          <h2>Select Creditor</h2>
          <select
            onChange={(e) => handleCreditorSelect(parseInt(e.target.value), 0)}
          >
            <option value="">Select a Creditor</option>
            {myState.hyperCreditors.map((creditor) => (
              <option key={creditor.id} value={creditor.id}>
                {creditor.name}
              </option>
            ))}
          </select>

          <h2>Selected Creditor(s):</h2>
          <table>
            <thead>
              <tr>
                <th>Creditor</th>
                <th>Amount Owned</th>
              </tr>
            </thead>
            <tbody>
              {creditorData.map((creditor) => (
                <tr key={creditor.id}>
                  <td>{creditor.name}</td>
                  <td>
                    <input
                      type="number"
                      value={creditor.amount_owned}
                      onChange={(e) =>
                        handleCreditorSelect(
                          creditor.id,
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleFormCompletion}>Complete Form</button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
