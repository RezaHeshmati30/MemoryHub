import React, { useContext, useEffect } from 'react'
import { StudySetsContext } from '../context/StudySetsContext';
import allTopics from "../assets/images/all-topics.svg";
import arrow from "../assets/images/arrow-forward.svg"



function Modules() {
  const {getModulesData, modulesData} = useContext(StudySetsContext);

  useEffect(() => {
    getModulesData();
  }, [])

  const test  = modulesData || [];

  console.log("moduleData", test)
  return (
    <section className='max-container padding-container mt-[100px]'>
      <div className='flex justify-center mb-[5.6em]'>
        <h1 className='max-w-[560px] text-[4em] text-center text-leading-[120%]'>Find an appropriate topic and start your training</h1>
      </div>
      <ul className='flex flex-wrap gap-[32px] justify-center'>
        {modulesData?.map(module => (
          <li className='basis-[30%] px-[1.6em] py-[2.2em] flex justify-between border-[1px] border-[#BCC0C1] rounded-[8px] shadow-sm' key={module._id}>
            <div className='flex items-center gap-[1.6em]'>
              <img src={module.icon} className='w-[28px]' alt="" />
              <p className='text-[2em] dm-sans-medium'>{module?.title}</p>
            </div>
            <img src={arrow} alt="" />
          </li>
        )
        )}
        <li className='basis-[30%] bg-[#f5ecfff0] flex px-[1.6em] py-[2.2em] justify-between border-[1px] border-[#BCC0C1] rounded-[8px] shadow-sm'>
          <div className='flex items-center gap-[1.6em]'>
            <img src={allTopics} alt="" />
            <p className='text-[2em] dm-sans-medium'>All topics</p>
          </div>
          <img src={arrow} alt="" />
        </li>
      </ul>
        
    </section>
  )
}

export default Modules