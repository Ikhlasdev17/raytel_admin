import React, { useCallback } from 'react'
import _debounce from 'lodash/debounce'
const SearchInput = ({ placeholder, width, search, setSearch, debounceTimeOut = 500, prefix, onChange = () => {} }) => {


    const deboundeFnc = useCallback(_debounce((value) => {
        onChange(value)
    }, debounceTimeOut), [])

    const onChangeFunc = (e) => {
        setSearch(e.target.value)
        deboundeFnc(e.target.value)
    }


  return (
    <div className={`h-8 bg-background-color color-light-gray flex  items-center px-2 rounded-5 ${width ? width : 'w-326'} `}>
        {prefix && <span className={`text-gray-txt-color pl-2 my-auto text-sm pt-1 `}>{prefix}</span>}
        <input 
            value={search}
            onChange={onChangeFunc} 
            type="text" 
            id="input" 
            placeholder={placeholder} 
            className="bg-background-color outline-none border-none text-sm placeholder:text-xs pl-2"     
        />
    </div>
  )
}

export default SearchInput