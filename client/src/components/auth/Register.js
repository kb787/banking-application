import backgroundImage from "../../images/backgroundImage.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const handleUserRegister = async () => {
    try {
      if (
        !userName ||
        !userEmail ||
        !userPassword ||
        !firstName ||
        !lastName ||
        !phoneNumber
      ) {
        alert("All fields are mandatory");
        return;
      }

      let resObj = await axios.post(
        `http://${process.env.REACT_APP_PUBLIC_IP}:3500/v1/api/register-customer`,
        {
          user_name: userName,
          email: userEmail,
          password: userPassword,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          date_of_birth: dateOfBirth,
          address: address,
        }
      );

      if (resObj.data.success) {
        alert("Registration successful");
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
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center w-[42%] p-8 rounded-xl border border-gray-100 bg-white backdrop-blur-md">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900">
          Customer Registration
        </h2>

        <div className="w-full space-y-6">
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900 text-left mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 text-left mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-900 text-left mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-900 text-left mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-900 text-left mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-900 text-left mb-2"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 text-left mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-900 text-left mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleUserRegister}
            >
              Register
            </button>
          </div>
          <div className="flex justify-center mt-4 gap-2">
            <p className="text-sm font-medium text-gray-900">
              Already have an account?
            </p>
            <p
              className="text-sm font-medium text-blue-700 cursor-pointer"
              onClick={() => navigate("/Login")}
            >
              Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
