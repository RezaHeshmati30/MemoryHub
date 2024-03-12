import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
    const {showLoginForm, setShowLoginForm, showSignUpForm, setShowSignUpForm, hasToken, getUserInfo, user, logoutHandler} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo();
        !hasToken ? logoutHandler() : "";
    },[])

    const userId = user?._id;

    const onClickLoginHandler = () => {
        setShowLoginForm(true);
        setShowSignUpForm(false);
    }

    const onClickSignUpHandler = () => {
        setShowSignUpForm(true);
        setShowLoginForm(false);
    }

  return (
    <header className='max-container padding-container'>
        <nav className='flex justify-end'>
            <ul className='flex gap-[20px] items-center'>
            <li className={hasToken ? "hidden" : "block"}>
                    <button onClick={onClickSignUpHandler} className='bg-[#a39a9a] py-[10px] px-[20px] rounded-[10px]'>SignUp</button>
                </li>
                <li className={hasToken ? "hidden" : "block"}>
                    <button onClick={onClickLoginHandler} className='bg-[#a39a9a] py-[10px] px-[20px] rounded-[10px]'>Login</button>
                </li>
                <li className={!hasToken ? "hidden" : "block"}>
                    <Link to={`/user/${userId}`} className='block bg-[#a39a9a] py-[10px] px-[20px] rounded-[10px]'>My Account</Link>
                </li>
                <li className={!hasToken ? "hidden" : "block"}>
                    <button className='bg-[#a39a9a] py-[10px] px-[20px] rounded-[10px]' onClick={(e) => {logoutHandler(e); navigate("/");}} type='submit'>Logout</button>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default NavBar