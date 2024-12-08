import Popup from "reactjs-popup";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

const ExecuteTransaction = ({
  showModal,
  onClose,
  accountId,
  onTransactionComplete,
}) => {
  const selectedId = localStorage.getItem("accountId");
  const modalRef = useRef(null);
  const [backendData, setBackendData] = useState([]);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");

  const fetchAccountDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3500/v1/api/get-account-details/${accountId}`
      );
      setBackendData(res.data.data.balance);
    } catch (err) {
      console.error("Error fetching transaction details:", err);
    }
  };

  useEffect(() => {
    if (showModal && accountId) {
      fetchAccountDetails();
    }
  }, [showModal, accountId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showModal, onClose]);

  const handleExecuteTransfer = async () => {
    try {
      if (!transactionAmount || !transactionType || !transactionDescription) {
        alert("Entering all fields is mandatory");
        return;
      }

      const resObj = await axios.post(
        `http://localhost:3500/v1/api/execute-transaction`,
        {
          account_id: accountId,
          // amount: transactionAmount,
          amount: parseFloat(transactionAmount),
          type: transactionType,
          description: transactionDescription,
        }
      );

      if (resObj.data.success) {
        alert("Transaction successful");
        await fetchAccountDetails();
        setTransactionAmount("");
        setTransactionType("");
        setTransactionDescription("");
        onTransactionComplete();
        onClose();
      } else {
        alert("Insufficient Funds");
      }
    } catch (error) {
      alert(`Server side error occurred ${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Popup
        open={showModal}
        modal
        nested
        closeOnDocumentClick={true}
        onClose={onClose}
        contentStyle={{
          width: "100%",
          maxWidth: "none",
          height: "100%",
          padding: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          ref={modalRef}
          className="bg-white rounded-xl border-2 border-gray-300 w-[500px] max-w-[90%] max-h-[80%] overflow-auto p-6"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Execute Transaction
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div>
                <div className="flex gap-[2%]">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 text-left"
                  >
                    Available Balance :
                  </label>
                  <label className="block text-sm font-medium text-gray-900 text-left">
                    {backendData}
                  </label>
                </div>
                <div className="mt-[4%]">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 text-left"
                  >
                    Enter transaction Amount
                  </label>
                  <div>
                    <input
                      type="number"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                      required
                      className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-[4%]">
                <select
                  name="transactionType"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  id="transaction-type"
                  required
                  className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                >
                  <option value="">Select Transaction Type</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdraw</option>
                </select>
              </div>
              <div className="mt-[4%]">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 text-left"
                >
                  Description
                </label>
                <div>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={transactionDescription}
                    onChange={(e) => setTransactionDescription(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 mt-[5%] text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleExecuteTransfer}
                >
                  Execute Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default ExecuteTransaction;
