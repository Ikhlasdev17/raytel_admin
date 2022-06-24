import React, {Fragment} from "react";

import {sidebarMenus} from "../../assets/Data/sidebarMenus";
import {Link} from "react-router-dom";
import { useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const activeClass = 'bg-primary-color text-white'
    const path = useLocation()
    const currentPath = path.pathname

    window.addEventListener('click', (e) => {
        if (e.target.classList[0] === 'flex'){
            setSidebarOpen(false)
        }
    })

    return (
        <>
            {/* responsive toggle btn */}
            <div
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={'z-10 hidden md:flex fixed left-0 sm:flex w-10 h-10 items-center justify-center bg-darkish text-white text-xl rounded-tr-5 rounded-br-5 top-52 border-2 border-background-color'}>
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div className={` shadow flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-72 lg:w-72 md:sidebar-expanded:!w-72 2xl:!w-72 shrink-0 bg-white p-3 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-80'}`}>
                <div className={'w-full flex items-center justify-center py-2'}>
                    <img className={'w-12 mr-2'} src={logo} alt=""/>
                    <h1 className="text-2xl"><span className="text-primary-color">Ray</span>tel</h1>
                </div>
                {sidebarMenus.map((item, index) => (
                    <Fragment key={index}>
                        {item.title ? (
                            <span key={index} className={'pl-5 font-light text-sm mb-4 mt-8' }>{item.title}</span>
                        ): null}
                        <li className={'list-none mb-2 w-full'} key={item.path} onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Link to={item.path} className={"w-full"}>
                                <div className={`w-full flex items-center gap-4 px-5 py-3 text-sm rounded-lg block transition duration-500 ease-in-out  ${item.path === currentPath ? activeClass : 'text-gray-txt-color hover:text-primary-color'}`}>
                                    <i>
                                        {item.icon(item.path === currentPath ? '#fff' : '#8C8C8C')}
                                    </i>
                                    {item.label}
                                </div>
                            </Link>

                        </li>
                    </Fragment>
                ))}
            </div>
        </>

    )
}

export default Sidebar