import React, { useContext, useEffect, useState } from 'react'
import { UserStudySetsContext } from '../context/UserStudySetsContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

function WriteMode() {
    const { currentIndex, setCurrentIndex } = useContext(UserStudySetsContext);
    const { hasToken, getUserInfo, user } = useContext(AuthContext);
    const { id } = useParams();
    const [currentCard, setCurrentCard] = useState(null);
    const [currentCardsSet, setCurrentCardsSet] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0);
    const [answer, setAnswer] = useState("");
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [showStatistic, setShowStatistic] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessages, setShowMessages] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (hasToken) {
            getUserInfo();
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        setCurrentIndex(0);
        setCorrectAnswers(0);
        setWrongAnswers(0);
        setShowStatistic(false);
        const studySet = user?.savedStudySets?.find(studySet => studySet._id === id) || {};
        const currentCardsSet = studySet?.cards || [];
        const currentCard = currentCardsSet[currentIndex];
        setCurrentCard(currentCard);
        setCurrentCardsSet(currentCardsSet);
    }, [user, id]);

        useEffect(() => {
        const studySet = user?.savedStudySets?.find(studySet => studySet._id === id) || {};
        const currentCardsSet = studySet?.cards || [];
        const currentCard = currentCardsSet[currentIndex];
        setCurrentCard(currentCard);
        setCurrentCardsSet(currentCardsSet);
        
        if (currentCard) {
            const correctAnswer = currentCard?.card?.answer;
            setCorrectAnswer(correctAnswer);
            setShowMessages(false);
        }
    }, [currentIndex]);

    useEffect(() => {
        if (currentCard) {
            const correctAnswer = currentCard.card.answer;
            setCorrectAnswer(correctAnswer);
        }
    }, [currentCard]);

    useEffect(() => {
        if (currentCardsSet && currentCardsSet.length > 0) {
            setProgress(((correctAnswers / currentCardsSet.length) * 100).toFixed(0));
        }
    }, [correctAnswers, currentCardsSet]);

    useEffect(() => {
        if (currentIndex >= currentCardsSet?.length) {
            setShowStatistic(true);
        }
    }, [currentIndex, currentCardsSet]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAnswer("");
        setShowMessages(true);
        if (answer === correctAnswer) {
            setMessage("Correct!");
            setCorrectAnswers(prevValue => prevValue + 1);
            setTimeout(() => {
                setCurrentIndex(prevValue => prevValue + 1);
            }, 2000);
        } else {
            setMessage(`Almost!<br />The correct answer is:<br />${correctAnswer}`);
            setWrongAnswers(prevValue => prevValue + 1);
            setTimeout(() => {
                setCurrentIndex(prevValue => prevValue + 1);
            }, 3000);
        }
    }


    useEffect(() => {
        if (currentCardsSet && currentCardsSet.length > 0) { // Add null check
            setProgress(((correctAnswers / currentCardsSet.length) * 100).toFixed(0));
        }
    }, [correctAnswers, currentCardsSet]);

    if (!user) {
        return null; 
    }

    const tryAgainHandler = () => { 
            setCurrentIndex(0);
            setCorrectAnswers(0);
            setWrongAnswers(0);
            setShowStatistic(false);
    }

    return (
        <>
        {hasToken && (
        <section className='p-[30px]'>
            {currentCardsSet && currentCardsSet.length - 1 >= currentIndex && (
                <div className='p-[40px]'>
                    <p className='text-center mb-[50px]'>Question: {currentCard?.card?.question}</p>
                    <div className={showMessages ? "block" : "hidden"}>
                        <div className={showMessages ? "block text-center" : "hidden"} dangerouslySetInnerHTML={{ __html: message }} />
                    </div>
                    <div className={showMessages ? "hidden" : "block"}>
                        <form action="" onSubmit={handleSubmit} className={`flex flex-col gap-[15px] items-end`}>
                            <label htmlFor="answer">Write your answer:</label>
                            <input id="answer" minLength="3" maxLength="20" required className='border-[2px] border-gray-400 w-[40%]' type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        </form>
                        <p>{currentIndex + 1} / {currentCardsSet?.length}</p>
                    </div>
                    
                </div>
            )}
            {showStatistic && 
            <div>
                <p>You have {correctAnswers} correct and {wrongAnswers} incorrect answers</p>
                <p>Your progress: {progress}%</p>
                <button className='bg-blue-400 p-[10px] rounded-md mt-[40px]' onClick={tryAgainHandler}>Try again!</button>

            </div>
            }
            <button
                className='bg-blue-400 p-[10px] rounded-md mt-[40px]'
                onClick={() => navigate(`/user/${user?._id}/studySets`)}
            >
                Back to Study Sets
            </button>
        </section>
        )}
        </>
    );
}

export default WriteMode;

