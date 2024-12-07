import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faEye,
  faUser,
  faPlus,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons";

const TransactionList = () => {
  const [backendData, setBackendData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleStoreId = (accountId) => () => {
    localStorage.setItem("accountId", accountId);
    setShowModal(true);
    console.log(`Clicked id is ${accountId}`);
  };

  useEffect(() => {
    const handleFetchAllAccounts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/v1/api/get-customer-transaction-user/1`
        );
        const dataArray = Array.isArray(res.data)
          ? res.data
          : Object.values(res.data);
        setBackendData(dataArray);
        console.log(dataArray);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };

    handleFetchAllAccounts();
  }, []);

  return (
    <div className="w-[82%] min-h-screen rounded-xl">
      {/* <div
        className={`h-auto transition-all duration-300 ${
          showModal ? "blur-sm" : ""
        }`}
      > */}
      {/* <div className="flex rounded-xl justify-center items-center">
          <UserTransaction
            showModal={showModal}
            onClose={() => setShowModal(false)}
          />
        </div> */}
      <div className="flex justify-start gap-[1%] mt-[1%] ml-[2%]">
        <FontAwesomeIcon icon={faUser} size="2x" className="text-black" />
        <p className="text-2xl text-black font-semibold">My Transactions</p>
      </div>
      {backendData.length > 0 ? (
        <div className="grid grid-cols-3 mt-[3%] ml-[2%] gap-[2%]">
          {backendData.map((item) => (
            <div
              className="border rounded-xl px-3 py-4 text-left bg-slate-100"
              key={item.transaction_id}
            >
              <div>Transaction Type : {item.type}</div>
              <div>Amount : {item.amount}</div>
              <div>Description : {item.description}</div>
              <div className="flex gap-[1%] mt-[3%] justify-center items-center">
                <FontAwesomeIcon
                  icon={faMoneyCheck}
                  size="1x"
                  className="text-blue-600 pt-1"
                />
                <p
                  className="text-base text-blue-600 pt-0.5 cursor-pointer"
                  //   onClick={handleStoreId(item.account_id)}
                >
                  Execute transaction
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm font-light text-left ml-[2%]">
          No customer to display
        </p>
      )}
      {/* </div> */}
    </div>
  );
};

export default TransactionList;
