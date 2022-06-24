import React from 'react'

export const Badge = ({ status, text }) => (
        <span className={`drop-shadow-md text-xs rounded-10 py-0.5 px-4 ${status === 'active' ? 'bg-light-green text-white' : 'bg-yellow text-white '}`}>
            {text !== undefined ? text : status === 'active' ? 'Актив' : 'Деактив'}
        </span>
)