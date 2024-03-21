import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import close from "../assets/images/close.svg";
import success from "../assets/images/success.svg";
import errorIcon from "../assets/images/test-wrong.svg";

function SignUpForm() {
    const { signUpHandler, showSignUpForm, setShowLoginForm, setShowSignUpForm, hasToken, emailSignUp, passwordSignUp, 
      setEmailSignUp, setPasswordSignUp, firstName, setFirstName, lastName, setLastName, setIsCreateCardsClicked, nickName, setNickName, error, successSignUpWindow, setSuccessSignUpWindow, isLoading } = useContext(AuthContext);

    const onClickHandler = () => {
      setShowSignUpForm(false);
      setShowLoginForm(true);
    }

    const onClickCloseHandler = () => {
      setIsCreateCardsClicked(false);
      setShowSignUpForm(false);
    }

    const btnStyle = "w-full py-[21px] rounded-[8px] text-white text-[1.2em]";

    return (
      <div className='max-container relative'>
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
          <input className='w-full h-12 rounded-lg font-sans border border-gray-200 bg-white text-[1.4em]' onChange={(e) => setNickName(e.target.value)} type="text" name="nickName" value={nickName} />
          <br />

          <label htmlFor="email" className="text-black font-sans  font-normal" >Email </label>
          <input className='w-full h-12 rounded-lg font-sans border border-gray-200 bg-white ' onChange={(e) => setEmailSignUp(e.target.value)} type="email" name="email" value={emailSignUp} />
          <br />

          <label htmlFor="password" className="text-black font-sans  font-normal" >Password </label>
          <input className='w-full h-12 rounded-lg font-sans border border-gray-200 bg-white ' onChange={(e) => setPasswordSignUp(e.target.value)} type="password" name="password" value={passwordSignUp} />
          <br />
          
          <button className='w-full h-14 rounded-lg bg-black text-white font-sans ' onClick={onClickHandler} type="submit" >SIGN UP</button>
        </form>
        
        </div>
        <div className={`${successSignUpWindow ? "block" : "hidden"} absolute z-[300] top-[50%] left-[50%] -translate-x-[50%]  text-center text-leading-[150%] min-w-[300px] bg-white flex flex-col items-center gap-[25px] px-[24px] pt-[30px] pb-[40px] rounded-[8px] border-[1px] border-[#BCC0C1]`}>
          <img src={successSignUpWindow && error.length < 1 ? success : errorIcon} alt="" />
          <p className='text-[1.7em]'>{error?.length > 0 ? error : "An email confirmation has been sent to your email address. Please check your inbox to complete the signup process."}</p>
          <button className={`${successSignUpWindow && error.length < 1 ? "bg-[#937DE2]" :  "bg-[#FF5E5E]"} ${btnStyle}`} onClick={() => setSuccessSignUpWindow(false)}>OK</button>
        </div>
      </div>
     
    )
}

export default SignUpForm 











