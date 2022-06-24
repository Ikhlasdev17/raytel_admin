import { Spin } from 'antd';
import React from 'react';


const Button = ({ text, startedIcon, width, onClick = () => {}, mode, loading = false, disabled = false }) => {

    const icon = startedIcon && startedIcon === 'plus' ? (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3.3335" width="1.33333" height="8" fill="white"/>
    <rect y="4.6665" width="1.33333" height="8" transform="rotate(-90 0 4.6665)" fill="white"/>
    </svg> ) : (
        {startedIcon}
    ) 
    
    return (
            <Spin spinning={loading}>
                <button 
                disabled={disabled}

                onClick={() => onClick()}
                className={`
                font-semibold
                bg-primary-color
                text-white flex 
                items-center gap-2 
                rounded-5 py-2 
                opacity-90
                hover:opacity-100
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${mode !== 'icon' ? 'px-5 text-sm' : 'p-1.5 py-1.5 text-lg'} active:bg-opacity-60  w-auto whitespace-nowrap transition-all duration-300 hover:shadow-md hover:bg-blend-darken-2 ${width && width}`}>
                {startedIcon && icon}
                {text}
            </button>
            </Spin>
    )
}

export default Button