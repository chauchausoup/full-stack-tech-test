import React, { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';
import { getUsers } from '../utils/api';

interface UserDropdownProps {
  onSelectUser: (userId: number) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onSelectUser }) => {
  // const { data: users, isLoading, isError } = useQuery('users', getUsers);

  // if (isLoading) {
  //   return <div>Loading users...</div>;
  // }

  // if (isError) {
  //   return <div>Error loading users.</div>;
  // }

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await api.get('/users');
        // const data = response.data;
        const data = await getUsers(); // Call the getUsers function
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <label htmlFor="user-select">Select user:</label>
      <select
        id="user-select"
        onChange={(event) => onSelectUser(Number(event.target.value))}
      >
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.first_name} {user.last_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserDropdown;
