// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { UserSelectionPage, MemberPage, MemberSelectionPage } from "./components/additional_pages"
import AdminPage from './components/AdminPage';

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from 'react-toastify'




const types = {
  notLoggedIn : 0,
  admin : 1,
  member : 2
}

function App() {
  const [user,setUser] = useState({type:types.notLoggedIn, id:0});

  
  return (

  
    <Router>
      <ToastContainer autoClose={2500} hideProgressBar={true}/>
      <div className='h-screen'>
      <Routes>
          
        <Route path='/member/*' element={<MemberPage/>}/>  

        <Route path="/" element={<Navigate to="/login"/>}/>

        <Route path="/login" element={<UserSelectionPage/>}/>
        
        <Route path="/login/member" element={<MemberSelectionPage/>}/>
        
        <Route path="/admin" element={<AdminPage/>}/>
        
        
        
          
      </Routes>
      </div>
    </Router>
  );
}

export default App;
