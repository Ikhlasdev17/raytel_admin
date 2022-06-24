import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
 
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products"; 
import Login from "./pages/Login";



function App() { 
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />}>  
            <Route path={'/'} element={<Categories />} />
            <Route path={'products'} element={<Products />}/> 
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Sahifa topilmadi</h1>} />
        </Routes>
    </div>
  );
}

export default App;
