import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faMoneyCheck,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="w-[18%] min-h-screen bg-violet-950 rounded-xl">
      <div className="flex justify-center gap-[3%] mt-[10%]">
        <FontAwesomeIcon
          icon={faUser}
          size="1.5x"
          className="text-white pt-0.5"
        />
        <p className="text-base font-sans text-white">Users</p>
      </div>
      <div className="flex justify-center gap-[3%] mt-[10%]">
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="1.5x"
          className="text-white pt-1.5"
        />
        <p
          className="text-base font-sans text-white cursor-pointer"
          onClick={handleNavigate}
        >
          Menu
        </p>
      </div>
    </div>
  );
};
export default Sidebar;
