const mockDataUsers = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    creditors: [],
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    creditors: [],
  },
  {
    id: 3,
    first_name: 'Mike',
    last_name: 'Johnson',
    email: 'mike.johnson@example.com',
    creditors: [],
  },
];

const mockDataCreditors = [
  {
    id: 1,
    name: 'Creditor 1',
    email: 'creditor1@example.com',
    phone: '123-456-7890',
  },
  {
    id: 2,
    name: 'Creditor 2',
    email: 'creditor2@example.com',
    phone: '987-654-3210',
  },
  {
    id: 3,
    name: 'Creditor 3',
    email: 'creditor3@example.com',
    phone: '555-123-4567',
  },
];

const mockData = { mockDataUsers, mockDataCreditors };

export default mockData;
