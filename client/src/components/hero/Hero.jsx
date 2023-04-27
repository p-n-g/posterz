import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Hero.scss";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="Hero">
      <div className="hero-content center">
        <h1 className='heading'>HELLO POSTERZ WELCOME TO THE COMMUNITY</h1>
        <p className='subheading'>We have exciting stuffs for you</p>
        <button className='cta btn-primary' onClick={() => navigate("/category")}>Explore more</button>
      </div>
    </div>
  )
}

export default Hero