import { useQuery } from 'react-query';
import { FunctionComponent, useEffect, useState } from 'react';
import { getUserCreditors } from '../utils/api';

interface Props {
  selectedUserId: number;
}

const CreditorsTable: FunctionComponent<Props> = ({ selectedUserId }) => {
  // const {
  //   data: credits,
  //   isLoading,
  //   error,
  // } = useQuery(['credits', selectedUserId], () =>
  //   getUserCreditors(selectedUserId)
  // );

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error loading creditors.</div>;
  // }

  const [credits, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await api.get('/users');
        // const data = response.data;
        const data = await getUserCreditors(); // Call the getUsers function
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Amount Owed</th>
        </tr>
      </thead>
      <tbody>
        {credits.map((credit) => (
          <tr key={credit.id}>
            <td>{credit.name}</td>
            <td>{credit.address}</td>
            <td>{credit.email}</td>
            <td>{credit.phone}</td>
            <td>{credit.amountOwned}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CreditorsTable;
