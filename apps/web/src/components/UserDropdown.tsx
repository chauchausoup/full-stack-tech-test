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
    console.log('Form completed:', creditorData, selectedUser);

    setSelectedUser(null);
    setCreditorData([]);
  };

  // {
  // 	"id": 1,
  // 		"creditor": {
  // 		"id": 1,
  // 			"name": "string",
  // 				"address": "string",
  // 					"email": "string@asd.com",
  // 						"phone": "123"
  // 	},
  // 	"amount_owned": 555
  // }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setSelectedUser(null);
    setCreditorData([]);

    try {
      // Send PUT request to update user's creditor information
      const response = await fetch(
        `http://localhost:3333/users/${selectedUser.id}/creditor`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: Date.now(),
            creditor: {
              id: creditorData[0].id,
              name: creditorData[0].name,
              address: creditorData[0].address,
              email: creditorData[0].email,
              phone: creditorData[0].phone,
            },
            amount_owned: creditorData[0].amount_owned,
          }),
        }
      );

      if (response.ok) {
        console.log('User creditor information updated successfully!');
        console.log(response, 'resss');
      } else {
        console.error(
          'Failed to update user creditor information:',
          response.statusText
        );
      }
    } catch (error) {
      console.error('Failed to update user creditor information:', error);
    }
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

          <button onClick={handleFormSubmit}>Complete Form</button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
