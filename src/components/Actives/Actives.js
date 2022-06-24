import React, {useState} from 'react'
import {SmallHeading} from "../../UI/SmallHeading";
import Dropdown from "../../UI/Dropdown";

import { dropdownData, activeDeActive } from "../../assets/Data/AnyDatas";
import {Badge} from "../../UI/Badge";

const Actives = () => {
    const [selected, setSelected] = useState('')
    return (
        <div className={'overflow-y-hidden'} style={{height: '350px'}}>
            <div className={'flex items-center justify-between'}>
                <SmallHeading title={'Активисты'}/>
                <Dropdown data={dropdownData} selected={selected} setSelected={setSelected}   />
            </div>
            <ul className={'mt-4 overflow-y-auto'} style={{height: '300px'}}>
                {activeDeActive.map((item,index) => (
                    <li key={index} className={'flex items-center justify-between py-2'}>
                        <div className={'flex items-center gap-x-3'}>
                            {item.avatar}
                            <div className={'flex flex-col'}>
                                <span className={'text-sm font-semibold'}> {item.name}</span>
                                <span className={'text-gray-txt-color text-xs'}>{item.role}</span>
                            </div>
                        </div>
                        <div className={'flex flex-col items-end justify-end'}>
                            <Badge status={item.status} />
                            <span className={'font-light text-sm text-gray-txt-color'}> {item.ball}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Actives