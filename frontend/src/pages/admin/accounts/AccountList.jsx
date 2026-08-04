import { useEffect, useState } from "react";

import AccountHeader from "./components/AccountHeader";
import AccountStats from "./components/AccountStats";
import AccountFilters from "./components/AccountFilters";
import AccountTable from "./components/AccountTable";

import { getAccounts } from "../../../services/admin/accountService";

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (error) {
      console.error("Failed to load accounts:", error);
    }
  };

  return (
    <>
      <AccountHeader />

      <AccountStats />

      <AccountFilters />

      <AccountTable accounts={accounts} />
    </>
  );
}