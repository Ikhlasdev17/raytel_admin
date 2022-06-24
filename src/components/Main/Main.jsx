import React from "react";
import Heading from "../../UI/Heading";
import {Router, Routes, Route} from "react-router-dom";
import Home from "../../pages/Home/Home";
import TodaysOrders from "../../pages/TodaysOrders/TodaysOrders";
import Categories from "../../pages/Categories/Categories";
import Products from "../../pages/Products/Products";

const Main = () => {
    return (
        <div className={"m-w-full lg:p-7 md:p-5 p-4"}>
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/today__orders'} element={<TodaysOrders />} />
                    <Route path={'/categories'} element={<Categories />
                } />
                    <Route path={'/products'} element={<Products />} />
                </Routes>
        </div>
    )
}

export default Main