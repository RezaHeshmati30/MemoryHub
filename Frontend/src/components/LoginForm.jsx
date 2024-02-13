import {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'

function LoginForm() {
  const {loginHandler, showLoginForm, hasToken,emailLogin, setEmailLogin, passwordLogin, setPasswordLogin} = useContext(AuthContext);  


  return (

  <div className={`${showLoginForm && !hasToken ? "flex" : "hidden"} flex-col justify-center items-end pr-[10px] `}>
          <h2 className='mb-[20px] w-[30%]'>Login</h2>
            <form onSubmit={loginHandler} className='flex flex-col gap-[10px] w-[30%] '>
              <label htmlFor="email">Email: </label>
              <input onChange={(e) => setEmailLogin(e.target.value) } type="email" name="email" value={emailLogin} />
              <br />
              <label htmlFor="password">Password: </label>
              <input onChange={(e) => setPasswordLogin(e.target.value) } type="password" name="password" value={passwordLogin} />
              <br />
              <button  className='bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px] w-[30%]' type="submit">Log In</button>
            </form>
    </div>

    
  )
}

export default LoginForm