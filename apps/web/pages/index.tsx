import UserDropdown from '../src/components/UserDropdown';
import CreditorsTable from '../src/components/CreditorsTable';

import CreateUserForm from '../src/components/CreateUserForm';
import CreateCreditorForm from '../src/components/CreateCreditorForm';

import { MyContextProvider } from '../src/context/AppContext';

export default function Home() {
  return (
    <MyContextProvider>
      <div className="flex">
        <CreateUserForm />
        <CreateCreditorForm />
        <UserDropdown />
      </div>
      <CreditorsTable />
    </MyContextProvider>
  );
}
