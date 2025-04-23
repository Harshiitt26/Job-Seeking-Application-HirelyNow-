import React,  { useState , useContext } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import { Navigate, Link } from 'react-router-dom'
import { FaRegUser  } from 'react-icons/fa'
import { MdOutlineMailOutline } from 'react-icons/md'
import { RiLock2Fill } from 'react-icons/ri'
import toast from "react-hot-toast";

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [redirect, setRedirect] = useState(false)

  const {isAuthorized, setIsAuthorized, user , setUser} = useContext(Context)
  const handleLogin = async (e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post("https://job-seeking-application-hirelynow-backend.onrender.com/api/v1/user/login", {email,password,role} , {withCredentials: true, headers: {"Content-Type": "application/json"}})
      toast.success(data.message)
      setEmail("")
      setRole("")
      setPassword("")
      setIsAuthorized(true)
      setRedirect(true)
      
    } catch (error) {
      toast.error(error.response.data.message)
    }
    }
    if(redirect){
      return <Navigate to={'/'}/>
    }
    
  return (
    <>
      <div className="authPage">
              <div className="container">
                <div className="header">
                  <img src="/JobZeelogo.png" alt="logo" />
                  <h3>Login to your account</h3>
                </div>
                <form >
                  <div className="inputTag">
                    <label> Login As</label>
                    <div>
                      <select value={role} onChange={(e)=> setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="Employer"> Employer</option>
                        <option value="Job Seeker"> Job Seeker</option>
                      </select> 
                      <FaRegUser/>
                    </div>
                  </div>
      
                  <div className="inputTag">
                    <label> Email Address</label>
                    <div>
                      <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email"/>
                      <MdOutlineMailOutline/>
                    </div>
                  </div>
                
                  <div className="inputTag">
                    <label>Password</label>
                    <div>
                      <input
                        type="password"
                        placeholder="Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <RiLock2Fill />
                    </div>
                  </div>

                  <button type="submit" onClick={handleLogin}>
                    Login
                  </button>
                  <Link to={"/register"}>Register Now</Link>
                </form>
              </div>
              <div className="banner">
                <img src="/login.png" alt="banner" />
              </div>
            </div>
    </>
  )
}

export default Login
