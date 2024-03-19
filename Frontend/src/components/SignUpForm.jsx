
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import close from "../assets/close.svg";

function SignUpForm() {
    const { signUpHandler, showSignUpForm, setShowLoginForm, setShowSignUpForm, hasToken, emailSignUp, passwordSignUp, 
      setEmailSignUp, setPasswordSignUp, firstName, setFirstName, lastName, setLastName, setIsCreateCardsClicked, nickName, setNickName } = useContext(AuthContext);

    const onClickHandler = () => {
      setShowSignUpForm(false);
      setShowLoginForm(true);
    }

    const onClickCloseHandler = () => {
      setIsCreateCardsClicked(false);
      setShowSignUpForm(false);
    }

    return (
      <div className='max-container  ' >
        <div className={`${showSignUpForm && !hasToken ? "flex" : "hidden"} fixed top-[15%] right-0 left-0 z-50 mx-auto flex-col justify-center items-center w-[482px] h-[650px]  rounded-[8px] border-2  bg-white`}>

        <div className="w-full flex justify-between items-center px-6 mt-[] ">
          <h2 className='text-black font-sans text-[3em] leading-normal '>Sign up</h2>
          <button onClick={onClickCloseHandler} className="w-[28px] h-[28px]">
            <img src={close}  />
          </button>
          
        </div>
        <div className="w-[434px] h-[1px] bg-black mx-auto "></div>

       
        <form onSubmit={signUpHandler} className='flex flex-col items-start  w-[434px] ' >
          <label htmlFor="firstName" className="text-black font-sans mt-5 " >First name </label>
          <input className='w-full h-12 rounded-lg font-sans border border-gray-200 bg-white  ' onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" value={firstName} />
          <br />

          <label htmlFor="lastName" className="text-black font-sans  font-normal" >Last name </label>
          <input className='w-full h-12 rounded-lg font-sans border border-gray-200 bg-white ' onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" value={lastName} />
          <br />

          <label htmlFor="nickName" className="text-black font-sans  font-normal" >Nick name </label>
          <input className='w-full h-12 rounded-lg font-sans border border-gray-200 bg-white ' onChange={(e) => setNickName(e.target.value)} type="text" name="nickName" value={nickName} />
          <br />

          <label htmlFor="email" className="text-black font-sans  font-normal" >Email </label>
          <input className='w-full h-12 rounded-lg font-sans border border-gray-200 bg-white ' onChange={(e) => setEmailSignUp(e.target.value)} type="email" name="email" value={emailSignUp} />
          <br />

          <label htmlFor="password" className="text-black font-sans  font-normal" >Password </label>
          <input className='w-full h-12 rounded-lg font-sans border border-gray-200 bg-white ' onChange={(e) => setPasswordSignUp(e.target.value)} type="password" name="password" value={passwordSignUp} />
          <br />
          
          <button className='w-full h-14 rounded-lg bg-black text-white font-sans font-bold ' onClick={onClickHandler} type="submit" >SIGN UP</button>
        </form>
        
        </div>
      </div>
     
    )
}

export default SignUpForm 











