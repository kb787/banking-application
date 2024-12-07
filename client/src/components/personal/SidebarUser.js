import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
const SidebarUser = () => {
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
    </div>
  );
};
export default SidebarUser;
