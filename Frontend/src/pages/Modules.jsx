import React, { useContext, useEffect } from 'react'
import { StudySetsContext } from '../context/StudySetsContext'


function Modules() {
  const {getModulesData, modulesData} = useContext(StudySetsContext);

  useEffect(() => {
    getModulesData();
  }, [])

  const test  = modulesData || [];

  console.log("moduleData", test)
  return (
    <section className='mt-[100px]'>
      <div className='flex justify-center'>
        <h1 className='max-w-[560px]'>Find an appropriate topic and start your training</h1>
      </div>
      <ul className='flex flex-wrap'>
        {modulesData?.map(module => (
          <li className='basis-[30%]' key={module._id}>{module?.title}</li>
        )
        )}
      </ul>
        
    </section>
  )
}

export default Modules