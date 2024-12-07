import Sidebar from "./Sidebar";
import AccountList from "./AccountList";
const MainCombinedBanker = () => {
  return (
    <div className="w-full min-h-screen p-0 m-0 flex">
      <Sidebar />
      <AccountList />
    </div>
  );
};
export default MainCombinedBanker;
