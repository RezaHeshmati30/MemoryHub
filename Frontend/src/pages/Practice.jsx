import React, { useContext, useEffect, useState } from 'react'
import { UserStudySetsContext } from '../context/UserStudySetsContext'
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import PracticeButtons from '../components/PracticeButtons';

function Practice() {
  const {currentIndex, isFlipped, setIsFlipped, handleNextCard, handlePreviousCard, setCurrentIndex} = useContext(UserStudySetsContext);
  const { hasToken, getUserInfo, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {id} = useParams();


    useEffect(() => {
        getUserInfo();
        setCurrentIndex(0);
    }, [])

    useEffect(() => {
      getUserInfo();
  }, [currentIndex])



    const studySet = user?.savedStudySets?.filter(studySet => studySet._id === id)[0]|| [];
    const currentCardsSet = user?.savedStudySets?.filter(studySet => studySet._id === id)[0].cards || [];
    const currentCard = currentCardsSet[currentIndex];
    console.log("current card", currentCard)
    console.log("stdysets:", studySet)

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
    

  return (
    <div>
      <section className='w-[80vw] h-[90vh] bg-gray-200 mx-auto my-5 px-10 py-10'>
        {currentCardsSet && (
          <div key={currentCardsSet._id}>
            {console.log("CARDS:", currentCardsSet)}
            <p>Title: {studySet?.studySet?.title}</p>
            <p>Description: {studySet?.studySet?.description}</p>
            <p>Status: {currentCard?.status}</p>
            <div
              className='flip-container flex justify-center'
              onClick={handleFlip}
            >
              <div
                className={`flip-card ${
                  isFlipped ? "flipped" : ""
                } w-[60vw] h-[50vh]`}
              >
                <div className='flip-content'>
                  <strong>Question</strong>
                  <p> {currentCard?.card?.question}</p>
                </div>
                <div className='flip-content'>
                  <strong>Answer</strong>
                  <p>{currentCard?.card?.answer}</p>
                </div>
              </div>
            </div>
            <div className='my-5 ml-[110px] flex gap-[10px]'>
              <button
                onClick={() => handlePreviousCard(currentCardsSet)}
                className='bg-gray-400  p-[10px] rounded-md'
              >
                Previous
              </button>
              <p>{currentIndex +1} / {currentCardsSet?.length}</p>
              <button
                onClick={() => handleNextCard(currentCardsSet)}
                className='bg-gray-400 mx-10 p-[10px] rounded-md'
              >
                Next
              </button>
            </div>
          </div>
        )}
        <button
          className='bg-blue-400 p-[10px] rounded-md'
          onClick={() => navigate("/user/studySets")}
        >
          back to Study Sets
        </button>
        <PracticeButtons />
      </section>
    </div>
  );

}

export default Practice