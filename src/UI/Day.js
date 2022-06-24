import React from 'react'

const Day = ({ day }) => {
    return (
        <span className={'w-8 h-8 flex items-center justify-center bg-light-blue text-primary-color text-sm rounded-5 font-medium'}>
            {day}
        </span>
    )
}

export default Day