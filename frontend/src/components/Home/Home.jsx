import React, { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom'
import HeroSection from "./HeroSection"
import HowItWorks from "./HowItWorks"
import PopularCategories from "./PopularCategories"
import PopularCompanies from "./PopularCompanies"
import Navbar from '../Layout/Navbar'


const Home = () => {
  const {isAuthorized} = useContext(Context)
  if(!isAuthorized){
    return <Navigate to={"/login"}/>
  }
  return (
    <>
      <Navbar />
      <section className="homePage page">
        <HeroSection/>
        <HowItWorks/>
        <PopularCategories/>
        <PopularCompanies/>
      </section>
    </>
  )
}

export default Home
