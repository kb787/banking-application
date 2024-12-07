import SidebarUser from "./SidebarUser";
import TransactionList from "./TransactionList";

const MainProfile = () => {
  return (
    <div className="w-full min-h-screen p-0 m-0 flex">
      <SidebarUser />
      <TransactionList />
    </div>
  );
};
export default MainProfile;
