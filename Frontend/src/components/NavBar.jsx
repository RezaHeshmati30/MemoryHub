import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function NavBar() {
    const {showLoginForm, setShowLoginForm,showSignUpForm, setShowSignUpForm, hasToken, logoutHandler} = useContext(AuthContext);

    const onClickLoginHandler = () => {
        // showLoginForm ? setShowLoginForm(false) : setShowLoginForm(true);
        setShowLoginForm(true);
    }

    const onClickSignUpHandler = () => {
        setShowSignUpForm(true);
    }

  return (
    <nav className='p-[30px] flex justify-end'>
        <ul className='flex gap-[20px]'>
        <li className={hasToken ? "hidden" : "block"}>
                <button onClick={onClickSignUpHandler} className='bg-[#a39a9a] py-[10px] px-[20px] rounded-[10px]'>SignUp</button>
            </li>
            <li className={hasToken ? "hidden" : "block"}>
                <button onClick={onClickLoginHandler} className='bg-[#a39a9a] py-[10px] px-[20px] rounded-[10px]'>Login</button>
            </li>
            <li className={!hasToken ? "hidden" : "block"}>
                <button  className='bg-[#a39a9a] py-[10px] px-[20px] rounded-[10px]'>My Account</button>
            </li>
            <li className={!hasToken ? "hidden" : "block"}>
                <button className='bg-[#a39a9a] py-[10px] px-[20px] rounded-[10px]' onClick={logoutHandler} type='submit'>Logout</button>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar