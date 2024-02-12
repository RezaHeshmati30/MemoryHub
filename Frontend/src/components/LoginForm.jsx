import {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'

function LoginForm() {
  const {loginHandler} = useContext(AuthContext);  
  return (
    <>
        <h2>Login</h2>
          <form onSubmit={loginHandler}>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" />
            <br />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" />
            <br />
            <button type="submit">Log In</button>
          </form>
    </>
  )
}

export default LoginForm