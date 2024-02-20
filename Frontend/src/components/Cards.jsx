import React, { useContext, useEffect, useState } from "react";
import { StudySetsContext } from "../context/StudySetsContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./cards.css";

function Cards() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimated, setAnimated] = useState(false);

  const { getModuleData, topicId, studySetId, moduleData } =
    useContext(StudySetsContext);
  const { hasToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getModuleData();
    console.log("Topic Id:", topicId);
    console.log("StudySet Id:", studySetId);
  }, []);

  const currentCardsSet = moduleData?.topics
    ?.filter((topic) => topic._id === topicId)[0]
    ?.studySets.filter((set) => set._id === studySetId)[0];

  const currentCard = currentCardsSet?.cards[currentIndex];

  const handleNextCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % currentCardsSet?.cards.length
    );
    setIsFlipped(false);
    setAnimated(true);
    setTimeout(() => {
      setAnimated(false);
    }, 100);
  };

  const handlePreviousCard = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentCardsSet?.cards.length) %
        currentCardsSet?.cards.length
    );
    setIsFlipped(false);
    setAnimated(true);
    setTimeout(() => {
      setAnimated(false);
    }, 100);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <section className='w-[80vw] h-[90vh] bg-gray-200 mx-auto my-5 px-10 py-10'>
        {currentCardsSet && (
          <div key={currentCardsSet._id}>
            
            <p className='text-xl my-5'>
              <strong>{currentCardsSet.title}</strong>
            </p>
            <p className='text-xl my-5'>{currentCardsSet.description}</p>
            <div
              className={`flip-container flex justify-center ${
                isAnimated ? "animate" : ""
              }`}
              onClick={handleFlip}
            >
              <div
                className={`flip-card ${
                  isFlipped ? "flipped" : ""
                } w-[60vw] h-[50vh]  } next-card`}
              >
                <div className={`flip-content `}>
                  <strong>Question</strong>
                  <br />
                  <p> {currentCard?.question}</p>
                </div>
                <div className={`flip-content `}>
                  <strong>Answer</strong>
                  <br />
                  <p>{currentCard?.answer}</p>
                </div>
              </div>
            </div>
            <div className='flex justify-evenly my-5 ml-[110px]'>
              <button
                onClick={handlePreviousCard}
                className={`bg-gray-400 p-[10px] rounded-md `}
              >
                Previous
              </button>
              <p className='text-xl'>
                {currentIndex + 1}/{currentCardsSet?.cards.length}
              </p>
              <button
                onClick={handleNextCard}
                className='bg-gray-400 mx-10 p-[10px] rounded-md '
              >
                Next
              </button>
            </div>
          </div>
        )}
        <div className='flex justify-end pt-10'>
          <button
            className='bg-gray-400 p-[10px] rounded-md'
            onClick={() => navigate("/studySets")}
          >
            back to Study Sets
          </button>
          <button
            className={`${
              hasToken ? "block" : "hidden"
            } bg-gray-400 py-[5px] px-[10px] rounded-md ml-5 `}
            onClick={() => navigate("/userProfile")}
          >
            Add to your set
          </button>
        </div>
      </section>
    </div>
  );
}

export default Cards;