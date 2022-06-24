import React, {useEffect, useState} from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";


const Dashboard = () => {
    // states
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`https://raytel.uz/api/products`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log('')
        })
        .catch(() => navigate("/login", { replace: true }))
    }, [])

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