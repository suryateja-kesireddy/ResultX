import { useEffect, useState } from "react";

import AccountHeader from "./components/AccountHeader";
import AccountStats from "./components/AccountStats";
import AccountFilters from "./components/AccountFilters";
import AccountTable from "./components/AccountTable";

import { getAccounts } from "../../../services/admin/accountService";

import ViewAccountModal from "./components/modals/ViewAccountModal";
import { getAccountById } from "../../../services/admin/accountService";
import EditAccountModal from "./components/modals/EditAccountModal";
import DeleteAccountModal from "./components/modals/DeleteAccountModal";

export default function AccountList() {

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAccount, setEditAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAccountData, setDeleteAccountData] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    role: "",
    department: "",
    status: "",
  });

  const handleView = async (id) => {
    console.log("Clicked Account ID:", id);

    try {
      const account = await getAccountById(id);

      console.log("Account Data:", account);

      setSelectedAccount(account);
      setShowViewModal(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = async (id) => {
    try {
      const account = await getAccountById(id);

      setEditAccount(account);
      setShowEditModal(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
  try {
    const account = await getAccountById(id);

    setDeleteAccountData(account);
    setShowDeleteModal(true);

  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    loadAccounts();
  }, [filters]);

  const loadAccounts = async () => {
    try {
      const data = await getAccounts(filters);
      setAccounts(data);
    } catch (error) {
      console.error("Failed to load accounts:", error);
    }
  };

  return (
    <>
      <AccountHeader />

      <AccountStats />

      <AccountFilters
        filters={filters}
        setFilters={setFilters}
      />

      <AccountTable
        accounts={accounts}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        
      />
      {showViewModal && (
        <ViewAccountModal
          account={selectedAccount}
          onClose={() => {
            setShowViewModal(false);
            setSelectedAccount(null);
          }}
          
        />
      )}
      {showEditModal && (
  <EditAccountModal
    account={editAccount}
    onClose={() => {
      setShowEditModal(false);
      setEditAccount(null);
    }}
    onSuccess={() => {
      loadAccounts();              // Refresh table
      setShowEditModal(false);     // Close modal
      setEditAccount(null);        // Clear selected account
    }}
  />
)}
{showDeleteModal && (
  <DeleteAccountModal
    account={deleteAccountData}
    onClose={() => {
      setShowDeleteModal(false);
      setDeleteAccountData(null);
    }}
    onSuccess={() => {
      loadAccounts();
      setShowDeleteModal(false);
      setDeleteAccountData(null);
    }}
  />
)}

    </>
    
  );
}