
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages//Signup'
import Login from './pages/Login'
import Homepage from "./pages/Homepage";
import Internpage from "./pages/Internpage";
import CompanyRegistration from './pages/CompanyRegistrartion'
import UserProfile from './pages/UserProfile'
import UserDashboard from './pages/UserDashboard'
import ForgotPassword from './pages/ForgotPassword'
import InternshipSettings from './pages/InternshipSettings';
import InternshipApplicationForm from './pages/ApplyInternship'
import MyInternships from './pages/MyInternships'
import AboutUs from './pages/AboutUs';
import Reviews from './pages/Reviews';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Homepage" element={<Homepage />} />
      <Route path="/internships" element={<Internpage />} />
      <Route path="/company-registration" element={<CompanyRegistration/>}/>
      <Route path="/user-profile" element={<UserProfile/>}/>
      <Route path="/user-dashboard" element={<UserDashboard/>}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="InternshipSettings" element={<InternshipSettings/>}/>
      <Route path='/apply-internship' element={<InternshipApplicationForm/>}/>
      <Route path='/my-applications' element = {<MyInternships/>}/>
      <Route path='/about-us' element = {<AboutUs/>}/>
      <Route path='/reviews' element = {<Reviews/>}/>
      <Route path="/companies" element={<AboutUs />} />
    </Routes>
  )
}

export default App;
