import UserDropdown from '../components/UserDropdown';
import CreditorsTable from '../components/CreditorsTable';

import CreateUserForm from '../components/CreateUserForm';
import CreateCreditorForm from '../components/CreateCreditorForm';

export default function Home() {
  const creditors = [
    { id: 1, name: 'Creditor 1', amount_owned: '$100' },
    { id: 2, name: 'Creditor 2', amount_owned: '$200' },
    { id: 3, name: 'Creditor 3', amount_owned: '$300' },
  ];

  return (
    <>
      <div className="flex">
        <CreateUserForm />
        <CreateCreditorForm />
        <UserDropdown />
      </div>
      <CreditorsTable creditors={creditors} />
    </>
  );
}
