import React, {useState} from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './Pagination' 

const Table = ({ 
    columns = [],
    responsiveModalContent, 
    responsiveCardContent, 
    dataSource = [],  
    responsiveCardTitle,
    paginateBool,
    pageSize,
    currentPage,
    setCurrentPage,
    filterByCategory,
    search
}) => {
    const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false)
    const paginated = paginateBool ? paginate(dataSource, currentPage, pageSize) : dataSource 
    return (<div className={'w-full '}>
        {/* TABLE FOR LARGE SCREEN */}
        <table className={'w-full sm:hidden'}>
            {/*  HEADING  */}
            <thead className={'w-full '}>
                <tr className={' w-full m-5'}>
                    {columns?.map((item, index) => (
                        <th className={`${index === 0 ? 'font-medium text-table-dark ' : 'font-light text-table-gray'} px-2  border-table-border border-b  text-lg py-4 text-left`} key={index}>{item?.label}</th>
                    ))}
                </tr>
            </thead>

            {/*  BODY  */}
            <tbody>
                {dataSource?.filter(x => {
                    if (filterByCategory !== ""){
                        return x.category_id === filterByCategory
                    }  

                    if (search !== ""){
                        return x.product_name.toLowerCase().includes(search.toLowerCase())
                    }

                    return x

                })?.map((item, index) => {
                   let string = item.data
                    return (<TableRow key={index} item={item} columns={columns} />)
                }) || <tr><td>No data</td></tr>}
            </tbody>
        </table>
 
         {/*TABLE FOR MOBILE DEVICES */}
        <div className={'hidden  flex-col gap-4 sm:flex  py-4'}>
            {/*  CARD  */}
            {dataSource.map((item, index) => (
                <div key={index} className={'rounded-5 shadow'} onClick={() => setModalWindowIsOpen(true)}>
                    {responsiveCardContent ? responsiveCardContent(item) : 'null'}
                </div>
            ))}
        </div>

        {/* RESPONSIVE MODAL WINDOW  */}
        {modalWindowIsOpen && (
            <ResponsiveModalWindow onClose={() => setModalWindowIsOpen(false)} responsiveCardTitle={responsiveCardTitle} content={responsiveModalContent} />
        )}

        {paginateBool && (
            <>
                <br />
                <Pagination items={[]} pageSize={15} currentPage={currentPage} onPageChange={setCurrentPage} />
            </>
        )}
    </div>)
}

const TableRow = ({ item, columns }) => (
    <tr className={'w-full hover:bg-light-gray'}>
        {
            columns.map((columnItem, index) => {
                return <td className={'px-2 py-4 border-b border-table-border'} key={index}>{item[`${columnItem.data}`]}</td>
            })
        }
    </tr>
)

const ResponsiveModalWindow = ({ content, responsiveCardTitle, onClose  }) => {
    return (
        <div className={'flex items-center justify-center fixed w-full h-screen bg-overlay-dark bg-opacity-50 backdrop-blur-sm top-0 left-0'} style={{width: '100%'}}>
            {/*/!*  CONTENT */}
            <div className={'w-70% bg-white py-3 px-4'} style={{width: '90%', minHeight: '500px', maxHeight: '500px'}}>
                {/* CARD HEADER */}
                <div className={'w-full flex items-center justify-between pb-2 mb-2 border-b border-table-border'}>
                    <h2 className={'text-medium text-table-dark'}>
                        {responsiveCardTitle}
                        CARD TITLE
                    </h2>
                    <span className={'cursor-pointer w-10 h-10 flex items-center justify-center'} onClick={()=>onClose()} >
                    <ion-icon style={{fontSize: '24px'}} className={'text-xl'} name="close-outline"></ion-icon>
                </span>
                </div>
                {/* CARD BODY */}
                {/*{content()}*/}
                <h1>Salom</h1>
            </div>
        </div>
    )
}




export default Table