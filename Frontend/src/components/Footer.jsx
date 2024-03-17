
import React from 'react';
import logo from '../assets/logo.jpg';

function Footer() {

  const handleClick = (text) => {
    console.log(`${text} clicked`);
  };

  return (
    <div >
      <div className="flex items-center "> 
        <div className="w-[58px] h-[48px] bg-cover bg-no-repeat " style={{ backgroundImage: `url(${logo})` }}></div>
        <div className="w-[112px] h-[19px] text-lg font-semibold ml-2 text-black font-dm-sans text-xs font-bold uppercase">Memory Hub</div>
      </div> 

      <div className="flex items-start justify-center space-x-[10%] ml-[20%] mt-[-3%] gap-10">
        
        <div className="flex flex-col items-start space-y-5  ">
          <div onClick={() => handleClick('Company')} className="cursor-pointer text-black font-dm-sans text-[1.4em] normal-case font-normal leading-6">
            Company
          </div>
          <div onClick={() => handleClick('Career')} className="cursor-pointer text-black font-dm-sans text-[1.4em] normal-case font-normal leading-6">
            Career
          </div>
          <div onClick={() => handleClick('About us')} className="cursor-pointer text-black font-dm-sans text-[1.4em] normal-case font-normal leading-6">
            About us
          </div>
        </div>
        
        
        <div className="flex flex-col items-start space-y-5 ">
          <div onClick={() => handleClick('Product')} className="cursor-pointer text-black font-dm-sans text-[1.4em] normal-case font-normal leading-6">
            Product
          </div>
          <div onClick={() => handleClick('Exams')} className="cursor-pointer text-black font-dm-sans text-[1.4em] normal-case font-normal leading-6">
            Exams
          </div>
          <div onClick={() => handleClick('Explanations')} className="cursor-pointer text-black font-dm-sans text-[1.4em] normal-case font-normal leading-6">
            Explanations
          </div>
          <div onClick={() => handleClick('For Companies')} className="cursor-pointer text-black font-dm-sans text-[1.4em] normal-case font-normal leading-6">
            For Companies
          </div>
          <div onClick={() => handleClick('Magazine')} className="cursor-pointer text-black font-dm-sans text-[1.4em] normal-case font-normal leading-6">
            Magazine
          </div>
        </div>
        
       
        <div className="flex flex-col items-start space-y-5">
          <div onClick={() => handleClick('Help')} className="cursor-pointer text-black font-dm-sans text-[1.4em] normal-case font-normal leading-6">
            Help
          </div>
          <div onClick={() => handleClick('Contact')} className="cursor-pointer text-black font-dm-sans text-[1.4em] normal-case font-normal leading-6">
            Contact
          </div>
          <div onClick={() => handleClick('Help Center')} className="cursor-pointer text-black font-dm-sans text-[1.4em] normal-case font-normal leading-6">
            Help Center
          </div>
        </div>
      </div>

      <div className=" mt-4 text-black font-normal text-[1.4em] leading-6">
        Copyright © Memory Hub 2024
      </div>
      <div  className="bg-[#FFC2FF] w-full h-[8px] mt-10  " />

    </div>
  )
}

export default Footer






