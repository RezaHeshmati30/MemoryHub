import React, { useContext, useEffect } from 'react'
import { StudySetsContext } from '../context/StudySetsContext';
import allTopics from "../assets/images/all-topics.svg";
import arrow from "../assets/images/arrow-forward.svg";
import modulesImg from "../assets/images/modules-img.png"
import { Link } from 'react-router-dom';
import { modulesIcons } from '../constants';



function Modules() {
  const {getModulesData, modulesData} = useContext(StudySetsContext);

  useEffect(() => {
    getModulesData();
  }, [])

  return (
    <section className='max-container padding-container mt-[100px]'>
      <div className='flex justify-center mb-[5.6em]'>
        <h1 className='max-w-[560px] text-[4em] text-center text-leading-[120%]'>Find an appropriate topic and start your training</h1>
      </div>
      <ul className='flex flex-wrap gap-[32px] justify-center mb-[17em]'>
        {modulesData?.map((module, index) => (
          <li key={module._id} className={`basis-[30%] px-[1.6em] py-[2.2em]  border-[1px] border-[#BCC0C1] rounded-[8px] set-box-shadow modules-hover-${index} flex items-center`}>
            <Link to={`/module/${module._id}`} className='flex justify-between w-full' >
              <div className='flex items-center gap-[1.6em]'>
                <img src={modulesIcons[index].icon} className='w-[28px]' alt="" />
                <p className='text-[2em] dm-sans-medium'>{module?.title}</p>
              </div>
              <img src={arrow} alt="" />
            </Link>
          </li>
        )
        )}
        <li className='basis-[30%] bg-[#f5ecfff0] px-[1.6em] py-[2.2em]  border-[1px] border-[#BCC0C1] rounded-[8px] set-box-shadow hover:border-[#8E46EC] flex items-center'>
          <Link to="/all-study-sets" className='flex justify-between w-full'>
            <div className='flex items-center gap-[1.6em]'>
              <img src={allTopics} alt="" />
              <p className='text-[2em] dm-sans-medium'>All topics</p>
            </div>
            <img src={arrow} alt="" />
          </Link>
        </li>
      </ul>
        <div className='flex justify-center'>
          <img src={modulesImg} alt="" />
        </div>
    </section>
  )
}

export default Modules