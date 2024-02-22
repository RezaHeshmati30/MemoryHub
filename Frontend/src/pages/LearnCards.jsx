import React, { useContext, useEffect, useState } from 'react'
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

function LearnCards() {
    const {currentIndex, setCurrentIndex} = useContext(UserStudySetsContext);
    const { hasToken, getUserInfo, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const {id} = useParams();
    const [answerOptions, setAnswerOptions] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [currentCardsSet, setCurrentCardsSet] = useState(null);
    const [correctAnswer, setCorrectAnswer] =  useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        getUserInfo();
        setCurrentIndex(0);
        setCorrectAnswers(0);
        setWrongAnswers(0);
        const studySet = user?.savedStudySets?.find(studySet => studySet._id === id) || {};
        const currentCardsSet = studySet?.cards || [];
        const currentCard = currentCardsSet[currentIndex];
        setCurrentCard(currentCard);
        setCurrentCardsSet(currentCardsSet);
    }, [])

    useEffect(() => {
        const studySet = user?.savedStudySets?.find(studySet => studySet._id === id) || {};
        const currentCardsSet = studySet?.cards || [];
        const currentCard = currentCardsSet[currentIndex];
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
        }
    }, [currentIndex]);

    
    

    useEffect(() => {
        if (currentCardsSet && currentCardsSet.length > 0) { // Add null check
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
        setSelectedAnswer(option);
        setIsCorrect(option === correctAnswer);
        option === correctAnswer ? 
        setCorrectAnswers(prevValue => prevValue + 1) : setWrongAnswers(prevValue => prevValue + 1);
        setCurrentIndex(prevValue => prevValue + 1);
    }

    const onClickTryAgainHandler = () => {
        navigate(`/user/studySet/learn-cards/${id}`); 
        setCurrentIndex(0);
        setCorrectAnswers(0);
        setWrongAnswers(0);
    }

    console.log("Correct:", correctAnswers)
    console.log("Wrong:", wrongAnswers)
    console.log(`Progress: ${progress}%`)
        

  return (
    <section className='p-[30px]'>
        {currentCardsSet && 
        currentCardsSet?.length - 1 >= currentIndex ? (
        <div>
            <p className='text-center'>Question: {currentCard?.card?.question}</p>
            <div className='flex flex-wrap gap-[20px] mt-[40px] items-stretch'>
                {answerOptions.map((option, index) => (
                    <button onClick={() => onClickAnswerHandler(option)} className={` basis-[45%] rounded-[10px] border-[2px] p-[15px]`} key={index}>{index+1}: {option}</button>
                ))}
            </div>
            
            <p>{currentIndex +1} / {currentCardsSet?.length}</p>
        </div>) : 
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
          onClick={() => navigate("/user/studySets")}
        >
          back to Study Sets
        </button>

    </section>
  )
}

export default LearnCards