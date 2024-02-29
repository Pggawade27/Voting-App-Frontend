import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/pages/Register'
import Login from './components/pages/Login';
import Vote from './components/pages/Vote';
import AdminLogin from './components/pages/admin/AdminLogin';
import AdminRegister from './components/pages/admin/AdminRegister';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import { useState } from 'react';
import { MyContext } from './contex/MyContext';
import MainPage from './components/pages/MainPage';

function App() {

  const [id, setId] = useState('')
  const [isVoted, setIsVoted] = useState()
  return (
    <div className="App">
      <MyContext.Provider value={{ id, setId, isVoted, setIsVoted }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/vote' element={<Vote />} />
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/register' element={<AdminRegister />} />
            <Route path='/admin_dash' element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App;
