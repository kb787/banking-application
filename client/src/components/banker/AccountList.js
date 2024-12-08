import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faEye } from "@fortawesome/free-solid-svg-icons";
import UserTransaction from "./UserTransaction";

const AccountList = () => {
  const [backendData, setBackendData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const handleFetchAllAccounts = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/v1/api/get-all-accounts"
      );

      const dataArray = Array.isArray(res.data)
        ? res.data
        : res.data && typeof res.data === "object"
        ? Object.values(res.data)
        : [];

      const validAccounts = dataArray.filter(
        (item) => item && item.account_id && item.account_number
      );

      setBackendData(validAccounts);
      console.log("Fetched Accounts:", validAccounts);
    } catch (err) {
      console.error("Error fetching accounts:", err);

      setBackendData([]);
    }
  }, []);

  useEffect(() => {
    handleFetchAllAccounts();
  }, [handleFetchAllAccounts]);

  const handleStoreId = (accountId) => () => {
    localStorage.setItem("accountId", accountId);
    setSelectedAccountId(accountId);
    setShowModal(true);
  };

  const handleTransactionDeletion = () => {
    handleFetchAllAccounts();
  };

  return (
    <div className="w-[82%] min-h-screen rounded-xl">
      <div
        className={`h-auto transition-all duration-300 ${
          showModal ? "blur-sm" : ""
        }`}
      >
        <div className="flex rounded-xl justify-center items-center">
          <UserTransaction
            showModal={showModal}
            onClose={() => setShowModal(false)}
            accountId={selectedAccountId}
            onTransactionDeletion={handleTransactionDeletion} // Pass refresh method
          />
        </div>

        <div className="flex justify-start gap-[1%] mt-[1%] ml-[2%]">
          <FontAwesomeIcon icon={faBook} size="2x" className="text-black" />
          <p className="text-2xl text-black font-semibold">Customer Accounts</p>
        </div>

        {backendData.length > 0 ? (
          <div className="grid grid-cols-3 mt-[3%] ml-[2%] gap-[2%] mx-[10%]">
            {backendData.map((item) => (
              <div
                className="border rounded-xl px-3 py-4 text-left bg-slate-100"
                key={item.account_id}
              >
                <div>Account Number : {item.account_number}</div>
                <div>Account Type : {item.account_type}</div>
                <div>Balance : {item.balance}</div>
                <div>Currency : {item.currency}</div>
                <div>Status : {item.status}</div>
                <div className="flex gap-[1%] mt-[3%] justify-center items-center">
                  <FontAwesomeIcon
                    icon={faEye}
                    size="1x"
                    className="text-blue-600 pt-1"
                  />
                  <p
                    className="text-base text-blue-600 pt-0.5 cursor-pointer"
                    onClick={handleStoreId(item.account_id)}
                  >
                    View Transaction
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-light text-left ml-[2%]">
            No accounts to display
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountList;
