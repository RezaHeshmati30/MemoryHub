import React from 'react'
import arrow from "../assets/images/arrow-forward.svg";
import { Link } from 'react-router-dom';


function BackLink({path}) {

    return (
        <div className='inline'>
            <Link to={path} className='inline-flex items-center gap-[22px] text-[1.2em] dm-sans-bold hover-link'>
                <div className='border-[10px] border-transparent hover:border-[10px] hover:rounded-[50%] hover:border-[#FFC2FF] hover:bg-[#FFC2FF]'>
                    <img src={arrow} className='rotate-180 w-[20px]' width={20} alt="" />
                </div>
                Back
            </Link>
        </div>
    );
  
}

export default BackLink