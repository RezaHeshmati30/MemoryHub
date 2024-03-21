import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import close from "../assets/images/close.svg";

function LoginForm() {
  const {
    loginHandler,
    showLoginForm,
    setShowLoginForm,
    hasToken,
    emailLogin,
    setEmailLogin,
    passwordLogin,
    setPasswordLogin,
    setShowSignUpForm,
    isCreateCardsClicked,
    setIsCreateCardsClicked,
  } = useContext(AuthContext);

  const onClickCloseHandler = () => {
    setIsCreateCardsClicked(false);
    setShowLoginForm(false);
  };

  const onClickHandler = () => {
    setShowLoginForm(false);
    setShowSignUpForm(true);
  };

  return (
    <div className="max-container mx-auto ">
      <div
        className={`${
          showLoginForm && !hasToken ? "flex" : "hidden"
        }  px-8 fixed top-[15%] right-0 left-0 z-50 mx-auto flex-col  justify-center items-center rounded-lg border border-gray-300 bg-white md:w-[482px] w-[375px] h-[606px] `}
      >
        {isCreateCardsClicked && (
          <h2 className=" text-[#F70000] font-sans text-[1.4em] mt-2 mb-5 mx-auto">
            Please log in or sign up first to have the possibility to create
            your own set.
          </h2>
        )}
        <div className="w-full flex justify-between items-center px-6  ">
          <h2 className=" font-sans-regular text-[3em]">Log In</h2>
          <button onClick={onClickCloseHandler} className="w-[28px] h-[28px]">
            <img src={close} />
          </button>
        </div>

        <div className="w-full h-[1px] bg-black self-center text-center"></div>

        <form
          onSubmit={loginHandler}
          className="flex flex-col items-start gap-4 mt-4 w-full "
        >
          <label
            htmlFor="email"
            className="text-black font-sans text-base font-normal text-[1.4em]"
          >
            Email or phone number
          </label>
          <input
            className="w-full h-12 rounded-lg font-sans border border-gray-200 bg-white text-[1.em] "
            onChange={(e) => setEmailLogin(e.target.value)}
            type="email"
            name="email"
            value={emailLogin}
            style={{ height: "48px" }}
          />

          <label
            htmlFor="password"
            className="text-black font-sans text-base font-normal text-[1.4em]"
          >
            Password
          </label>
          <input
            className="w-full h-12 font-sans text-[1.4em]  rounded-lg border border-gray-200 bg-white"
            onChange={(e) => setPasswordLogin(e.target.value)}
            type="password"
            name="password"
            value={passwordLogin}
            style={{ height: "48px" }}
          />

          <button
            className="w-full h-14 rounded-lg bg-black text-white text-[1em]"
            type="submit"
          >
            LOG IN
          </button>
          <p className="text-black font-sans">Don't have an account?</p>
          <button
            onClick={onClickHandler}
            className="w-full h-14 rounded-lg bg-black text-white text-[1.]"
            type="button"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
