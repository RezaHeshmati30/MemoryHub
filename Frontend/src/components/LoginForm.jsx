import {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'

function LoginForm() {
  const {loginHandler, showLoginForm, setShowLoginForm, hasToken,emailLogin, setEmailLogin, passwordLogin, setPasswordLogin, setShowSignUpForm, isCreateCardsClicked, setIsCreateCardsClicked} = useContext(AuthContext);  

  const onClickCloseHandler = () => {
    setIsCreateCardsClicked(false);
    setShowLoginForm(false);
  }
  return (

  <div className={`${showLoginForm && !hasToken ? "flex" : "hidden"} flex-col justify-center items-end pr-[10px] `}>
          <h2 className={isCreateCardsClicked ? "block bg-red-300" : "hidden"}>Log in to create your own study set with cards</h2>
          <h2 className='mb-[20px] w-[30%]'>Login</h2>
            <form onSubmit={loginHandler} className='flex flex-col gap-[10px] w-[30%] '>
              <label htmlFor="email">Email: </label>
              <input className='border-[1px] border-gray-400' onChange={(e) => setEmailLogin(e.target.value) } type="email" name="email" value={emailLogin} />
              <br />
              <label htmlFor="password">Password: </label>
              <input className='border-[1px] border-gray-400' onChange={(e) => setPasswordLogin(e.target.value) } type="password" name="password" value={passwordLogin} />
              <br />
              <button className='bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px] w-[30%]' type="submit">Log In</button>
            </form>
            <button className='bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px] w-[30%] mt-[10px]' onClick={onClickCloseHandler}>Close X</button>
    </div>

    
  )
}

export default LoginForm