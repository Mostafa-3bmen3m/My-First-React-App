import React from 'react'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";


const Hero = () => {
  return (
    <section className='h-screen flex-center flex-col gap-y-5'>
        <div className="head">
          <h1 className='font-bungee text-[min(10vw,100px)] text-center'>welcome to the best movie app!</h1>
        </div>
        <div className="btn">
          <button className='head-btn'><a href="#Movies" className='text-[22px] flex items-center'>Explore More <MdKeyboardDoubleArrowDown className='text-3xl mt-1.5' /></a></button>
        </div>
    </section>
  )
}

export default Hero