import backgroundImage from "../../images/backgroundImage.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const handleUserLogin = async () => {
    try {
      if (!userName || !userPassword) {
        alert("Entering all fields is mandatory");
      } else {
        let resObj = await axios.post(
          `http://${process.env.REACT_APP_PUBLIC_IP}:3500/v1/api/login-customer`,
          {
            user_name: userName,
            password: userPassword,
          }
        );
        if (resObj.data.success) {
          alert("Login successfull");
          localStorage.setItem("userId", resObj.data.user_id);
          localStorage.setItem("accessToken", resObj.data.data);
          console.log(resObj.data.data);
          navigate("/UserDashboard");
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
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center w-[32%] h-[65%] p-5 rounded-xl border border-gray-100 bg-white backdrop-blur-md">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Customer Login
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <form className="space-y-6" action="#" method="POST"> */}
          <div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 text-left"
              >
                Enter your username
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="mt-[5%]">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-[5%]">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleUserLogin}
            >
              Login
            </button>
          </div>
          <div className="flex mt-3 gap-2">
            <p className="text-sm font-medium text-gray-900">
              Not having an account?
            </p>
            <p
              className="text-sm font-medium text-blue-700 cursor-pointer"
              onClick={() => navigate("/Register")}
            >
              Register
            </p>
          </div>
          <p
            className="mt-2 text-left text-sm font-medium text-blue-700 cursor-pointer"
            onClick={() => navigate("/BankerLogin")}
          >
            Login as Banker
          </p>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
