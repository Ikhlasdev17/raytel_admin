import React, {useEffect, useState} from 'react'

const Dropdown = ({ data, selected, setSelected, width, placeholder = 'Все', search = false }) => {
    const [collapsed, setCollapsed] = useState(true)
    const [str, setStr] = useState('')

    // CLEAR SEARCH STATE
    useEffect(() => {
        setStr('')
    }, [selected])

    // HANDLE COLLAPSE
    window.addEventListener('click', (e) => {
        if (!collapsed) {
            if (e.target.classList[0] !== 'no-collapse') {
                setCollapsed(true)
            }
        }
    })

    // MAIN RENDER
    return (
        <div className={`relative cursor-pointer sm:w-full  ${width !== undefined ? width : 'w-32'} `} >
            <div className={`no-collapse flex justify-between h-8 items-center p-1 px-5 bg-light-gray rounded-5 ${!collapsed && 'border border-primary-color'}`} onClick={() => setCollapsed(false)}>
                {collapsed && !selected && !search && <span>{placeholder}</span>}
                {!collapsed  && !search && !selected && <span>{placeholder}</span>}
                {!collapsed && search ? (
                    <>
                    <input onChange={(e) => setStr(e.target.value)} className={'w-full bg-light-gray outline-0 font-medium text-sm'} autoFocus={true} placeholder={placeholder} type="text"/>
                    </>
                    ) : (
                        <>
                            <span className={'no-collapse text-sm mr-4 font-medium text-gray-txt-color'}>{selected !== null ? data.filter(x => x.value === selected)[0]?.label || selected : <span className={'text-gray-txt-color'}>{placeholder}</span>}</span>
                            <ion-icon className={'text-sm'} style={{fontSize: '12px'}} name="chevron-down-outline"></ion-icon>
                        </>
                )}

            </div>
            <ul onClick={() => setCollapsed(true)}  className={`shadow transition-all duration-500 absolute bg-light-gray rounded-b-5 z-10 w-full border-2 border-light-gray ${collapsed ? 'scale-y-0 origin-top' : 'origin-top scale-y-100'}`}>
                {
                    data && data.length > 0 && data.filter(x => {
                        if (str.length > 0){
                           return x.label.toLowerCase().includes(str.toLowerCase())
                        } else {
                            return x
                        }
                    }).length > 0 ? data.filter(x => {
                        if (str !== ''){
                        return x.label.toLowerCase().includes(str.toLowerCase())
                    } else {
                        return x
                    }
                    }).map((item, index) => (
                            <li  className={`hover:text-primary-color text-sm px-4 py-1 font-medium  ${selected === item.value ? 'text-primary-color' : 'text-gray-txt-color'}`} onClick={() => setSelected(item.value)} key={index}>{item.label}</li>
                        )) : <li className={'text-center text-gray-txt-color text-xs font-medium py-2'}>Пустой</li>
                }
            </ul>
        </div>
    )
}


export default  Dropdown