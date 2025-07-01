import React, { useEffect, useContext } from 'react'
import "./App.css"
import {Context } from "./main"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Navbar from "./components/Layout/Navbar"
import Footer from "./components/Layout/Footer"
import Home from "./components/Home/Home"
import Job from "./components/Job/Jobs"
import JobDetails from "./components/Job/JobDetails"
import MyJobs from "./components/Job/MyJobs"
import PostJobs from "./components/Job/PostJob"
import Application from "./components/Application/Application"
import MyApplication from "./components/Application/MyApplication"
import NotFound from "./components/NotFound/NotFound"
import axios from "axios"
import { Toaster } from "react-hot-toast";


axios.defaults.withCredentials = true;
const App = () => {
  const {isAuthorized, setIsAuthorized, setUser} = useContext(Context)

  useEffect(() => {
  const fetchUser = async () => {
    try {
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        const response = await axios.get("https://job-seeking-application-hirelynow-backend.onrender.com/api/v1/user/getuser", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true);
      }
    } catch (error) {
      setIsAuthorized(false);
    }
  };
  fetchUser();
}, []);
  


  return (
    <>
      <Router>
        {<Navbar/> && window.location.pathname !== "/login" && window.location.pathname !== "/register" }
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/job/getall' element={<Job/>} />
          <Route path='/job/:id' element={<JobDetails/>} />
          <Route path='/job/post' element={<PostJobs/>} />
          <Route path='/job/me' element={<MyJobs/>} />
          <Route path='/application/:id' element={<Application/>} />
          <Route path='/application/me' element={<MyApplication/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        <Footer/>
        
        <Toaster/>
      </Router>
    </>
  )
}

export default App
