import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Library from '../pages/Library'
import Search from '../pages/Search'
import Signup from '../pages/Signup'
import SetPassword from '../pages/SetPassword'
import PersonalDetails from "../pages/PersonalDetails";
import Terms from "../pages/Terms";
import VerifyOTP from "../pages/VerifyOTP";
import Login from "../pages/Login";
import LoginPassword from "../pages/LoginPassword";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Mainlayout from '../layouts/Mainlayout'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path ='/' element={<Mainlayout />}>
          <Route index element = {<Home />} />
          <Route path='library' element ={<Library />} />
          <Route path ='search' element={<Search />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/password" element={<SetPassword />} />
        <Route path="/signup/details" element={<PersonalDetails />} />
        <Route path="/signup/terms" element={<Terms />} />
        <Route path="/signup/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/password" element={<LoginPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default AppRoutes