import React, {useState} from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
    // states
    const [collapsed, setCollapsed] = useState(false)


    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={collapsed} setSidebarOpen={setCollapsed} />
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-background-color">
                <div className={"m-w-full lg:p-7 md:p-5 p-4"}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard