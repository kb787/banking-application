import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faEye,
  faUser,
  faPlus,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons";
import ExecuteTransaction from "./ExecuteTransaction";

const TransactionList = () => {
  const [backendData, setBackendData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("userId");
  const [transAccountId, setTransAccountId] = useState("");
  const accountId = localStorage.getItem("accountId");

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://${process.env.REACT_APP_PUBLIC_IP}:3500/v1/api/get-customer-transaction-user/${userId}`
      );
      const dataArray = Array.isArray(res.data)
        ? res.data
        : Object.values(res.data);
      setBackendData(dataArray);

      const accountIds = dataArray.map((item) => item.account_id);
      if (accountIds.length > 0) {
        setTransAccountId(accountIds[0]);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleTransactionComplete = () => {
    fetchTransactions();
  };

  const handleChangePop = () => () => {
    setShowModal(true);
  };

  return (
    <div className="w-[82%] min-h-screen rounded-xl">
      <div
        className={`h-auto transition-all duration-300 ${
          showModal ? "blur-sm" : ""
        }`}
      >
        <div className="flex rounded-xl justify-center items-center">
          <ExecuteTransaction
            showModal={showModal}
            onClose={() => setShowModal(false)}
            // accountId={transAccountId}
            accountId={accountId}
            onTransactionComplete={handleTransactionComplete}
          />
        </div>
        <div className="flex justify-start gap-[1%] mt-[1%] ml-[2%]">
          <FontAwesomeIcon icon={faUser} size="2x" className="text-black" />
          <p className="text-2xl text-black font-semibold">My Transactions</p>
        </div>
        <div className="flex gap-[1%] justify-end items-center mr-[2%]">
          <FontAwesomeIcon
            icon={faMoneyCheck}
            size="1x"
            className="text-blue-600 pt-1"
          />
          <p
            className="text-base text-blue-600 pt-0.5 cursor-pointer"
            onClick={handleChangePop()}
          >
            Execute transaction
          </p>
        </div>
        {backendData.length > 0 ? (
          <div className="grid grid-cols-3 mt-[3%] mb-[3%] ml-[2%]  gap-[2%] mx-[10%] py-3">
            {backendData.map((item) => (
              <div
                className="border rounded-xl px-3 py-4 text-left bg-slate-100 my-[2%]"
                key={item.transaction_id}
              >
                <div>Transaction Type : {item.type}</div>
                <div>Amount : {item.amount}</div>
                <div>Description : {item.description}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-light text-left ml-[2%]">
            No transaction to display
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
