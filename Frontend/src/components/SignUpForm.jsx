import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function SignUpForm() {
    const {signUpHandler} = useContext(AuthContext);
  return (
    <>
        <h2>Sign Up</h2>
        <form onSubmit={signUpHandler}>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" />
        <br />
        <button type="submit">Sign Up</button>
        </form>
  </>
  )
}

export default SignUpForm