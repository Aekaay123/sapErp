import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
const Main = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1 ml-64 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
