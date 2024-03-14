
import React from 'react';
import HomePageButtons from '../components/HomePageButtons';
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import image10 from "../assets/image10.jpeg";

function Home() {
  return (
    <div className='max-container'>
      <section className='padding-container relative'>
        <img src={image1} className="w-[1440px] h-[695px] flex-shrink-0 brightness-50" />
        <div className=" w-[99.8em] h-[28.8em] absolute top-10 left-20 text-white text-3xl sm:text-5xl md:text-6xl text-center font-dm-sans font-bold  tracking-wide text-justify ">
          Unleash your full potential<br />
          with our free<br />
          flashcard platform!
          <div className="absolute text-black font-dm-sans font-normal text-xl leading-normal tracking-wide  pt-8">
            <p className=" text-base font-normal leading-normal text-white font-dm-sans text-xl">Make studying fun,fast and super effective with<br /> our intelligent flashcards feature. Create your<br /> own or search for what you need in our extensive<br /> flashcards library.</p>
            <HomePageButtons />
          </div>
        </div>
        <div className="absolute mt-16 left-20 w-[78em] h-[14.4em]">
          <p className="text-black font-dm-sans text-xl text-2xl md:text-3xl">
            We see it as our responsibility to provide all<br /> students with the confidence and tools they<br /> need to achieve their goals.
          </p>
        </div>


        <div className='relative' >
          <img src={image2} className="absolute mt-16 right-20 w-[316px] h-[232px] flex-shrink-0 " />
        </div>
        <div className="absolute  right-20 text-center w-[316] h-[232] mt-80 flex flex-col justify-end ">
          <p className=" mt-[80px] text-black font-dm-sans whitespace-nowrap text-[4em]  ">Let us explain how it works!</p>
        </div>
        <div className='flex flex-row justify-center items-center mt-[40%] gap-10'>



        
  <div className="relative w-[432px] h-[560px] ">
    <div style={{ backgroundImage: `url(${image3})` }} className="bg-cover bg-center rounded-lg w-full h-full "></div>
    <div className="absolute bottom-0 w-full px-2 py-1" style={{transform: 'translateY(100%)'}}>
      <p className="text-black font-dm-sans font-bold text-base mt-5 text-justify">
        Easily craft custom flashcards from scratch with our intuitive tool
      </p>
      <p className="text-gray-600 font-dm-sans font-normal  text-base  text-center mt-7 text-justify">
        Here's how it works: simply input your study content and seamlessly integrate images to enhance your cards. Say goodbye to wasted time—create personalized flashcards effortlessly!
      </p>
    </div>
  </div>



  <div className="relative w-[432px]">
    <div style={{ backgroundImage: `url(${image4})` }} className="bg-cover bg-center rounded-lg w-full h-[560px]"></div>
    <div className="absolute bottom-0 w-full px-2 py-1" style={{transform: 'translateY(100%)'}}>
      <p className="text-black font-dm-sans font-bold text-base mt-5 text-center  text-justify ">
        Explore your expertise with expertly crafted quizzes covering a wide array of subjects
      </p>
      <p className="text-gray-600 font-dm-sans font-normal text-base  mt-7">
        Elevate your understanding and improve your grades by engaging with our quiz platform. With three distinct modes—learn, write, and test—you have the flexibility to tailor your study approach to suit your needs.
      </p>

    </div>
  </div>
  <div className="relative w-[432px]">
    <div style={{ backgroundImage: `url(${image5})` }} className="bg-cover bg-center rounded-lg w-full h-[560px]"></div>
    <div className="absolute bottom-0 w-full px-2 py-1" style={{transform: 'translateY(100%)'}}>
      <p className="text-black font-dm-sans font-bold mt-5 text-base  text-center  text-justify ">
        Access millions of shared flashcards from students just like you
      </p>
      <p className="text-gray-600 font-dm-sans font-normal text-base  text-center mt-7 text-justify ">
        Sharing is caring! Memory Hub users share thousands of flashcards each month to enhance your knowledge across all your subjects. Learn from others for an exceptional learning experience.
      </p>
    </div>
    </div>

  </div>
  <div>
  <div className="w-full bg-gray-400 h-px mt-[23%] mb-[10%]" ></div>

  <img src={image6} className="w-[1424px] h-[700px] object-cover rounded-[8px]" />


  <div className="flex items-start mt-[10%] ml-[5%]">
    <img src={image7} className="w-[500px] h-[600px] rounded-[8px] mr-4"/>

    <div className="flex flex-col ml-[20%]">
      <p className="text-black font-bold text-[1.7em] font-sans whitespace-nowrap ">Our advantages</p>
      <p className="text-black font-normal text-[4em] font-sans leading-[48px] mt-[15%] " style={{ letterSpacing: '-2px' }}>Efficiency</p>
      <p className="text-black font-normal text-[4em] font-sans leading-[48px] mt-3 " style={{ letterSpacing: '-2px' }}>Flexibility</p>
      <p className="text-black font-normal text-[4em] font-sans leading-[48px] mt-3 " style={{ letterSpacing: '-2px' }}>Accessibility</p>
      <p className="text-black font-bold text-[1.7em] font-sans leading-[25.5px] mt-[23%]">Memory Hub offers an efficient, flexible, and accessible learning experience</p>
      <p className="text-gray-500 font-normal text-[1.7em] font-sans leading-[25.5px] mt-[5%]">Its spaced repetition algorithm optimizes review intervals for better retention. Users can customize flashcards to their preferences, and the platform is accessible across devices. These features make Memory Hub a versatile tool for improving knowledge and academic performance.</p>
    </div>
  </div>

  <div className="w-full bg-gray-400 h-px mt-[10%] mb-[10%]" style={{ maxWidth: '1360px' }}></div>
</div>


<div className="flex items-start mb-[10%]">
  <div className="font-sans text-black font-bold text-[1.7em] leading-[25.5px] mr-4 whitespace-nowrap">
    Feedback from our users
  </div>
  <div className="font-sans text-black font-normal text-[4em] leading-[48px] ml-[30%] " style={{ letterSpacing: '-2px' }}>
    According to 89% of students utilizing Memory<br /> Hub's Learning and Testing modes, they report<br /> improved academic performance as a result.
  </div>
</div>

<div className='flex flex-row justify-center items-start gap-4 mt-10 flex-wrap'>
<div className="flex flex-col items-start gap-2">
        <img src={image8} className="w-[548px] h-[408px] flex-shrink-0 rounded-[8px] " />
    
    <p className="text-black font-dm-sans font-bold text-[1.7em] leading-[25.5px]">
    Anna, University of Chicago student, 23 y.o.
    </p>
    <p className="text-gray-600 font-dm-sans font-normal text-[1.7em] leading-[25.5px]">
    Memory Hub is a life-saver when everything I have to know seems<br /> endless. I can focus on one chunk at a time and make real progress,<br /> instead of drowning.
    </p>
    </div>
    <div className="flex flex-col items-start gap-2">
    <img src={image9} className="w-[548px] h-[408px] flex-shrink-0 rounded-[8px] " />
    
    <p className="text-black font-dm-sans font-bold text-[1.7em] leading-[25.5px]">
    Luca, Ludwig Maximilian University of Munich, 21 y.o.
    </p>
    <p className="text-gray-600 font-dm-sans font-normal text-[1.7em] leading-[25.5px]">
    Memory Hub has truly revolutionized the way I study. The flashcard<br /> system is incredibly intuitive, allowing me to absorb information<br /> efficiently. The variety of subjects covered is impressive, and the<br /> platform's user-friendly interface makes learning enjoyable.
    </p>
    </div>
    <div className="flex flex-col items-start gap-2">
    <img src={image10} className="w-[548px] h-[408px] flex-shrink-0 rounded-[8px] " />
    
    <p className="text-black font-dm-sans font-bold text-[1.7em] leading-[25.5px]">
    Johanna, Heidelberg University, 26 y.o.
    </p>
    <p className="text-gray-600 font-dm-sans font-normal text-[1.7em] leading-[25.5px]">
    s a student, I can't recommend Memory Hub enough. The flashcard<br /> feature has been instrumental in helping me grasp complex concepts<br /> and retain information effectively.
    </p>
    </div>


</div>





      </section>
      
    </div>
  );
}

export default Home;













































