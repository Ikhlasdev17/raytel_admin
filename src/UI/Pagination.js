import React from 'react'
import _ from 'lodash'

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(items.length / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

  return (
    <div className='w-full flex items-center justify-center'>
        <ul className='h-10 flex gap-0.5'>
        {pages.map(page => (
            <li 
                key={page} 
                onClick={() => onPageChange(page)}
                className={`h-10 w-10  rounded-full  flex items-center justify-center border border-table-border cursor-pointer hover:bg-background-color transition-all duration-300 ${ currentPage === page ? 'bg-primary-color text-white' : 'bg-white text-primary-color' }`}>
                {page}
            </li>
        ))}

    </ul>
    </div>
  )
}

export default Pagination