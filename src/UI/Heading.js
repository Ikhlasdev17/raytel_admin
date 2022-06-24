import React from "react";
const Heading = ({ title, paragraph }) => {
    return (
        <div className={'w-full flex flex-col gap-0.5 mb-3'}>
            {paragraph ? (
                <>
                <h1 className={`font-semibold text-txt-color text-lg pl-4`}>{title}</h1>
                <p className={'text-gray-txt-color'}>{paragraph}</p>
                </>
                ) : (
                    <h1 className={`font-semibold text-txt-color text-lg`}>{title}</h1>
                )} 
        </div>
    )
}


export default Heading