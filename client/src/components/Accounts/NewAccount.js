import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import customerAccounts from "./../../images/customerAccounts.jpg"; // Adjust the path to your image

const NewAccount = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("");
  const [currencyType, setCurrencyType] = useState("");
  const selectedId = localStorage.getItem("userId");
  const handleCreateNewAccount = async () => {
    try {
      if (!accountType || !currencyType) {
        alert("All fields are mandatory");
        return;
      }
      const accessToken = localStorage.getItem("accessToken");

      let resObj = await axios.post(
        `http://${process.env.REACT_APP_PUBLIC_IP}:3500/v1/api/create-account`,
        {
          user_id:selectedId,
          account_type: accountType,
          currency: currencyType,
        },
        {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
        }
      );

      if (resObj.data.success) {
        alert("Account creation successful");
        localStorage.setItem("accountId", resObj.data.account_id);
        navigate("/Login");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert(`Server side error occurred ${error}`);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-sm brightness-50"
        style={{
          backgroundImage: `url(${customerAccounts})`,
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center w-[42%] p-8 rounded-xl border border-gray-100 bg-white backdrop-blur-md">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create New Account
        </h2>
        <div className="w-full space-y-6">
          {/* Account Type Dropdown */}
          <div className="flex flex-col mt-[0.5%]">
            <label
              htmlFor="accountType"
              className="block text-sm font-medium text-gray-900 text-left mb-2"
            >
              Select Account Type
            </label>
            <select
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
              className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="current">Current</option>
              <option value="savings">Savings</option>
            </select>
          </div>

          {/* Vertical Margin */}
          <div className="my-4"></div>

          {/* Currency Type Dropdown */}
          <div className="flex flex-col mt-[1%]">
            <label
              htmlFor="currencyType"
              className="block text-sm font-medium text-gray-900 text-left mb-2"
            >
              Select Currency Type
            </label>
            <select
              id="currencyType"
              value={currencyType}
              onChange={(e) => setCurrencyType(e.target.value)}
              required
              className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
            </select>
          </div>

          {/* Create Account Button */}
          <div className="mt-6">
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleCreateNewAccount}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAccount;