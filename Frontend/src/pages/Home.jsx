
import React, { useContext } from "react";
import HomePageButtons from "../components/HomePageButtons";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";
import image5 from "../assets/images/image5.png";
import image6 from "../assets/images/image6.png";
import image7 from "../assets/images/image7.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import arrow from "../assets/arrow.svg";
import forward from "../assets/forward.svg";
import Footer from "../components/Footer";
import HomeScrollImages from "../components/HomeScrollImages";

function Home() {
  const navigate = useNavigate();
  const { hasToken, setShowLoginForm, setIsCreateCardsClicked } =
    useContext(AuthContext);

  const onClickHandler = () => {
    hasToken ? navigate("/createSet") : setShowLoginForm(true);
    setIsCreateCardsClicked(true);
  };

  

  return (
    <div className='max-container  '>
      
      <section className='padding-container relative'>
      
      

        <img
          src={image1}
          className=' w-full h-auto max-w-[1440px] max-h-[695px] flex-shrink-0 brightness-50 object-cover  '
        />
        <div className=' absolute mt-3 left-4 sm:left-10 md:left-20 lg:top-10 lg:left-20 text-white  sm:text-2xl md:text-3xl lg:text-[8em] text-center font-dm-sans font-bold tracking-wide text-justify  '>
         <p className="leading-none "> Unleash your full potential
          <br />
          with our free
          <br />
          flashcard platform!
          </p>
          <div className='  sm:text-base md:text-lg lg:text-xl xl:text-2xl absolute text-white font-dm-sans tracking-wide pt-4 sm:pt-6 md:pt-[]'>
            <p className=" mt-6 ">
              Make studying fun,fast and super effective with
              <br /> our intelligent flashcards feature. Create your
              <br /> own or search for what you need in our extensive
              <br /> flashcards library.
              </p>
            <HomePageButtons />
          </div>
        </div>
        <div className='absolute mt-16 left-20 w-[78em] h-[14.4em]'>
          <p className='text-black font-dm-sans text-xl text-2xl md:text-3xl'>
            We see it as our responsibility to provide all
            <br /> students with the confidence and tools they
            <br /> need to achieve their goals.
          </p>
        </div>

        <div className='relative'>
          <img
            src={image2}
            className='absolute mt-16 right-20 w-[316px] h-[232px] flex-shrink-0 '
          />
        </div>
        <div className='absolute  right-20 text-center w-[316] h-[232] mt-80 flex flex-col justify-end '>
          <p className=' mt-[80px] text-black font-dm-sans whitespace-nowrap text-[4em]  '>
            Let us explain how it works!
          </p>
        </div>
        <div className='flex flex-row justify-center items-center mt-[40%] gap-10'>
          <div className='relative w-[432px] h-[560px] '>
            <div
              style={{ backgroundImage: `url(${image3})` }}
              className='bg-cover bg-center rounded-lg w-full h-full '
            ></div>
            <div
              className='absolute bottom-0 w-full px-2 py-1'
              style={{ transform: "translateY(100%)" }}
            >
              <p className='text-black font-dm-sans font-bold text-base mt-5 text-justify'>
                Easily craft custom flashcards from scratch with our intuitive
                tool
              </p>
              <p className='text-gray-600 font-dm-sans font-normal  text-base  text-center mt-7 text-justify'>
                Here's how it works: simply input your study content and
                seamlessly integrate images to enhance your cards. Say goodbye
                to wasted time—create personalized flashcards effortlessly!
              </p>
            </div>
          </div>

          <div className='relative w-[432px]'>
            <div
              style={{ backgroundImage: `url(${image4})` }}
              className='bg-cover bg-center rounded-lg w-full h-[560px]'
            ></div>
            <div
              className='absolute bottom-0 w-full px-2 py-1'
              style={{ transform: "translateY(100%)" }}
            >
              <p className='text-black font-dm-sans font-bold text-base mt-5 text-center  text-justify '>
                Explore your expertise with expertly crafted quizzes covering a
                wide array of subjects
              </p>
              <p className='text-gray-600 font-dm-sans font-normal text-base  mt-7'>
                Elevate your understanding and improve your grades by engaging
                with our quiz platform. With three distinct modes—learn, write,
                and test—you have the flexibility to tailor your study approach
                to suit your needs.
              </p>
            </div>
          </div>
          <div className='relative w-[432px]'>
            <div
              style={{ backgroundImage: `url(${image5})` }}
              className='bg-cover bg-center rounded-lg w-full h-[560px]'
            ></div>
            <div
              className='absolute bottom-0 w-full px-2 py-1'
              style={{ transform: "translateY(100%)" }}
            >
              <p className='text-black font-dm-sans font-bold mt-5 text-base  text-center  text-justify '>
                Access millions of shared flashcards from students just like you
              </p>
              <p className='text-gray-600 font-dm-sans font-normal text-base  text-center mt-7 text-justify '>
                Sharing is caring! Memory Hub users share thousands of
                flashcards each month to enhance your knowledge across all your
                subjects. Learn from others for an exceptional learning
                experience.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className='w-full bg-gray-400 h-px mt-[23%] mb-[10%]'></div>

          <img
            src={image6}
            className='w-[1424px] h-[700px] object-cover rounded-[8px]'
          />

          <div className='flex items-start mt-[10%] ml-[5%]'>
            <img
              src={image7}
              className='w-[500px] h-[600px] rounded-[8px] mr-4'
            />

            <div className='flex flex-col ml-[15%]'>
              <p className='text-black font-bold text-[1.7em] font-sans whitespace-nowrap '>
                Our advantages
              </p>
              <p
                className='text-black font-normal text-[4em] font-sans leading-[48px] mt-[15%] '
                style={{ letterSpacing: "-2px" }}
              >
                Efficiency
              </p>
              <p
                className='text-black font-normal text-[4em] font-sans leading-[48px] mt-3 '
                style={{ letterSpacing: "-2px" }}
              >
                Flexibility
              </p>
              <p
                className='text-black font-normal text-[4em] font-sans leading-[48px] mt-3 '
                style={{ letterSpacing: "-2px" }}
              >
                Accessibility
              </p>
              <p className='text-black font-bold text-[1.7em] font-sans leading-[25.5px] mt-[23%]'>
                Memory Hub offers an efficient, flexible, and accessible
                learning experience
              </p>
              <p className='text-gray-500 font-normal text-[1.7em] font-sans leading-[25.5px] mt-[5%]'>
                Its spaced repetition algorithm optimizes review intervals for
                better retention. Users can customize flashcards to their
                preferences, and the platform is accessible across devices.
                These features make Memory Hub a versatile tool for improving
                knowledge and academic performance.
              </p>
            </div>
          </div>

          <div
            className='w-full bg-gray-400 h-px mt-[10%] mb-[10%]'
            style={{ maxWidth: "1360px" }}
          ></div>
        </div>

        <div className='flex items-start mb-[10%]'>
          <div className='font-sans text-black font-bold text-[1.7em] leading-[25.5px] mr-4 whitespace-nowrap'>
            Feedback from our users
          </div>
          <div
            className='font-sans text-black font-normal text-[4em] leading-[48px] ml-[30%] '
            style={{ letterSpacing: "-2px" }}
          >
            According to 89% of students utilizing Memory
            <br /> Hub's Learning and Testing modes, they report
            <br /> improved academic performance as a result.
          </div>
        </div>

        <div className='flex flex-col gap-5  '>
          <HomeScrollImages />

          <div
            className='mt-[10%] w-[1370px] h-[700px] flex-shrink-0 rounded-[8px] bg-black p-8'
            style={{
              background:
                "linear-gradient(180deg, rgba(235,225,139,1) 0%, rgba(238,205,108,1) 47%, rgba(226,159,134,1) 100%)",
            }}
          >
            <p
              className='text-black font-bold text-[8.8em] leading-[120%] tracking-tighter'
              style={{
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-2px",
                fontWeight: 700,
              }}
            >
              Are you ready to turn <br /> learning into fun?
            </p>

            <button
              onClick={onClickHandler}
              className='bg-[#FFF] rounded-[36px] w-60 h-16 flex justify-center items-center flex-shrink-0 text-black font-dm-sans font-bold text-base mt-[7%] gap-3'
            >
              CREATE CARDS
              <svg
                onClick={() => navigate("/")}
                className='w-8 h-8 ml-2'
              >
                <image href={arrow} x='0' y='0' width='100%' height='100%' />
                <image href={forward} x='0' y='0' width='100%' height='100%' />
              </svg>
            </button>

            <p className='text-black  font-semibold font-dm-sans text-[1.7em] leading-relaxed tracking-tight mt-[8%]'>
              Sign in or register to create your own flashcard set
            </p>

            <p className='text-gray-600 mt-4 font-dm font-normal text-[1.7em] leading-relaxed'>
              Create your first flashcard set and experience how easy and fast
              you can improve your skills.
            </p>
          </div>

          <div
            className='w-full bg-gray-400 h-px mt-[7%] mb-[5%]'
            style={{ maxWidth: "1360px" }}
          ></div>
        </div>

        <Footer />
      </section>
    </div>
  );
}

export default Home;












































