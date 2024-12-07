import Popup from "reactjs-popup";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

const UserTransaction = ({ showModal, onClose }) => {
  const selectedId = localStorage.getItem("accountId");
  const modalRef = useRef(null);
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    const handleFetchTransactionDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3500/v1/api/get-customer-transaction/${selectedId}`
        );
        const dataArray = Array.isArray(res.data)
          ? res.data
          : Object.values(res.data);
        setBackendData(dataArray);
        console.log(dataArray);
      } catch (err) {
        console.error("Error fetching transaction details:", err);
      }
    };

    if (showModal && selectedId) {
      handleFetchTransactionDetails();
    }
  }, [showModal, selectedId]);

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
          {backendData.length > 0 ? (
            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Transaction Details
              </h2>
              <div className="space-y-3 w-full">
                {backendData.map((item) => (
                  <div
                    className="flex flex-col border rounded-xl text-left px-4 py-3 bg-gray-50"
                    key={item.transaction_id}
                  >
                    <div className="mb-1">
                      <span className="font-medium">Transaction Type:</span>{" "}
                      {item.type}
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">Amount:</span> {item.amount}
                    </div>
                    <div>
                      <span className="font-medium">Description:</span>{" "}
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-base text-center text-gray-500">
              No transactions to display
            </p>
          )}
        </div>
      </Popup>
    </div>
  );
};

export default UserTransaction;
