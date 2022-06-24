import React from "react";

const TotalCard = ({ data = [{}] }) => {
    return (
        <div className={'flex gap-4 lg:flex-row flex-col'}>
            {
                data.map((item, index) => (
                    <div key={index} className={`flex gap-4 items-center p-5 rounded-10 w-full  lg:w-280 h-24 ${item.mode === 'dark' ? 'bg-darkish' : ' bg-white '}`}>
                        <div className={`w-9 h-9 flex font-light items-center bg-overlay-light justify-center rounded-full ${item.mode === 'dark' ? 'bg-overlay-dark' : 'bg-overlay-light'}`}>
                            {item.icon(item.mode === 'dark' ? '#C8EE44' : '#363A3F')}
                        </div>
                        <div>
                            <p className={`text-sm mb-1 ${item.mode === "dark" ? 'text-white' : 'text-gray-txt-color'}`}>{item.title}</p>
                            <h2 className={`lg:text-xl text-xl font-semibold ${item.mode === "dark" ? 'text-white' : 'text-txt-color'}`}>{item.price}</h2>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TotalCard