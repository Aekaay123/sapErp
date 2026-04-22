import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
const Main = () => {
  return (
    <div className="flex h-full">
      <SideBar />
      <main className="flex-1 ml-64 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
