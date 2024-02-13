import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function SignUpForm() {
    const {signUpHandler, showSignUpForm, setShowLoginForm, setShowSignUpForm, hasToken, emailSignUp, passwordSignUp, setEmailSignUp, setPasswordSignUp} = useContext(AuthContext);

    const onClickHandler = () => {
      setShowSignUpForm(false);
      setShowLoginForm(true);
    }

  return (
    <div className={showSignUpForm && !hasToken ? "block" : "hidden"}>
        <h2>Sign Up</h2>
        <form onSubmit={signUpHandler} >
        <label htmlFor="email">Email: </label>
        <input onChange={(e) => setEmailSignUp(e.target.value) } type="email" name="email" value={emailSignUp} />
        <br />
        <label htmlFor="password">Password: </label>
        <input onChange={(e) => setPasswordSignUp(e.target.value) } type="password" name="password" value={passwordSignUp} />
        <br />
        <button onClick={onClickHandler} type="submit" className='bg-[#a39a9a] py-[10px] px-[20px] rounded-[10px] m-[10px]'>Sign Up</button>
        </form>
  </div>
  )
}

export default SignUpForm