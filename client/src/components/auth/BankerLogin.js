import backImage from "../../images/backImage.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const BankerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authData = {
    email: email,
    password: password,
  };
  const handleBankerLogin = async () => {
    try {
      if (!email || !password) {
        alert("Entering all fields is mandatory");
      } else {
        let resObj = await axios.post(
          `http://localhost:3500/v1/api/login-banker`,
          {
            email: email,
            password: password,
          }
        );
        if (resObj.data.success) {
          alert("Login successfull");
          navigate("/BankerDashboard");
        } else {
          alert("Invalid credentials");
        }
      }
    } catch (error) {
      alert(`Server side error occured ${error}`);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-sm brightness-50"
        style={{
          backgroundImage: `url(${backImage})`,
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center w-[32%] h-[65%] p-5 rounded-xl border border-gray-100 bg-white backdrop-blur-md">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Banker Login
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 text-left"
              >
                Enter email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="mt-[5%]">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                type="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 mt-[5%] text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleBankerLogin}
            >
              Login
            </button>
          </div>
          <div className="flex mt-3 gap-2">
            <p className="text-sm font-medium text-gray-900">Not a banker?</p>
            <p
              className="text-sm font-medium text-blue-700 cursor-pointer"
              onClick={() => navigate("/Login")}
            >
              Login as Customer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankerLogin;
