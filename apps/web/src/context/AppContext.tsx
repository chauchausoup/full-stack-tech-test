import React, { useState, useEffect } from 'react';
import { getCreditors, getUsersWithCreditors } from '../utils/api';

// Define the type for your state

// Define the type for usersWithCreditors array
type UserWithCreditor = {
  // Define the properties for UserWithCreditor
};

// Define the type for creditor object
type Creditor = {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
};

// Define the type for your state
type MyState = {
  usersWithCreditors: UserWithCreditor[];
  creditors: {
    id: number;
    creditor: Creditor;
    amount_owned: number;
  }[];
  hyperCreditors: Creditor[];
};

// Define the type for your context
type MyContextType = {
  myState: MyState;
  setMyState: React.Dispatch<React.SetStateAction<MyState>>;
};

// Create a new context
export const MyContext = React.createContext<MyContextType>({
  myState: { usersWithCreditors: [], creditors: [], hyperCreditors: [] },
  setMyState: (newState) => newState,
});

// Provider component
export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Define the state and its setter function
  const [myState, setMyState] = useState<MyState>({
    usersWithCreditors: [],
    creditors: [],
    hyperCreditors: [],
  });

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersWithCreditors = await getUsersWithCreditors();
        const creditors = await getCreditors();

        console.log(usersWithCreditors, creditors, '121212');
        setMyState((prevState) => ({
          ...prevState,
          usersWithCreditors: usersWithCreditors,
        }));

        setMyState((prevState) => ({
          ...prevState,
          hyperCreditors: creditors,
        }));

        // Update the context state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Return the context provider with the state and its setter as value
  return (
    <MyContext.Provider value={{ myState, setMyState }}>
      {children}
    </MyContext.Provider>
  );
};
