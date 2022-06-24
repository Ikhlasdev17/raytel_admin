import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css'
import { createRoot } from 'react-dom/client';

 
const container  = document.getElementById('root');
const root = createRoot(container)
root.render(
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
)


 