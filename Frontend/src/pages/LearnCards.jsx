import React, { useContext, useEffect, useState } from 'react'
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import BackLink from '../components/BackLink';
import success from "../assets/images/test-success.svg";
import wrong from "../assets/images/test-wrong.svg";
import check from "../assets/images/test-check.svg";
import FinishPracticeWindow from '../components/FinishPracticeWindow';

function LearnCards() {
    const {currentIndex, setCurrentIndex, isRoundFinished, setIsRoundFinished, setRound, correctAnswers, setCorrectAnswers, wrongAnswers, setWrongAnswers, progress, setProgress} = useContext(UserStudySetsContext);
    const { hasToken, getUserInfo, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { userId,id} = useParams();
    const [answerOptions, setAnswerOptions] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [currentCardsSet, setCurrentCardsSet] = useState(null);
    const [correctAnswer, setCorrectAnswer] =  useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [message, setMessage] = useState("");
    const [showMessages, setShowMessages] = useState(false);
    const [currentStudySet, setCurrentStudySet] = useState({});

    useEffect(() => {
        if (hasToken) {
        getUserInfo();
        setCurrentIndex(0);
        setCorrectAnswers(0);
        setWrongAnswers(0);
        setIsRoundFinished(false);
        setRound(1);
        const studySet = user?.savedStudySets?.find(studySet => studySet._id === id) || {};
        const currentCardsSet = studySet?.cards || [];
        const currentCard = currentCardsSet[currentIndex];
        setCurrentCard(currentCard);
        setCurrentCardsSet(currentCardsSet);
        } else {
            navigate('/');
        }
    }, [])

    useEffect(() => {
        const studySet = user?.savedStudySets?.find(studySet => studySet._id === id) || {};
        console.log("studySET:", studySet)
        const currentCardsSet = studySet?.cards || [];
        const currentCard = currentCardsSet[currentIndex];
        setCurrentStudySet(studySet);
        setCurrentCard(currentCard);
        setCurrentCardsSet(currentCardsSet);
        
        if (currentCard) {
            const correctAnswer = currentCard.card.answer;
            const allAnswers = currentCardsSet.map(card => card.card.answer);
            const filteredAnswers = allAnswers.filter(answer => answer !== correctAnswer);
            const shuffledAnswers = shuffleArray(filteredAnswers);
            const incorrectAnswers = shuffledAnswers.slice(0, 3);
            const answerOptions = [correctAnswer, ...incorrectAnswers];
            const shuffledOptions = shuffleArray(answerOptions);
            setAnswerOptions(shuffledOptions);
            setIsCorrect(false);
            setCorrectAnswer(correctAnswer);
            setShowMessages(false);
        }
    }, [currentIndex]);

    
    useEffect(() => {
        if (currentCardsSet && currentCardsSet.length > 0) {
            setProgress(((correctAnswers / currentCardsSet.length) * 100).toFixed(0));
        }
    }, [correctAnswers, currentCardsSet]);
    

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const onClickAnswerHandler = (option) => {
        console.log("Option:", option)
        console.log("correct answer:", correctAnswer)
        setShowMessages(true);
        if (correctAnswer === option) {
            setMessage("Correct!");
        } else {
            setMessage(`Wrong`);
            setIsCorrect(false);
        }  
        setSelectedAnswer(option);
        setIsCorrect(option === correctAnswer);
        option === correctAnswer ? 
        setCorrectAnswers(prevValue => prevValue + 1) : setWrongAnswers(prevValue => prevValue + 1);
    }

    const onClickTryAgainHandler = () => {
        navigate(`/user/${userId}/studySet/learn-cards/${id}`); 
        setCurrentIndex(0);
        setCorrectAnswers(0);
        setWrongAnswers(0);
    }

    const okButtonHandler = () => {
        if (currentIndex + 1 >= currentCardsSet?.length) {
            setIsRoundFinished(true);
            setShowMessages(false);
        } else {
            setCurrentIndex(prevValue => prevValue + 1);
        }
    }
    

    const answerLetter = (index) => {
        if (index === 0) return "A";
        if (index === 1) return "B";
        if (index === 2) return "C";
        if (index === 3) return "D";
    }

  return (
    <div className='border-b-[8px] border-b-[#FFC2FF] h-[100vh]'>
    {hasToken && (
    <section className='max-container padding-container'>
        <FinishPracticeWindow correctAnswers={correctAnswers} progress={progress}/>
        {currentCardsSet && (
        <div>
            <div className="flex justify-between items-center mb-[32px]">
              <div className="basis-[30%]">
              <BackLink path={`/user/${userId}/studySet/${id}`} />
              </div>
              <p className='basis-[30%] text-center text-[3em] text-leading-[120%]'>{currentStudySet?.studySet?.title}</p>
              <div className="basis-[30%] flex flex-col items-end">
                <p className='text-right dm-sans-bold text-[1.7em]'>{currentStudySet?.topic?.title}</p>
              </div>
            </div>
            <div className='w-[60vw] mx-auto'>
                <div className='w-[100%] bg-[#FFF4FC] min-h-[30vh] rounded-[8px]  pt-[40px] px-[32px] pb-[32px] relative'>
                    <p className="text-[2em] text-leading-[100%]">{currentCard?.card?.question}</p>
                    <div className={`${showMessages ? "flex" : "hidden"} absolute z-30 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] justify-center flex-col items-center gap-[15px] px-[24px] pt-[29px] pb-[40px] bg-white mt-[20px] w-[316px] border-[1px] rounded-[8px] border-[#BCC0C1]`}>
                        <img src={isCorrect ? success : wrong} alt="" />
                        <p className='text-[1.4em] text-leading-[150%]'>{isCorrect ? "Correct!" : <>Wrong! The right answer is: <br />"{correctAnswer}"</>}</p>
                        <button onClick={okButtonHandler} className={`${isCorrect ? "bg-[#3EB655] hover:border-[#3EB655]" : "bg-[#FF5E5E] hover:border-[#FF5E5E]"} w-[100%] hover:bg-white text-white hover:text-black border-[1px] p-[6px] rounded-[5px]` }>OK</button>
                    </div>
                </div>
                <p className='text-[1.7em] dm-sans-bold text-center my-[21px]'>{currentIndex +1} / {currentCardsSet?.length}</p>
                <div className='flex gap-[20px] justify-between flex-wrap mt-[40px] w-[100%]'>
                    {answerOptions.map((option, index) => (
                        <button onClick={() => onClickAnswerHandler(option)} className={`${
                            showMessages &&
                            (option === correctAnswer ? "border-[#69CA61] bg-[#69ca6133]" : "")
                        } basis-[45%] rounded-[8px] border-[1px] p-[15px] text-[1.6em] border-[#BCC0C1] set-box-shadow hover:border-black flex justify-between `} key={index}><span className='dm-sans-medium mr-[13px]'>{answerLetter(index)}</span>
                        <span className='text-left'>{option}</span>
                        {showMessages && option === correctAnswer && (
                            <img className="inline-block" src={check} alt="" />
                        )}
                        </button>
                    ))}
                </div>
            </div>
        </div>)} 
         {/* : 
        (
             <div>
                 <div>
                     <p>You answered {correctAnswers} question of {currentCardsSet?.length}</p>
                     <p>Your progress: {progress}%</p>
                 </div>
                 <div>
                     <button onClick={onClickTryAgainHandler} className='bg-blue-400 p-[10px] rounded-md mt-[40px]'>Try again!</button>
                 </div>
                
             </div> 
         )}
         <button
             className='bg-blue-400 p-[10px] rounded-md mt-[40px]'
             onClick={() => navigate(`/user/${user?._id}/studySets`)}
             >
             back to Study Sets
         </button>  */}
    </section>
    )}
    </div>
  )
}

export default LearnCards