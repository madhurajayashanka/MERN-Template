import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainNavbar from './components/Navbar';
import UserOnboardingForm from './components/UserOnboardingPage';
import UserList from './components/UserListPage';
import Login from './components/Login';
import { AuthContext } from './Auth/AuthProvider'; 
import PrivateRoute from './Auth/PrivateRoute'; 

const App = () => {
  const { isLoggedIn } = useContext(AuthContext); 

  return (
    <BrowserRouter>
      {isLoggedIn && <MainNavbar />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/add" /> : <Navigate to="/login" />} />
        <Route element={<PrivateRoute />}>
          <Route path="/add" element={<UserOnboardingForm />} />
          <Route path="/list" element={<UserList />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
