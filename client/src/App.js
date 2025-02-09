import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BankerLogin from "./components/auth/BankerLogin";
import MainCombinedBanker from "./components/banker/MainCombined";
import MainProfile from "./components/personal/MainProfile";
import NewAccount from "./components/Accounts/NewAccount";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/BankerLogin" element={<BankerLogin />} />
          <Route path="/BankerDashboard" element={<MainCombinedBanker />} />
          <Route path="/UserDashboard" element={<MainProfile />} />
          <Route path="/NewAccount" element={<NewAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
