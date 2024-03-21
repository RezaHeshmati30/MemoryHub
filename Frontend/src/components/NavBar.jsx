import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

function NavBar() {
  const {
    showLoginForm,
    setShowLoginForm,
    showSignUpForm,
    setShowSignUpForm,
    hasToken,
    logoutHandler,
    getUserInfo,
    user,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const userId = user?._id;

  const onClickLoginHandler = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
  };

  const onClickSignUpHandler = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
  };

  const renderAuthButtons = () => {
    if (!hasToken) {
      return (
        <>
          <li className='block'>
            <button
              onClick={onClickLoginHandler}
              className=' w-[45px] h-[18px] auth-button text-black font-dm-sans text-[1.2em] font-bold uppercase'
            >
              Login
            </button>
          </li>
          <li className='block'>
            <button
              onClick={onClickSignUpHandler}
              className=' w-[4.7em] h-[1.2em] auth-button inline-flex items-center gap-2 px-9 py-4 justify-center bg-black text-white text-[1.2em] rounded-full'
            >
              SignUp
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className='block'>
            <Link
              to={`/user/${userId}`}
              className='auth-button text-black font-dm-sans text-[1.2em] uppercase '
            >
              MY ACCOUNT
            </Link>
          </li>
          <li className='block'>
            <button
              onClick={(e) => {
                logoutHandler(e);
                navigate("/");
              }}
              className='inline-flex justify-center items-center gap-2.5 px-6 py-3 border border-black text-black font-bold uppercase text-[1.2em] leading-[120%] rounded-full'
            >
              log out
            </button>
          </li>
        </>
      );
    }
  };

  return (
    <nav className='p-4 flex justify-between items-center padding-container max-container'>
      <div
        className='flex items-center cursor-pointer '
        onClick={() => navigate("/")}
      >
        <div
          className='w-[58px] h-[48px] bg-cover bg-no-repeat '
          style={{ backgroundImage: `url(${logo})` }}
        ></div>
        <div className='w-[112px] h-[19px] text-lg font-semibold ml-2 text-black font-dm-sans text-xs font-bold uppercase'>
          Memory Hub
        </div>
      </div>
      <ul className='flex gap-4 items-center'>{renderAuthButtons()}</ul>
    </nav>
  );
}

export default NavBar;
