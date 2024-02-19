import React, { useContext, useEffect, useState } from "react";
import { StudySetsContext } from "../context/StudySetsContext";
import ReactCardFlip from "react-card-flip";
import { useNavigate } from "react-router-dom";
import "./cards.css";

function Cards() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const { getStudySetData, topicId, cardsId, studySet } =
    useContext(StudySetsContext);

  useEffect(() => {
    getStudySetData();
    console.log("Topic Id:", topicId);
    console.log("Cards Id:", cardsId);
  }, []);

  const currentCardsSet = studySet?.topics
    ?.filter((topic) => topic._id === topicId)[0]
    ?.studySets.filter((set) => set._id === cardsId)[0];

  const currentCard = currentCardsSet?.cards[currentIndex];

  const handleNextCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % currentCardsSet?.cards.length
    );
    setIsFlipped(false);
  };

  const handlePreviousCard = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentCardsSet?.cards.length) %
        currentCardsSet?.cards.length
    );
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section>
      <section className='w-[80vw] h-[90vh] bg-gray-200 mx-auto my-5 px-10 py-10'>
        {currentCard && (
          <div>
            <p className='text-2xl'>Title: {currentCardsSet.title}</p>
            <p className='my-5'>Description: {currentCardsSet.description}</p>
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
                  <p> {currentCard.question}</p>
                </div>
                <div className='flip-content'>
                  <strong>Answer</strong>
                  <p>{currentCard.answer}</p>
                </div>
              </div>
            </div>
            <div className='my-5 ml-[110px]'>
              <button
                onClick={handlePreviousCard}
                className='bg-gray-400  p-[10px] rounded-md'
              >
                Previous
              </button>
              <button
                onClick={handleNextCard}
                className='bg-gray-400 mx-10 p-[10px] rounded-md'
              >
                Next
              </button>
            </div>
          </div>
        )}
        <button
          className='bg-blue-400 p-[10px] rounded-md'
          onClick={() => navigate("/studySets")}
        >
          back to Study Sets
        </button>
        <button
          className='bg-blue-400 p-[10px] rounded-md'
          onClick={() => navigate("/userProfile")}
        >
          add to your Study Sets
        </button>
      </section>
    </section>
  );
}

export default Cards;
