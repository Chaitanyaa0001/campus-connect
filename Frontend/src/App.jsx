import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import Sidebar from './Components/Sidebar/Sidebar';
import Carpool from './Pages/carpool/Carpool';
import LostnFound from './Pages/LostandFound/LostnFound';
import Carental from './Pages/Carental/Carental';
import Discussion from './Pages/Discussion/Discussion';
import Inbox from './Pages/Inbox/Inbox';
import Projects from './Pages/Projects/Projects';
import GetStarted from './Pages/GetStarted/GetStarted';
import User from './Pages/userpage/User';





const App = () => {
  return (
    <>
    
    <Routes>
      <Route path='/User' element={<User/>}></Route>
      <Route path="/" element={<GetStarted/>} ></Route>   
      <Route path="/signup" element={<Signup/>} ></Route>   
      <Route path="/login" element={<Login/>} ></Route>
      <Route path="/carpool" element={<Carpool/>}></Route>
      <Route path='/lost&found' element={<LostnFound />} />
      <Route path='/carental' element={<Carental/>} />
      <Route path='/discussion' element={< Discussion/>} />
      <Route path='/projects' element={< Projects/>} />
      <Route path='/inbox' element={<Inbox />} />
    </Routes>
    </>

  )
}

export default App