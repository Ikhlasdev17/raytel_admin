import React from 'react'
import {Link} from "react-router-dom";

import avatar from '../../assets/images/Avater (1).svg'

const DailyEarning = ({ data = [] }) => {
    return (
        <div className={"overflow-y-auto "}>
            <div className={'flex justify-between items-center'}>
                <div className={'font-semibold'}>Ежедневный заработок</div>
                <span className={'text-sm flex items-center'}>
                    <Link to={'/'}>
                        <span className={'text-green-clr mr-2'}>Все</span>
                        <svg className={'inline-block'} width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.388427 1.5575L3.82343 5L0.388428 8.4425L1.44593 9.5L5.94593 5L1.44593 0.5L0.388427 1.5575Z" fill="#29A073"/>
                        </svg>
                    </Link>
                </span>
            </div>
            {/*   USERS   */}
            <ul className={'mt-6 overflow-y-auto border-t-2 border-light-gray pt-2'} style={{height: '655px'}}>
                {/*  USER ITEM  */}
                {
                    data.map((item, index) => (
                        <li key={index} className={'flex items-center justify-between mb-4'}>
                            <div className={'flex items-center justify-between gap-x-3'}>
                                <img className={'rounded-full object-cover'} width={33} height={33} src={item.avatar} alt="avatar"/>
                                <div>
                                    <h3 className={'text-sm font-semibold'}>{item.name}</h3>
                                    <p className={'text-xs text-gray-txt-color'}>{item.date}</p>
                                </div>
                            </div>
                            <span>
                                {item.price}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default DailyEarning

