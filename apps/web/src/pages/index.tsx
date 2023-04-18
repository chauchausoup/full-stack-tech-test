import { useState } from 'react';
import useSWR from 'swr';

import UserDropdown from '../components/UserDropdown';
import CreditorsTable from '../components/CreditorsTable';
// import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

import { getUsers } from '../utils/api';
import CreateUserForm from '../components/CreateUserForm';

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, error } = useSWR(
    selectedUser ? `/users/${selectedUser.id}/creditors` : null,
    getUsers
  );

  const handleUserSelected = (user) => {
    setSelectedUser(user);
  };

  if (error) {
    return <ErrorDisplay message="Failed to load data" />;
  }

  // if (!data) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div>
      <CreateUserForm />
      <UserDropdown onUserSelected={handleUserSelected} />
      {<CreditorsTable creditors={data} />}
    </div>
  );
}
