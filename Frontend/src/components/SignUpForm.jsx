import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

function SignUpForm() {
    const {signUpHandler, showSignUpForm, setShowLoginForm, setShowSignUpForm, hasToken, emailSignUp, passwordSignUp, 
      setEmailSignUp, setPasswordSignUp, firstName, setFirstName, lastName, setLastName, setIsCreateCardsClicked, nickName, setNickName} = useContext(AuthContext);
    const [message, setMessage] = useState("");  
    const [successWindow, setSuccessWindow] = useState(false);

    

    const onClickHandler = () => {
      setShowSignUpForm(false);
      // setShowLoginForm(true);
      setSuccessWindow(true);
    }

    const onClickCloseHandler = () => {
      setIsCreateCardsClicked(false);
      setShowSignUpForm(false);
    }

  return (
    <>
    <div className={showSignUpForm && !hasToken ? "block" : "hidden"}>
        <h2>Sign Up</h2>
        <form onSubmit={signUpHandler}>
          <label htmlFor="email">Email: </label>
          <input className='border-[1px] border-gray-400' onChange={(e) => setEmailSignUp(e.target.value) } type="email" name="email" value={emailSignUp} />
          <br />
          <label htmlFor="password">Password: </label>
          <input className='border-[1px] border-gray-400' onChange={(e) => setPasswordSignUp(e.target.value) } type="password" name="password" value={passwordSignUp} />
          <br />
          <label htmlFor="firstName">First Name: </label>
          <input className='border-[1px] border-gray-400' onChange={(e) => setFirstName(e.target.value) } type="text" name="firstName" value={firstName} />
          <br />
          <label htmlFor="lastName">Last Name: </label>
          <input className='border-[1px] border-gray-400' onChange={(e) => setLastName(e.target.value) } type="text" name="lastName" value={lastName} />
          <br />
          <label htmlFor="nickName">Nickname: </label>
          <input className='border-[1px] border-gray-400' onChange={(e) => setNickName(e.target.value) } type="text" name="nickName" value={nickName} />
          <br />
          <button onClick={onClickHandler} type="submit" className='bg-[#a39a9a] py-[10px] px-[20px] rounded-[10px] m-[10px]'>Sign Up</button>
        </form>
        <button className='bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px] w-[30%] mb-[20px]' onClick={onClickCloseHandler}>Close X</button>
  </div>
  <div className={`${successWindow ? "flex" : "hidden"} mx-auto max-w-[300px] flex-col items-center p-[15px] mt-[50px] border-[2px] border-gray-300 rounded-[8px] `}>
          <p className=''>An email confirmation has been sent to your email address. Please check your inbox to complete the signup process.</p>
          <button className='bg-[#b6b2b2] py-[5px] px-[10px] rounded-[10px] w-[30%] mb-[20px]' onClick={() => setSuccessWindow(false)}>Close</button>
        </div>
  </>
  )
}

export default SignUpForm