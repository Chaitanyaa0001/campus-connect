import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Sidebar from './Components/Sidebar/Sidebar';
import Carpool from './Pages/carpool/Carpool';
import LostnFound from './Pages/LostandFound/LostnFound';
import Carental from './Pages/Carental/Carental';
import Discussion from './Pages/Discussion/Discussion';
import Inbox from './Pages/Inbox/Inbox';
import Projects from './Pages/Projects/Projects';
import GetStarted from './Pages/GetStarted/GetStarted';
import User from './Pages/userpage/User';
import ProtectedRoute from './Components/protectedroute/protectedroute';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';





const App = () => {

  const authState = useSelector(state => state.auth);

   useEffect(() => {
    console.log('Auth State on Load:', authState);
  }, [authState]);

  return (

  
    <>
    
    <Routes>
      <Route path='/User' element={ <ProtectedRoute><User/> </ProtectedRoute>}></Route>
      <Route path="/" element={<GetStarted/>} ></Route>   
      <Route path="/signup" element={<Signup/>} ></Route>   
      <Route path="/login" element={<Login/>} ></Route>
      <Route path="/carpool" element={<ProtectedRoute><Carpool/></ProtectedRoute>}></Route>
      <Route path='/lost&found' element={<ProtectedRoute><LostnFound /></ProtectedRoute> } />
      <Route path='/carental' element={<ProtectedRoute><Carental/></ProtectedRoute>} />
      <Route path='/discussion' element={ <ProtectedRoute>< Discussion/></ProtectedRoute>} />
      <Route path='/projects' element={ <ProtectedRoute>< Projects/></ProtectedRoute>} />
      <Route path='/inbox' element={ <ProtectedRoute><Inbox /></ProtectedRoute>} />
    </Routes>
    </>

  )
}

export default App