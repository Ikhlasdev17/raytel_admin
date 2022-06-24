import React, { useState, useEffect } from "react"
import { Line } from '@ant-design/plots';
import Dropdown from "../../UI/Dropdown";
import {SmallHeading} from "../../UI/SmallHeading";
import { dropdownData } from "../../assets/Data/AnyDatas";

const Chart = () => {

    const [data, setData] = useState([]);
    const [selected, setSelected] = useState('')

    useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            // type: 'timeCat',
            tickCount: 5,
        },
        smooth: true,
    };





    return (
        <div className={'sm:h-96 h-80 relative'}>
                <div className={'flex sm:flex-col mb-4 justify-between items-center'}>
                    <div className={'sm:mb-2 '}>
                    <SmallHeading title={'Рабочий капитал'} />
                    </div>
                    <div className={'flex gap-9'}>
                        <span className={'flex items-center gap-1.5'}>
                            <div className={'w-2 h-2 rounded-full bg-green-clr'}></div>
                            <span className={'text-sm text-dark-txt'}>Доход</span>
                        </span>
                        <span className={'flex items-center gap-1.5'}>
                            <div className={'w-2 h-2 rounded-full bg-yellow-clr'}></div>
                            <span className={'text-sm text-dark-txt'}>Затраты</span>
                        </span>
                        <Dropdown data={dropdownData} selected={selected} setSelected={setSelected} />
                    </div>
                </div>
                <div className={" h-64 pt-2"}>
                    <Line {...config}  />
                </div>
        </div>
    )
}


export default Chart